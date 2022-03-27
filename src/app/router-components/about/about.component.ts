import { ContentData } from './interfaces/content-data.interface';
import { ResizeService } from './../../services/resize-handler/resize.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  data: ContentData[] = [
    {
      img: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80',
      description: '1',
    },
    {
      img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1406&q=80',
      description: '2',
    },
    {
      img: 'https://images.unsplash.com/photo-1606765962248-7ff407b51667?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      description: '3',
    },
  ];

  constructor(public resizeService: ResizeService) {}

  ngOnInit(): void {}
}
