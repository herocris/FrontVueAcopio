import { Ambito,TipoBien,Producto, Link } from '../../shared/interfaces/sharedInterfaces';
export interface Parametro {
    parametros: ParametrosResponse;
}

export interface ParametrosResponse {
    current_page:   number;
    data:           Ambito[] | Producto[] | TipoBien[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  string;
    to:             number;
    total:          number;
}

