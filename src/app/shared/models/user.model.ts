export type AllowedRole = 'super' | 'admin' | 'buyer';

export class Permission {
    _id?: string;
    module: string;
    name: string;
    label: string;
    description: string;
}

export class Role {
    _id?: string;
    name: string;
    label: string;
    permissions: Permission[];
    rank: number;
    desription: string;
    createdAt?: Date;
}

export interface User {
    _id: string;
    lastName: string;
    firstName: string;
    email: string;
    role: Role;
    permissions: Permission[];
    status: boolean;
    atHash?: string;
    rtHash?: string;
    createdBy?: User;
    createdAt?: Date;
    accounts: string[];
}

export interface SelectablePermission extends Permission {
    active: boolean;
    disabled?: boolean;
}

export interface PermissionGroup {
    module: string;
    permissions: SelectablePermission[];
}

export interface SelectableRole extends Role {
    groupedPermissions: PermissionGroup[];
}

export interface RegisterParams {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    passwordRepeat: string;
}

export interface Credentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface LoginResponse {
    user: User,
    tokens: {
        access_token: string;
        refresh_token: string;
    }
}

export interface UsersPaginated {
    users: User[];
    total: number;
}

export interface BusinessCenter {
    bc_id: string;
    name: string;
}