
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public listData: any;
  public listColumns: any;

  // Pagination variables
  public limit: number = 7
  public page: number = 1
  public currentData: any

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
    this.currentData = applyPagination(data, this.page, this.limit) 
    
   });

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

}

const applyPagination = (data, page, limit) => {
  const end = page * limit
  const start = end - limit
  return data.slice(start, end)
}
