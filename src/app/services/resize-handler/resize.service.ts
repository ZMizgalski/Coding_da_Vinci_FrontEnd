import { DirectiveSize } from './interfaces/directive-size.interface';
import { Injectable } from "@angular/core";
import { ScreenSize } from "./interfaces/screen-size.interface";
import { SizeEnum } from './interfaces/size.enum';


@Injectable({
    providedIn: 'root'
})
export class ResizeService {

    public thinkAboutSize(size: DirectiveSize): ScreenSize | undefined {
        return this.sizes.filter(item => item.size.minWidth <= size.width && (item.size.maxWidth >= size.width || item.size.maxWidth == -1))[0];
    }

    sizes: ScreenSize[] = [
      {name: SizeEnum.TINY, size: {minWidth:0, maxWidth: 300}},
      {name: SizeEnum.SMALL, size: {minWidth:300, maxWidth: 500}},
      {name: SizeEnum.MEDIUM, size: {minWidth:500, maxWidth: 900}},
      {name: SizeEnum.LARGE, size: {minWidth:900, maxWidth: -1}}
    ]

}