import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesComponent } from './favorites.component';

@NgModule({
  declarations: [FavoritesComponent],
  exports: [FavoritesComponent],
  imports: [
    CommonModule
  ]
})
export class FavoritesModule { }
