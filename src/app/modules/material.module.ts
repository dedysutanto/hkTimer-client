import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
],
exports: [
    CdkTableModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
]
})
export class MaterialModule { }
