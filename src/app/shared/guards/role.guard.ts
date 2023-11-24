import { inject } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { AllowedRole, User } from '../models/user.model';
import { AlertService } from '../services/alert.service';

export const roleGuard = (next) => {
    const authService = inject(AuthService);
    const alertService = inject(AlertService);

    const userRole: any = authService.currentUser.role.name;
    const allowedRoles: AllowedRole[] = next.data.allow || [];

    if (allowedRoles.includes(userRole)) {
        return true;
    } else {
        alertService.danger('Access denied');
        authService.logout();
        return false;
    }

}