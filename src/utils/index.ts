export const OPERATORS = ['<=', '>=', '=', '≠', 'contains', 'does not contain']

export const LIMIT = 7

export const applyPagination = (data: any[], page:number, limit:number) => {
    const end = page * limit
    const start = end - limit
    return data.slice(start, end)
}

export interface Ifilters {
  column:string
  operator: string
  inputValue:string
}

export const applyFilters = (filters:Ifilters[], obj:any[]): any[] => {

    let passesAllFilters:any = true;

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
          passesAllFilters = passesAllFilters && parseInt(objValue) === parseInt(inputValue);
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

