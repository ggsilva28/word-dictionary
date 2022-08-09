import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { WordsListModule } from 'src/app/components/words-list/words-list.module';
import { WordDetailModule } from 'src/app/components/word-detail/word-detail.module';

import { HomeComponentRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        MatGridListModule,
        MatButtonToggleModule,
        WordsListModule,
        WordDetailModule,
        HomeComponentRoutingModule
    ],
    declarations: [HomeComponent]
})

export class HomeModule { }