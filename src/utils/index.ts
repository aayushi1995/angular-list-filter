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
      switch (filter?.operator) {
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

