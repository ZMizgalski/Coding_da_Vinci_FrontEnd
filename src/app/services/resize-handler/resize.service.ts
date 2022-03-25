import { ScreenSubscription } from './interfaces/screen-subsccription.interface';
import { DirectiveSize } from './interfaces/directive-size.interface';
import { Injectable } from "@angular/core";
import { ScreenSize } from "./interfaces/screen-size.interface";
import { SizeEnum } from './interfaces/size.enum';
import { Subject, Subscription } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ResizeService {


    public mode: SizeEnum = 0;
    private appMode: Subject<SizeEnum> = new Subject<SizeEnum>();

    private thinkAboutSize(size: DirectiveSize): ScreenSize | undefined {
        return this.sizes.filter(item => item.size.minWidth <= size.width && (item.size.maxWidth >= size.width || item.size.maxWidth == -1))[0];
    }

    public subscribeToScreenResize(): ScreenSubscription {
        const subscription = this.appMode.subscribe(value => {
            this.mode = value;
          });
        return {subscription: subscription, screenSize: this.mode}
    }

    public unSubscribeToScreenResize(subscription: Subscription | undefined): void {
        if (subscription)
        subscription.unsubscribe();
    }

    public getSize(width: number, height: number): void {
        const newSize: DirectiveSize = {width: width, height: height};
        const size = this.thinkAboutSize(newSize);
        size ? this.appMode.next(size.name) : this.appMode.next(SizeEnum.TINY);
    }

    private sizes: ScreenSize[] = [
      {name: SizeEnum.TINY, size: {minWidth:0, maxWidth: 300}},
      {name: SizeEnum.SMALL, size: {minWidth:300, maxWidth: 500}},
      {name: SizeEnum.MEDIUM, size: {minWidth:500, maxWidth: 900}},
      {name: SizeEnum.LARGE, size: {minWidth:900, maxWidth: -1}}
    ]

}