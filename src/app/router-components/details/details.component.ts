import { Subscription } from 'rxjs';
import { ImageResponseModel } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, OnDestroy {
  
  private subscriptions: Subscription[] = [];
  public currentIndex: number = 0;
  public data: ImageResponseModel[] = [];
  
  constructor(private dataService: DataService, private cd: ChangeDetectorRef, private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.getImagesData().subscribe(data=>{
        this.data = data;
        this.cd.markForCheck();
      }),
      this.route.paramMap.subscribe(paramMap=>{
        let param: number = +(paramMap.get("id") || "elo");
        if(isNaN(param)){
          this.navigateToNotFound();
          return;
        }
        this.currentIndex = param;
        this.cd.markForCheck();
      })
    )
  }

  public onIndexChange(value: number){
    this.router.navigate([`details/${value}`]);
  }

  public navigateToNotFound(){
    this.router.navigate(['notFound'], {skipLocationChange: true});
  }
}
