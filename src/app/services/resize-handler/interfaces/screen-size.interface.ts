import { SizeCompartment } from './size-compartment.interface';
import { SizeEnum } from './size.enum';

export interface ScreenSize {
  name: SizeEnum;
  size: SizeCompartment;
}
