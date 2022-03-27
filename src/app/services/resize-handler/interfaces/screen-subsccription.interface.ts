import { SizeEnum } from './size.enum';
import { Subscription } from 'rxjs';
export interface ScreenSubscription {
  subscription: Subscription;
  screenSize: SizeEnum;
}
