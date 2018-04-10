import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CountdownModule } from 'ngx-countdown';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayComponent } from './display/display.component';

import { ProductService } from './product.service';
import { ProductCounterService } from './product-counter.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    // HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    CountdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, ProductCounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
