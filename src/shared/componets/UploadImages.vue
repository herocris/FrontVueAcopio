<template>
    <template v-if="propsUpload.tipo == 'persona' || propsUpload.tipo == 'bien'">
        <div>
            <a-upload v-model:file-list="listaUpload" :before-upload="beforeUpload" list-type="picture-card"
                @remove="handleDele" @preview="handlePreview" :disabled="propsUpload.loading">
                <div v-if="listaUpload.length < propsUpload.nfiles && propsUpload.upvisible">
                    <plus-outlined />
                    <div style="margin-top: 8px">Upload</div>
                </div>
            </a-upload>
            <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </div>
    </template>
    <template v-else>
        <div>
            <a-upload v-model:file-list="listaUpload" :before-upload="beforeUpload" list-type="picture"
                @remove="handleDele" :disabled="propsUpload.loading">
                <a-button>
                    <UploadOutlined />
                    upload
                </a-button>
            </a-upload>
        </div>
    </template>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message, Upload } from 'ant-design-vue';

const emit = defineEmits(['modelUpdateList', 'setValLoading'])

interface Props {
    tipo: string;
    fileList: AdjuntoForm[];
    idmodel: number;
    upvisible: boolean;
    loading: boolean;
    nfiles: number;
    idInforme?: number;
};
const propsUpload = defineProps<Props>();

import { useUpload } from "@/shared/composables/useUpload";
import { AdjuntoForm } from '../../informe/interfaces/informe';

const { uploadFile, deleteFile, loading } = useUpload();

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const listaUpload = ref<AdjuntoForm[]>(propsUpload.fileList);

watch(
    () => propsUpload.fileList,
    () => { 
        listaUpload.value = propsUpload.fileList 
    }
);

function getBase64(file:File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const handleDele = async (file:AdjuntoForm) => {
    console.log(file);
    emit('setValLoading', true)
    deleteFile(file).then(async () => {
        listaUpload.value = listaUpload.value.filter((adjunto:AdjuntoForm) => (adjunto.uid != file.uid))
        console.log(file);
        emit('modelUpdateList', propsUpload.idInforme)
    }).catch(error => {
        console.error('Error:', error);
    }).finally(() => {
        emit('setValLoading', false)
    });

    return false
};

const beforeUpload = async (file:File) => {
    
    const isJpgOrPng=propsUpload.tipo=='informe'? 
    (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'):
    (file.type === 'image/jpeg' || file.type === 'image/png');
    console.log(file);
    if (!isJpgOrPng) {
        message.error('Tipo de archivo no admitivo!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    if (isJpgOrPng) {
        emit('setValLoading', true)
        
        uploadFile(file, propsUpload.tipo, propsUpload.idmodel).then(async archivo => {//para que el axios devuelva un valor
            listaUpload.value = archivo
            emit('modelUpdateList')
        }).catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            emit('setValLoading', false)
        });
        return false;
    }else{
        return Upload.LIST_IGNORE; //para no realizar la subida
    }
};


</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>