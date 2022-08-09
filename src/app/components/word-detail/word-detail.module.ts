import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { WordDetailComponent } from './word-detail.component';

@NgModule({
  declarations: [WordDetailComponent],
  exports: [WordDetailComponent],
  imports: [
    CommonModule,
    SwiperModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class WordDetailModule { }
