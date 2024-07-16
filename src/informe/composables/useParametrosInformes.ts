import clientsApi from '@/api/informe-api';
import { ref } from "vue";
import { ParametrosFormInforme, parameterTableSelect, parameterFormSelect } from '../interfaces/informe';
import { Ambito, Producto } from '../../shared/interfaces/sharedInterfaces';

export const useParametrosInformes = () => {
    const ProductTableParameters = ref<parameterTableSelect[]>([]);
    const AmbitosTableParameters = ref<parameterTableSelect[]>([]);
    const ProductFormParameters = ref<parameterFormSelect[]>([]);
    const AmbitosFormParameters = ref<parameterFormSelect[]>([]);

    const getInformsParameters = async (typeParameter: string): Promise<void> => {
        try {
            const { data } = await clientsApi.get<ParametrosFormInforme>('/parametrosInforme');
            const { ambitos, productos } = data

            if (typeParameter == 'table') {//
                ProductTableParameters.value = [...productos.map((producto: Producto) => ({ 'text': producto.nombre, 'value': producto.nombre }))]
                AmbitosTableParameters.value = [...ambitos.map((ambito: Ambito) => ({ 'text': ambito.nombre, 'value': ambito.nombre }))]
            } else {
                ProductFormParameters.value = [...productos.map((producto: Producto) => ({
                    'value': producto.nombre,
                    'label': producto.nombre,
                    'key': producto.id,
                }))] //para copiar contenido de un arreglo en otro
                AmbitosFormParameters.value = [...ambitos.map((ambito: Ambito) => ({ 'value': ambito.nombre, 'key': ambito.id }))]
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
        }
    };

    return {
        getInformsParameters,
        ProductTableParameters,
        AmbitosTableParameters,
        ProductFormParameters,
        AmbitosFormParameters,
    }
}