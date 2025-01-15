<template>
    <div>
        <Toast position="bottom-center" group="my">
        </Toast>
    </div>
</template>
<script setup>
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    severity: String,
    title: String,
    message: String
});

const toast = useToast();
const showTemplate = () => {
        toast.add({ severity:  props.severity || 'success', summary: props.title,detail:  props.message || '', group: 'my', life: 5000 });
};

defineExpose({ showTemplate });

</script>