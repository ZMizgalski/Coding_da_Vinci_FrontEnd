import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { MixerService } from './../../services/mixer-service/mixer-service.service';
import { Subscription, Subject } from 'rxjs';
import { ResizeService } from './../../services/resize-handler/resize.service';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public size: Subject<number> = new Subject();
  public imageUrl?: string; 

  constructor(public resizeService: ResizeService, public mixerService: MixerService, private dataService: DataService,
    private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.resizeService.modeChanges.subscribe(mode => {
        this.size.next(mode);
      }),
      this.dataService.mixedImageChange.subscribe(image=>{
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)) as string;
        this.cd.markForCheck();
      })
    );
  }

}
