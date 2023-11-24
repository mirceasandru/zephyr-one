import { inject } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { UsersService } from 'src/app/modules/admin/users/users.service';
import { catchError, map, of } from 'rxjs';
import { AlertService } from '../services/alert.service';

export const rankGuard = (next) => {
    const authService = inject(AuthService);
    const usersService = inject(UsersService);
    const alertService = inject(AlertService);

    const currentUser = authService.currentUser;
    return usersService.getUserById(next.params['id']).pipe(
        map((user) => {
            const rankAllow = authService.verifyRank(currentUser, user)
            if (!rankAllow) alertService.danger('No permission');
            return rankAllow;
        }),
        catchError(() => {
            return of(false);
        })
    );
}