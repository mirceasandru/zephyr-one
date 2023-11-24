import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HtmlSnackbarComponent } from '../components/html-snackbar.component';

export type PanelClass = 'success' | 'danger' | 'info' | 'warning';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private _snackBar: MatSnackBar) { }

    success(message: string) {
        return this._snackBar.open(message, '', { panelClass: ['success'] });
    }

    danger(message: string) {
        return this._snackBar.open(message, '', { panelClass: ['danger'] });
    }

    info(message: string) {
        return this._snackBar.open(message, '', { panelClass: ['info'] });
    }

    warning(message: string) {
        return this._snackBar.open(message, '', { panelClass: ['warning'] });
    }

    custom(message: any, panelClass: PanelClass, html = false) {
        const config: MatSnackBarConfig = {
            duration: 0,
            panelClass: [panelClass]
        };

        if (html) {
            return this._snackBar.openFromComponent(HtmlSnackbarComponent, {
                ...config,
                data: { message },
            });
        } else {
            return this._snackBar.open(message, 'OK', { ...config });
        }
    }

}



