export interface ParamsUrlgetData {
    page: number;
    results: any;
    sort_by?: string;
    sort_by_order?:string;
    filters?: any;
}

export interface Ambito {
    id?: number;
    nombre: string;
    descripcion?: string;
}

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface TipoBien {
    id:          number;
    nombre:      string;
    descripcion: string;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    permissions:Permission[];
    pivot: Pivot;
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    pivot: Pivot;
}

export interface Pivot {
    model_id: number;
    permission_id: number;
    model_type: string;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}