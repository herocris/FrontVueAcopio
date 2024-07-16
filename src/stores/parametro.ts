import { defineStore, storeToRefs } from "pinia";
import { ref, Ref } from "vue";
import { Ambito, Producto, TipoBien } from '@/parametros/interfaces/parametro'

export const useParametroStore2 = defineStore('parametro', () => {

    const dataSourceTable = ref<Ambito[] | Producto[] | TipoBien[]>([]);
    const error = ref<Object>({});
    const loading = ref<boolean>(false);
    const IsNew = ref<boolean>(false);
    const openModal = ref<boolean>(false);


    const total = ref<number>(0)
    const current = ref<number>(0)
    const pageSize = ref<number>(0)

    const paramData = ref<Ambito | Producto | TipoBien | null>(null);

    const $reset = () => {
        dataSourceTable.value = []
    };

    return { IsNew, openModal, error, loading, paramData, total, current, dataSourceTable, pageSize, $reset};
})