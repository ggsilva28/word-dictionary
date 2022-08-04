import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateAccountComponentRoutingModule } from './create-account-routing.module';

import { CreateAccountComponent } from './create-account.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreateAccountComponentRoutingModule
    ],
    declarations: [CreateAccountComponent]
})

export class CreateAccountModule { }