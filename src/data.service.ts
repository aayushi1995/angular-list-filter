import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private jsonUrl = '../assets/table_data.json'; 

  private mainData = new BehaviorSubject<any[]>([]);


  // TODO: add appropriate type instead of any
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  // column observable
  private columnsSubject = new BehaviorSubject<string[]>([]);
  public columns$: Observable<string[]> = this.columnsSubject.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDataAndColumns()
  }

  // Method to fetch data from JSON file or API
  fetchDataAndColumns() {
    this.http.get<any[]>(this.jsonUrl).subscribe((data) => {

      const dataArray = Object.values(data)
      
      this.dataSubject.next(dataArray);
      this.mainData.next(dataArray)

      const columnArray = Object.keys(dataArray[0])
      this.columnsSubject.next(columnArray)
    });
  }

  // Method to apply the filter on dataSubject
  applyFilter(filters) {

    const currentData = this.mainData.getValue();

    // Apply the filter logic based on columnName, operator, and value
    const filteredData = currentData.filter((item) => {
      // TODO: filtering
      if(filters.length > 0){
        const flag = applyFilters(filters, item)
        return flag
      } 

      return true; 
      
    });
    
    this.dataSubject.next(filteredData);
  }

  
}

// TODO: move to utils file
// const applyFilters = (filters, obj): boolean => {
//   for (const filter of filters) {
//     switch (filter.operator) {
//       case '<=':
//         if (parseInt(obj?.[filter.column]) <= parseInt(filter.inputValue)) {
//           return true;
//         }
//         break;

//       case '>=':
//         if (parseInt(obj?.[filter.column]) >= parseInt(filter.inputValue)) {
//           return true;
//         }
//         break;

//       case '=':
//         if (parseInt(obj?.[filter.column]) === parseInt(filter.inputValue)) {
//           return true;
//         }
//         break;

//       case '≠':
//         if (parseInt(obj?.[filter.column]) !== parseInt(filter.inputValue)) {
//           return true;
//         }
//         break;

//       case 'contains':
//         const columnValue = obj?.[filter.column]?.toLowerCase();
//         const filterValue = filter.inputValue?.toLowerCase();
//         if (columnValue.includes(filterValue)) {
//           return true;
//         }
//         break;

//       case 'does not contain':
//         const notContainColumnValue = obj?.[filter.column]?.toLowerCase();
//         const notContainFilterValue = filter.inputValue?.toLowerCase();
//         if (!notContainColumnValue.includes(notContainFilterValue)) {
//           return true;
//         }
//         break;

//       default:
//         break;
//     }
//   }

//   return false;
// };

const applyFilters = (filters, obj): any[] => {

    let passesAllFilters:any = true;

    for (const filter of filters) {
      switch (filter.operator) {
        case '<=':
          passesAllFilters = passesAllFilters && parseInt(obj?.[filter.column]) <= parseInt(filter.inputValue);
          break;

        case '>=':
          passesAllFilters = passesAllFilters && parseInt(obj?.[filter.column]) >= parseInt(filter.inputValue);
          break;

        case '=':
          passesAllFilters = passesAllFilters && parseInt(obj?.[filter.column]) === parseInt(filter.inputValue);
          break;

        case '≠':
          passesAllFilters = passesAllFilters && parseInt(obj?.[filter.column]) !== parseInt(filter.inputValue);
          break;

        case 'contains':
          const columnValue = obj?.[filter.column]?.toLowerCase();
          const filterValue = filter.inputValue?.toLowerCase();
          passesAllFilters = passesAllFilters && columnValue.includes(filterValue);
          break;

        case 'does not contain':
          const notContainColumnValue = obj?.[filter.column]?.toLowerCase();
          const notContainFilterValue = filter.inputValue?.toLowerCase();
          passesAllFilters = passesAllFilters && !notContainColumnValue.includes(notContainFilterValue);
          break;

        default:
          break;
      }

      // If an object fails one filter, it won't pass all filters, so we can break early
      if (!passesAllFilters) {
        break;
      }
    }

    return passesAllFilters;
 

};


// export class DataService {
//   private jsonUrl = '../assets/table_data.json'; // Replace with the URL of your JSON file
//   private listData: any[] = [];

//   private filters:string[] = []

//   public limit:number = 7
//   public page: number = 1

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     // Extract data and columns and put it inside the variable
//   }
  
//   fetchData(): Observable<any> {
//     const end = this.page * this.limit
//     const start = end - this.limit
//     // TODO: import data and create hashmap and cache the data and use it
//     return this.http.get(this.jsonUrl).pipe(
//       map((data: any) => {
//             const arr = Object.values(data)
//             let mainData: any[];
//             if(this.filters.length !== 0) {
//               mainData = arr?.filter((obj) => {
//                  const flag = this.applyFilters(obj)
//                  return flag
//               })
//             } else {
//                 mainData = arr.map((obj) => obj)
//             }
//            this.listData = mainData;
//            return mainData.slice(start, end);
//         }
//       ) 
      
//     );
//   }

//   fetchColumns(): Observable<any> {
//     return this.http.get(this.jsonUrl).pipe(
//       map((data: any) => {
//           return Object.keys(Object.values(data)[0])
//         }
//       )
//     );
//   }

//   fetchColumnsWithType(): Observable<any> {
//     return this.http.get(this.jsonUrl).pipe(
//       map((data: any) => {
//           const values = Object.values(Object.values(data)[0])
//           return Object.keys(Object.values(data)[0])?.map((columnName, index) => {
//             const type = !Number.isNaN(values[index]) ? 'number' : 'string' 
//             return {
//               name: columnName,
//               type: type
//             }
//           })
//         }
//       )
//     );
//   }
  
//   onPreviousClick = () => {
//     this.page = this.page - 1
//   }

//   onNextClick = () => {
//     this.page = this.page + 1
//   }


//   getTotalRecords = () => {
//     return this.listData.length
//   }
// }

interface Ifilters {
  columns:string
  operator: string
  val:string | number 
}