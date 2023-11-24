import { inject } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Permission } from '../models/user.model';
import { uniq } from 'underscore';
import { AlertService } from '../services/alert.service';

export const permissionGuard = (next) => {
    const authService = inject(AuthService);
    const alertService = inject(AlertService);

    const allowedPermissions: string[] = next.data.allow || [];

    const userRolePermissions: Permission[] = authService.currentUser.role.permissions;
    const userCustomPermissions: Permission[] = authService.currentUser.permissions;
    const userUniquePermissions: Permission[] = uniq(userRolePermissions.concat(userCustomPermissions), permission => permission.name);

    let intersection = allowedPermissions.filter(allowedPermission => userUniquePermissions.find(userPermission => userPermission.name === allowedPermission));

    if (intersection && intersection.length) {
        return true;
    } else {
        alertService.danger('No permission');
        return false;
    }

}