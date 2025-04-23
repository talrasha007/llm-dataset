<template>
{{ questions }}
<QuestionModal v-model:show="show" :dataset_id="parseInt($route.params.dataset_id as string)" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuestions } from '../db'
import QuestionModal from './QuestionModal.vue'

const props= defineProps<{
  dataset_id: number;
}>()

const show = ref(false)
let questions = useQuestions(props.dataset_id)
watch(() => props.dataset_id, () => {
  questions = useQuestions(props.dataset_id)
})
</script>

