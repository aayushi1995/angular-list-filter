import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule } from "@angular/forms";
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { DropdownComponent } from './toolbox/dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ToolboxComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
