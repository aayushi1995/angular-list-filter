import { Component,EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @Input() public dynamicForm: FormGroup;
  @Input() options: string[] = [];
  @Input() controlName: string;
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption: string | undefined;
  

  onSelect(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.toggleDropdown() 
  }

}

