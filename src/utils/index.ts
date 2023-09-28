export const OPERATORS = ['<=', '>=', '=', '≠', 'contains', 'does not contain']

export const LIMIT = 7

export const applyPagination = (data: IData[], page:number, limit:number) => {
    const end = page * limit
    const start = end - limit
    return data.slice(start, end)
}

export interface Ifilters {
  column:string
  operator: string
  inputValue:string
}

export interface IData{
  [key:string]: string
}

// TODO : Implement OR and AND operator with each filter

export const applyFilters = (filters:Ifilters[], obj:IData): boolean => {

    let passesAllFilters:boolean = true;

    for (const filter of filters) {
      const objValue = obj?.[filter?.column]
      const inputValue = filter?.inputValue
      
      if(inputValue === ""){
        break;
      }
   
      switch (filter?.operator) {
        case '<=':
          passesAllFilters = passesAllFilters && parseInt(objValue) <= parseInt(inputValue);
          break;

        case '>=':
          passesAllFilters = passesAllFilters && parseInt(objValue) >= parseInt(inputValue);
          break;

        case '=':
          if(isNaN(parseInt(objValue))) {
            passesAllFilters = passesAllFilters && (objValue === inputValue);
          } else {
            passesAllFilters = passesAllFilters && parseFloat(objValue) === parseFloat(inputValue);
          }
          break;

        case '≠':
          passesAllFilters = passesAllFilters && parseInt(objValue) !== parseInt(inputValue);
          break;

        case 'contains':
          const columnValue = filter?.column ? objValue?.toString()?.toLowerCase() : undefined;
          const filterValue = filter?.column ? inputValue?.toString()?.toLowerCase() : undefined;
          passesAllFilters = passesAllFilters && columnValue?.includes(filterValue);
          break;

        case 'does not contain':
          const notContainColumnValue = objValue?.toString()?.toLowerCase() || undefined;
          const notContainFilterValue = inputValue?.toString()?.toLowerCase() || undefined;
          passesAllFilters = passesAllFilters && !notContainColumnValue?.includes(notContainFilterValue);
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

