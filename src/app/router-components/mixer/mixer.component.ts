import { MixerService } from './../../services/mixer-service/mixer-service.service';
import { Subscription, Subject } from 'rxjs';
import { ResizeService } from './../../services/resize-handler/resize.service';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public size: Subject<number> = new Subject();
  constructor(public resizeService: ResizeService, public mixerService: MixerService) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.resizeService.modeChanges.subscribe(mode => {
        this.size.next(mode);
      })
    );
  }
}
