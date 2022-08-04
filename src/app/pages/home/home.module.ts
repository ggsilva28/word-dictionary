import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { WordsListModule } from 'src/app/components/words-list/words-list.module';
import { FavoritesModule } from 'src/app/components/favorites/favorites.module';

import { HomeComponentRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        MatGridListModule,
        MatButtonToggleModule,
        WordsListModule,
        FavoritesModule,
        HomeComponentRoutingModule
    ],
    declarations: [HomeComponent]
})

export class HomeModule { }