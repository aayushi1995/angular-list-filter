import { Component } from '@angular/core';
import { DataService } from 'src/service/data.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OPERATORS } from 'src/utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', './../list/list.component.css']
})


export class SideBarComponent {

  // columns and selected option
  public columns: string[] = []
  public selectedOption: string | undefined;

  // operators and selected operator
  public operators: string[] = OPERATORS
  public selectedOperator: string | undefined;

  // input value
  public filtervalue:string | undefined ;

  public dynamicForm: FormGroup;

  // subscription variable
  private columnsSubscription: Subscription;
  
  // Initializing and Creating FormArray
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dynamicForm = this.fb.group({
      inputGroups: this.fb.array([]),
    });
    this.addInputGroup()
  }
  get inputGroups(): FormArray {
    return this.dynamicForm.get('inputGroups') as FormArray;
  }

  ngOnInit(): void {
    // subscribe to column and get all columns data
    this.columnsSubscription = this.dataService.columns$.subscribe((data) => {
      this.columns = data
   });
  }

  // on dropdown selection
  onOptionSelected = (option: string) => {
    this.selectedOption = option;
  }

  // on dropdown selection
  onOperatorSelected(option:string) {
    this.selectedOperator = option
  }


  // Method to Add Input group in the array
  addInputGroup() {
    const newInputGroup = this.fb.group({
      column: ['', Validators.required],
      operator: ['', Validators.required],
      inputValue: ['', Validators.required],
    });

    this.inputGroups.push(newInputGroup);
  }

  // Method to Remove Input group in the array
  removeInputGroup(index: number) {
    this.inputGroups.removeAt(index);
  }

  // on Apply filter
  onSubmit() {
    this.markFormGroupTouched(this.dynamicForm);
    if (this.dynamicForm.valid) {
      this.dataService.applyFilter(this.dynamicForm?.value?.inputGroups);
    }
  }

  // Mark all form elements as touched, to check whether user clicked on submit with empty fields
  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  clearFilters = () => {
    this.inputGroups.clear()
    this.dataService.applyFilter([]);
  }

  ngOnDestroy():void {
    // Unsubscribe from observables to prevent memory leaks
    this.columnsSubscription.unsubscribe();
  }
}
