import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { WordsListComponent } from './words-list.component';

@NgModule({
  declarations: [WordsListComponent],
  exports: [WordsListComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ]
})
export class WordsListModule { }
