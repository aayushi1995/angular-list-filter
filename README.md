# List&Filters

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Dependencies

1. rxjs Library : create and work with observables


## List & Filters

### Description:
We have a list of records fetched from a local file `assets/table_data.json`, users can play around with different filters from the sidebar on the left side of the screen. Each filter consists of 3 inputs that is required from the user: 
Column Name, operator, value.
Users can create multiple filters and the records which match all the filters will be returned.
Users can also use an api endpoint and replace with the local url. 

### Step By Step Procedure to install and run

1. Git clone from the link `https://github.com/aayushi1995/angular-list-filter.git` or Download the Zip file and unzip it.
2. Navigate to the root folder.
3. Install `npm`
4. Run `npm install`
4. After successfully installing dependencies, Run `ng serve`
5. If the window doesn't appear automatically then open [http://localhost:4200](http://localhost:4200) to view it in the browser.

### Dependencies used are default Angular ecosystem
1. ` @angular/core `, `@angular/common`, `@angular/core`, `@angular/forms` 
2. ` rxjs `, `tslib`
   
### - Areas of improvements
1. Writing unit test cases
2. Implementing AND and OR OPERATOR in grouping filters
3. Changing the list of operators based on the type of columns, for ex: show only numerical operators for price, show only string operators for product_description.
4. Skeleton loading on Listview
5. Caching filters in local storage so that they dont clear out when page loads
6. Seprating small components like Pagination in ListView and resusing dropdown component in sidebar
7. Handle Error boundaries in Angular
8. Engaging animation in the current screen
9. Implementing sidebar appraoch where sidebar can be draggable and resizable
10. Virtualizations in Listview
11. Enable column based sorting on listview
### - Developer :

aayushi.kambriya5@gmail.com

### - Deployment :

The app is deployed at ` https://aayushi1995.github.io/angular-list-filter`