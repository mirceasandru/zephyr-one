import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MaterialModule } from '../modules/material.module';

@Component({
    selector: 'html-snackbar',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule
    ],
    template: `
        <ul class="list">
            <li *ngFor="let item of data.message">{{ item }}</li>
        </ul>
        <button mat-flat-button class="close" (click)="dismiss()">
            OK
        </button>
    `,
    styles: [`
        .list {
            margin: 0px;
            padding: 0px 0px 15px 0px;
            list-style: none;
        }
        li {
            border-bottom: 1px solid #ffffff54;
            padding-bottom: 5px;
        }
        .close {
            float: right;
        }
    `]
})
export class HtmlSnackbarComponent {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: any,
        private snackBarRef: MatSnackBarRef<HtmlSnackbarComponent>
    ) {
    }

    dismiss(): void {
        this.snackBarRef.dismiss();
    }
}