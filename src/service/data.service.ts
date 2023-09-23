import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { applyFilters, IData, Ifilters } from '../utils';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  // This can be any json url or api call returning data in similar fashion
  private jsonUrl = '../assets/table_data.json'; 
  private mainData = new BehaviorSubject<IData[]>([]);


  // TODO: add appropriate type instead of any
  private dataSubject = new BehaviorSubject<IData[]>([]);
  public data$: Observable<IData[]> = this.dataSubject.asObservable();

  // column observable
  private columnsSubject = new BehaviorSubject<string[]>([]);
  public columns$: Observable<string[]> = this.columnsSubject.asObservable();

  // subscription variable
  private dataSubscription: Subscription;


  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    // Read json file and load the data
    this.fetchDataAndColumns()
  }
 

  // Method to fetch data from JSON file or API
  fetchDataAndColumns() {

    // TODO : proper type for data
    this.dataSubscription = this.http.get<IData[]>(this.jsonUrl).subscribe((data) => {
      const dataArray = Object.values(data)
      
      this.dataSubject.next(dataArray);
      this.mainData.next(dataArray)

      const columnArray = Object.keys(dataArray[0])
      this.columnsSubject.next(columnArray)
    });
  }

  // Method to apply the filter on dataSubject
  applyFilter(filters: Ifilters[] | undefined | []) {
    
    // if filters exists than go ahead and filter it
    if(filters?.length > 0){

      const currentData = this.mainData.getValue();

      // Apply the filter logic based on columnName, operator, and value
      const filteredData = currentData.filter((item:IData) => {
        if(filters.length > 0){
          return applyFilters(filters, item)
        } 
        return true;   
      });
      
      this.dataSubject.next(filteredData);
    } else {
      // reset to original data
      this.dataSubject.next(this.mainData.getValue());
    }
   
  }

  ngOnDestroy():void {
    // Unsubscribe from observables to prevent memory leaks
    this.dataSubscription.unsubscribe();
  }

}


