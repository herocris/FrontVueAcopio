<template>
    <a-button type="primary" @click="handleNew">
        <FileAddOutlined />
    </a-button>
    <a-flex horizontal justify="center" align="center" gap="small">
        <BienTable :idInform="props.idInform" :uploadvisible="uploadvisible" :togleUploadvisible="togleUploadvisible"></BienTable>
        <BienCard :idInform="props.idInform" :uploadvisible="uploadvisible" ></BienCard>
    </a-flex>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BienTable from "@/informe/components/bien/BienTable.vue"
import BienCard from "@/informe/components/bien/BienCard.vue"
import { FileAddOutlined } from '@ant-design/icons-vue';
import { useBien } from "@/informe/composables/useBien";


const { disableAdd, disableEdit, disableDelete,fileList, ClearDataBien } = useBien();

interface Props {
    idInform: number;
};
const props = defineProps<Props>();
const uploadvisible = ref(false);

const handleNew = () => {
    fileList.value = []
    uploadvisible.value = false
    disableAdd.value = true
    disableDelete.value = false
    disableEdit.value = false
    ClearDataBien()
}

const togleUploadvisible = (valor:boolean) => {
    uploadvisible.value = valor
}

</script>