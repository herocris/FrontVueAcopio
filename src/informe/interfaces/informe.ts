import { Ambito, Link } from "@/shared/interfaces/sharedInterfaces";
import { Producto } from '@/shared/interfaces/sharedInterfaces';
import { TipoBien } from '@/shared/interfaces/sharedInterfaces';


export interface Informes {
    current_page: number;
    data: Informe[];
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

/////
export interface Informe {
    id: number;
    expediente: string;
    usuariocreador_id: number;
    titulo: string;
    producto_id: string;
    fechainicioevento: Date;
    fechafinalevento: Date;
    municipio_id: number;
    situacionactual: string;
    observacion: Observacion;
    usuarioeditor_id: number;
    palabraclave: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    antecedente: Antecedente;
    adjuntos: Adjunto[];
    ambitos: Ambito[];
    //observacion: string;
}

export interface FormStateInforme {
    id: number;
    titulo: string;
    expediente: string;
    producto_id: string;
    fechas: string[];
    antecedente: string;
    situacionactual: string;
    observacion: string;
    ambitos: string[];
}

export interface Adjunto {
    id: number;
    adjuntable_id: number;
    adjuntable_type: AdjuntableType;
    url: string;
    descripcion: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface AdjuntoForm {
    uid: string;
    name: string;
    status: string;
    url: string;
}

export interface FileUpload {
    idfoto?: number;
    uid:    string;
    lastModified:number;
    lastModifiedDate:Date;
    name:string;
    size:number;
    type:string;
    webkitRelativePath:string;
}


export interface ColumnTable {
    title: string;
    dataIndex?: string;
    key?: string;
    sorter?: boolean;
    width?: string;
    filters?: any[]
}

export interface parameterTableSelect {
    text: string;
    value: string;
}
export interface parameterFormSelect {
    key?: number;
    label?: string;
    value: string;
}




export interface ParametrosFormInforme {
    productos: Producto[];
    ambitos: Ambito[];
}



export interface AmbitosForm {
    value:string
}

export interface AdjuntosForm {
    uid: string;
    idfoto: number;
    name: string;
    status: string;
    url: string
}


export interface Ubicacion {
    id: number;
    latitud: number;
    longitud: number;
    descripcion: string;
    tipo: number;
    informe_id: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: null;
}


export enum AdjuntableType {
    AppModelsBien = "App\\Models\\Bien",
    AppModelsInforme = "App\\Models\\Informe",
    AppModelsPersona = "App\\Models\\Persona",
}


export interface AmbitoPivot {
    informe_id: number;
    ambito_id: number;
}

export interface Antecedente {
    id: number;
    informe_id?: number;
    descripcion: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface Observacion {
    id: number;
    informe_id?: number;
    descripcion: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface Bien {
    id: number;
    tipobien_id: string;
    descripcion: string;
    tipobien:TipoBien;
    pivot?: BienPivot;
    adjuntos?: Adjunto[];
}

export interface TipoBienForm {
    value: string;
    label: string;
    key: number;
}



export interface Persona {
    id: number;
    nombre: string;
    identidad: string;
    pivot?: PersonaPivot;
    adjuntos?: Adjunto[];
}

export interface BienPivot {
    informe_id: number;
    bien_id: number;
}

export interface PersonaPivot {
    informe_id: number;
    persona_id: number;
}

export interface Ubicacione {
    id: number;
    latitud: number;
    longitud: number;
    descripcion: string;
    tipo: number;
    informe_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
