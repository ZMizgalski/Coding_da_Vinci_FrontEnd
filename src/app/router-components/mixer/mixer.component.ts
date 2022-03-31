import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MixerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
