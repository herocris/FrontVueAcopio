import { Link, Permission, Pivot, Role } from "@/shared/interfaces/sharedInterfaces";

export interface UsersData {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    roles?: Role[];
    permissions?: Permission[]
}

export interface FormState {
    id: number;
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    roles: RoleForm[];
    permissions: PermissionForm[];
}
export interface FormLoginState {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RoleTableParameter {
    text: string;
    value: string;
}

export interface RoleForm {
    value: string;
}



export interface PermissionForm {
    value: string;
}


export interface PropsUserTable {
    onEdit: Function;
    handleNew: Function;
    dataUserTable: User[];
    handleDelete: Function;
    getUsersData: Function;
    pagination: Object;
    loading: boolean
};

export interface PropsUserForm {
    openModal: boolean;
    UserData:FormState;
    ToogleModal: Function;
    IsNew: boolean;
    loading: boolean;
    addUser: Function;
    UpdateUser: Function;
    getUsersData: Function;
    UpdateRoles: Function;
    UpdatePermissions: Function;
};

export interface IsAuthResponse {
    isAuth: boolean;
    user:   User;
}









