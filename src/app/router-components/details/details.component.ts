import { trigger, transition, query, style, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ImageResponseModel } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('switchContent', [
      transition(
        ':increment, :decrement',
        [
          query('.content', [
            style('*'),
            animate(
              '{{animationTime}}ms',
              keyframes([
                style({ opacity: 1, offset: 0 }),
                style({ opacity: 0, offset: 0.48 }),
                style({ opacity: 0, offset: 0.52 }),
                style({ opacity: 1, offset: 1 }),
              ])
            ),
          ]),
        ],
        { params: { animateTime: 400 } }
      ),
    ]),
  ],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public currentIndex: number = 0;
  public data: ImageResponseModel[] = [];
  public readonly animationTime = 400;

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public animationCounter: number = 0;
  public displayIndex: number = 0;
  public currentTimeout?: any;

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.getImagesData().subscribe(data => {
        this.data = data;
        this.cd.markForCheck();
      }),
      this.route.paramMap.subscribe(paramMap => {
        let param: number = +(paramMap.get('id') || 'elo');
        if (isNaN(param)) {
          this.navigateToNotFound();
          return;
        }
        this.currentIndex = param;
        this.displayIndex = param;
        this.cd.markForCheck();
      })
    );
  }

  public onIndexChange(value: number) {
    this.router.navigate([`details/${value}`]);
  }

  public navigateToNotFound() {
    this.router.navigate(['notFound'], { skipLocationChange: true });
  }

  public getNearestIndex(offset: number): number {
    if (this.data.length <= this.currentIndex) return this.currentIndex;
    return (this.currentIndex + 10 * this.data.length + offset) % this.data.length;
  }

  public startAnimation(offset: number) {
    if (offset === -1) this.animationCounter--;
    else this.animationCounter++;
    if (this.currentTimeout) clearTimeout(this.currentTimeout);
    this.currentTimeout = setTimeout(() => {
      this.displayIndex = this.getNearestIndex(offset);
      this.cd.markForCheck();
    }, this.animationTime / 2);
  }

  public onAnimationFinished() {}
}
