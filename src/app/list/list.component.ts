
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { applyPagination, LIMIT } from 'src/utils';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public listData: any;
  public listColumns: any;

  // Pagination variables
  public currentData: any
  public limit: number = LIMIT;
  public page: number = 1;

  // subscription variable
  private dataSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
   // Call fetchData to fetch data when the component is initialized
   this.dataService.fetchDataAndColumns();

   // Subscribe to data changes
   this.dataService.data$.subscribe((data) => {
    this.listData = data;
    
    // extract columns
    if(data?.length > 0) {
      this.listColumns = Object.keys(data?.[0])
    }

    // calculate paginated data
    this.currentData = applyPagination(data, 1, LIMIT) 
   });

  }

  updateCurrentData = (data) => {
    this.currentData = data
  }

  onPreviousClick = () => {
    this.page = this.page - 1
    this.currentData = applyPagination(this.listData, this.page, this.limit) 
  }

  onNextClick = () => {
      this.page = this.page + 1
      this.currentData = applyPagination(this.listData, this.page, this.limit) 
  }

  getTotalRecords = () => {
    return this.listData.length
  }

  getLastPage = () => {
    return this.page === Math.ceil(this.listData.length / this.limit)
  }

  ngOnDestroy():void {
    // Unsubscribe from observables to prevent memory leaks
    this.dataSubscription.unsubscribe();
  }

}

