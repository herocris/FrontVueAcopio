<template>
    <a-button type="primary" @click="handleNew">
        <FileAddOutlined />
    </a-button>
    <a-flex horizontal justify="center" align="center" gap="small">
        <PersonTable :idInform="props.idInform" :togleUploadvisible="togleUploadvisible"></PersonTable>
        <PersonCard :idInform="props.idInform" :uploadvisible="uploadvisible"></PersonCard>
    </a-flex>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PersonTable from "@/informe/components/persona/PersonTable.vue"
import PersonCard from "@/informe/components/persona/PersonCard.vue"
import { FileAddOutlined } from '@ant-design/icons-vue';
import { usePersona } from "@/informe/composables/usePersona";

const { disableAdd, disableEdit, disableDelete,fileList, ClearDataPerson } = usePersona();

interface Props {
    idInform: number;
};
const props = defineProps<Props>();
const uploadvisible = ref<boolean>(false);

const handleNew = () => {
    fileList.value=[]
    uploadvisible.value = false
    disableAdd.value = true
    disableDelete.value = false
    disableEdit.value = false
    ClearDataPerson()
}

const togleUploadvisible = (valor:boolean) => {
    uploadvisible.value = valor
}


</script>