import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, booleanAttribute } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { Observable } from 'rxjs';
import { AdminService, LoadingParameter } from 'src/app/modules/admin/admin.service';

@Component({
    selector: 'loading-button',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule
    ],
    template: `
       <button type="button" mat-flat-button [color]="color" [disabled]="(disabled) || ((loading$ | async).value && (loading$ | async).parameter === parameter)" (click)="onClick()">
            <mat-spinner *ngIf="(loading$ | async).value && (loading$ | async).parameter === parameter" class="text-white" diameter="20"></mat-spinner>
            <span *ngIf="!(loading$ | async).value || (loading$ | async).parameter !== parameter">
                {{title}}
            </span>
        </button>
    `
})
export class LoadingButtonConponent implements OnInit {
    @Input({ transform: booleanAttribute }) disabled: boolean = false;
    @Input({ required: true }) parameter: string;
    @Input({ required: true }) title: string;
    @Input() color: string = 'primary';
	@Output() btnClick = new EventEmitter();

    loading$: Observable<LoadingParameter>;

    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.loading$ = this.adminService.loading$;
    }

    onClick() {
		this.btnClick.emit();
	}
}