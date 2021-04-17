import { UsersService } from '../users.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  NgZone,
  ElementRef,
} from "@angular/core";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { map, pairwise, filter, throttleTime } from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default
})

export class TableComponent implements OnInit, AfterViewInit {
  // initial virtual scroll component of Angular 11
  @ViewChild("scroller")
  scroller!: CdkVirtualScrollViewport;
  @ViewChild('input', { static: true })
  input!: ElementRef;
  // initial variables
  listItems:any;
  page: number;
  limit: number;
  loading: boolean;


 
  // initial ngZone variable to run the fetch data after detect that scrolled has been performed
  // initial UsersService variable to perform http request to server to fetch the data
  constructor(private ngZone: NgZone, private usersService: UsersService) {
    this.listItems = [];
    this.page = 0;
    this.limit = 20;
    this.loading = false;
  
  }

  ngOnInit(): void {
    // Load initial fetch of the first 20 user from server
    this.fetchMore();
    this.loading = false;
    
  }

  // indicate if the user scrolled to the bottom of the page to run fetch data of the next page
  ngAfterViewInit(): void {

    this.scroller
      .elementScrolled()
      .pipe(
        // Get the scroll offset in pixels from the bottom of the entire table. 
        // For this I use a method provided by the virtual scroller called measureScrollOffset
        map(() => this.scroller.measureScrollOffset("bottom")),
        // Use the pairwise operator to get this offset in pairs, so that I can see whether it is increasing or decreasing
        pairwise(),
        // add a filter to the stream and only allow it to continue when y2 < y1 to detect when the offset is near to the bottom
        filter(([y1, y2]) => y2 < y1 && y2 < 200),
        // throttleTime operator, so that we don’t get repeated scroll events (200ms)
        throttleTime(200)
      )
      .subscribe(() => {
          this.ngZone.run(() => {
            this.input.nativeElement.value === "" ? this.fetchMore() :null;
          });
      });

      // Perform a Debounce to fetch data efficiently from server
      fromEvent(this.input.nativeElement,'keyup')
        .pipe(
          map((event: any) => {
            return event.target.value;
            }),
            filter(res => res !== ""),
            debounceTime(1000),
            distinctUntilChanged(),
        )
        .subscribe((text: any) => {
          this.usersService.getDataToFilter(0, text).subscribe(res => this.listItems = res.data.filter((user: any) => user.firstName.toLowerCase().includes(text)));
          this.usersService.getDataToFilter(1, text).subscribe(res => this.listItems.concat(res.data.filter((user: any) => user.firstName.toLowerCase().includes(text))));
        });

      // Listen to Keyup to detect when the filter search bar is back to his initial state
      fromEvent(this.input.nativeElement,'keyup')
        .pipe(
          map((event: any) => {
            if(event.target.value === ""){
              this.fetchOriginData();
            }
            }),
        ).subscribe();
      
  }
  // Fetch the initial data when reset the Filter search bar to ""
  fetchOriginData(): void {
    if(this.input.nativeElement.value === ""){
      this.page = 0;
   
      this.usersService.getAll(this.page).subscribe(res => {
        this.listItems = res.data;
      })
      this.page += 1;
    }
  }

  // Fetch data from server for the scroll page
  fetchMore(): void {
    this.loading = true;
    this.usersService.getAll(this.page).subscribe(res => {
        if (res.data.length !== 0) {
          this.loading = false;     
          if(this.input.nativeElement.value === ""){  
            this.listItems = [...this.listItems, ...res.data];
          }
        } else {
          this.loading = false;
        }
    });
    this.page += 1;
    
  }
}
