import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordDetailComponent } from './word-detail.component';

@NgModule({
  declarations: [WordDetailComponent],
  exports: [WordDetailComponent],
  imports: [
    CommonModule
  ]
})
export class WordDetailModule { }
