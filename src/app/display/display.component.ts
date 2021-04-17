import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DisplayComponent implements OnInit{
  constructor(){} 
  ngOnInit(){}
}
