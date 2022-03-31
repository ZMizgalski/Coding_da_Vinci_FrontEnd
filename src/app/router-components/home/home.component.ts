import { ResizeService } from './../../services/resize-handler/resize.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public size = 0;

  constructor(private resizeService: ResizeService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.resizeService.modeChanges.subscribe(newSize => {
        this.size = newSize;
      })
    );
  }
}
