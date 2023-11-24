import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard = (next) => {
    const authService = inject(AuthService);
    return authService.verify().pipe(
        map(() => {
            return true;
        }),
        catchError((error) => {
            return of(null);
        })
    );
}
