import { Link } from "@/shared/interfaces/sharedInterfaces";

export interface BitacoraData {
    current_page: number;
    data: Bitacora[];
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

export interface Bitacora {
    id:           number;
    log_name:     string;
    description:  string;
    subject_type: string;
    event:        string;
    subject_id:   number;
    causer_type:  string;
    causer_id:    number;
    properties:   Properties;
    batch_uuid:   null;
    created_at:   Date;
    updated_at:   Date;
}

export interface Properties {
    old: Old;
}

export interface Old {
    nombre:   string;
    contacto: string;
    telefono: string;
}











