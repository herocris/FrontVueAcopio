import { Informe, Ubicacion,AmbitosForm, FormStateInforme } from "@/informe/interfaces/informe";
import { defineStore } from "pinia";
import { ref } from "vue";
import dayjs from 'dayjs';
import { AdjuntoForm } from '../informe/interfaces/informe';


export const useInforme2Store = defineStore('informe2', () => {
    
    //parametros de getInforms
    const loading = ref<boolean>(false);

    const dataSource = ref<Informe[]>([]);
    const current = ref<number>(1);
    const pageSize = ref<number>(0); // O el tamaño de página deseado
    const totalRecords = ref<number>(0); // O el tamaño de página deseado

    const fechas = ref<dayjs.Dayjs[]>([]);
    const adjuntosInf = ref<AdjuntoForm[]>([]);
    const ambitosSelect = ref<string[]>([]);
    const ubicacionesInf = ref<Ubicacion[]>([]);
    //parametros de getInform
    // const informe = ref<Informe>({
    //     id:0,
    //     expediente:'',
    //     usuariocreador_id:0,
    //     titulo:'',
    //     producto_id:'',
    //     fechainicioevento:new Date,
    //     fechafinalevento:new Date,
    //     municipio_id:0,
    //     situacionactual:'',
    //     observacion:{
    //         id: 0,
    //         informe_id: 0,
    //         descripcion: '',
    //         created_at: new Date,
    //         updated_at: new Date,
    //         deleted_at: null,
    //     },
    //     usuarioeditor_id:0,
    //     palabraclave:'',
    //     created_at:new Date,
    //     updated_at:new Date,
    //     deleted_at:null,
    //     antecedente:{
    //         id: 0,
    //         informe_id: 0,
    //         descripcion: '',
    //         created_at: new Date,
    //         updated_at: new Date,
    //         deleted_at: null,
    //     },
    //     adjuntos:[],
    //     ambitos:[],
    // });

    const informe = ref<FormStateInforme>({
        id:0,
        titulo: '',
        expediente: '',
        producto_id: '',
        fechas: [],
        antecedente: '',
        situacionactual: '',
        observacion: '',
        ambitos: [],
    });
    

    const $reset = () => {
        // informe.value = {
        //     id:0,
        //     expediente:'',
        //     usuariocreador_id:0,
        //     titulo:'',
        //     producto_id:'',
        //     fechainicioevento:new Date,
        //     fechafinalevento:new Date,
        //     municipio_id:0,
        //     situacionactual:'',
        //     observacion:{
        //         id: 0,
        //         informe_id: 0,
        //         descripcion: '',
        //         created_at: new Date,
        //         updated_at: new Date,
        //         deleted_at: null,
        //     },
        //     usuarioeditor_id:0,
        //     palabraclave:'',
        //     created_at:new Date,
        //     updated_at:new Date,
        //     deleted_at:null,
        //     antecedente:{
        //         id: 0,
        //         informe_id: 0,
        //         descripcion: '',
        //         created_at: new Date,
        //         updated_at: new Date,
        //         deleted_at: null,
        //     },
        //     adjuntos:[],
        //     ambitos:[],
        // }

         informe.value ={
            id:0,
            titulo: '',
            expediente: '',
            producto_id: '',
            fechas: [],
            antecedente: '',
            situacionactual: '',
            observacion: '',
            ambitos: [],
        };
        fechas.value = []
        adjuntosInf.value=[]
        ubicacionesInf.value=[]
        ambitosSelect.value= []
    };

    return {
        $reset,
        dataSource,
        totalRecords,
        current,
        pageSize,
        loading,
        informe,
        fechas,
        adjuntosInf,
        ambitosSelect,
        ubicacionesInf
    }
})