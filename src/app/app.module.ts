import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NxExpertModule } from '@aposin/ng-aquila/config';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxImageModule } from '@aposin/ng-aquila/image';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NxExpertModule,
    NxInputModule,
    NxFormfieldModule,
    NxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NxDropdownModule,
    NxImageModule,
    NxGridModule,
    HttpClientModule,
    NxSpinnerModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
