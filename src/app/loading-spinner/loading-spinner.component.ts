import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

}
