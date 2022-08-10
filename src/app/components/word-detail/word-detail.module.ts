import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FavoriteModule } from '../favorite/favorite.module';

import { WordDetailComponent } from './word-detail.component';

@NgModule({
  declarations: [WordDetailComponent],
  exports: [WordDetailComponent],
  providers:[
    { provide: MatDialogRef, useValue: {} }
  ],
  imports: [
    CommonModule,
    SwiperModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    FavoriteModule,
  ]
})
export class WordDetailModule { }
