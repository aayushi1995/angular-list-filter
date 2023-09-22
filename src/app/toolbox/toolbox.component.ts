import { Component } from '@angular/core';
import { DataService } from 'src/data.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})


// TODO: break into components and Modular Code

export class ToolboxComponent {

  // TODO: add pubic private
  // Toolbox data
  columns: string[] = []
  selectedOption: string | undefined;

  // TODO : create a constant enum and add it there
  operators: string[] = ['<=', '>=', '=', '≠', 'contains', 'does not contain']
  selectedOperator: string | undefined;

  filtervalue:string;

  // FormArray functionality
  dynamicForm: FormGroup;
  
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dynamicForm = this.fb.group({
      inputGroups: this.fb.array([]),
    });
    this.addInputGroup()
  }

  ngOnInit(): void {
    this.dataService.columns$.subscribe((data) => {
      this.columns = data
   });
  }


  onOptionSelected = (option: string) => {
    this.selectedOption = option;
  }

  onOperatorSelected(option:string) {
    this.selectedOperator = option
  }

  get inputGroups(): FormArray {
    return this.dynamicForm.get('inputGroups') as FormArray;
  }

  addInputGroup() {
    const newInputGroup = this.fb.group({
      column: ['', Validators.required],
      operator: ['', Validators.required],
      inputValue: ['', Validators.required],
    });

    this.inputGroups.push(newInputGroup);
  }

  removeInputGroup(index: number) {
    this.inputGroups.removeAt(index);
  }

  onSubmit() {
    this.markFormGroupTouched(this.dynamicForm);
    if (this.dynamicForm.valid) {
      this.dataService.applyFilter(this.dynamicForm?.value?.inputGroups);
    }
  }

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

  
}
