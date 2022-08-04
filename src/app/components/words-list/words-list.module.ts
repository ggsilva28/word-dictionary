import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { WordsListComponent } from './words-list.component';

@NgModule({
  declarations: [WordsListComponent],
  exports: [WordsListComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ]
})
export class WordsListModule { }
