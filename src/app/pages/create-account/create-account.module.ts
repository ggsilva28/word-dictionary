import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ToastrModule } from 'ngx-toastr';
import { CreateAccountComponentRoutingModule } from './create-account-routing.module';

import { CreateAccountComponent } from './create-account.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        RouterModule,
        ToastrModule,
        CreateAccountComponentRoutingModule
    ],
    declarations: [CreateAccountComponent]
})

export class CreateAccountModule { }