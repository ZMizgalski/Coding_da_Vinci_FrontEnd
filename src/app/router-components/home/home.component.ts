import { ResizeService } from './../../services/resize-handler/resize.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { SizeEnum } from 'src/app/services/resize-handler/interfaces/size.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
