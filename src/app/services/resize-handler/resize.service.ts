import { DirectiveSize } from './interfaces/directive-size.interface';
import { Injectable } from "@angular/core";
import { ScreenSize } from "./interfaces/screen-size.interface";
import { SizeEnum } from './interfaces/size.enum';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ResizeService {

    
    private appMode: BehaviorSubject<SizeEnum> = new BehaviorSubject<SizeEnum>(0);

    public get modeChanges(): Observable<SizeEnum>{
      return this.appMode;
    }
    
    public get mode(): SizeEnum{
      return this.appMode.value;
    }

    private thinkAboutSize(size: DirectiveSize): ScreenSize | undefined {
        return this.sizes.filter(item => item.size.minWidth <= size.width && (item.size.maxWidth >= size.width || item.size.maxWidth == -1))[0];
    }

    public setSize(width: number, height: number): void {
        const newSize: DirectiveSize = {width: width, height: height};
        const size = this.thinkAboutSize(newSize);
        size ? this.setNewMode(size.name) : this.setNewMode(SizeEnum.TINY);
    }

    private sizes: ScreenSize[] = [
      {name: SizeEnum.TINY, size: {minWidth:0, maxWidth: 300}},
      {name: SizeEnum.SMALL, size: {minWidth:300, maxWidth: 500}},
      {name: SizeEnum.MEDIUM, size: {minWidth:500, maxWidth: 900}},
      {name: SizeEnum.LARGE, size: {minWidth:900, maxWidth: -1}}
    ]

    public setNewMode(value: SizeEnum){
      this.appMode.next(value);
    }

}