<template>
  <QuestionTable :dataset_id="parseInt($route.params.dataset_id as string)" />
</template>

<script setup lang="ts">
import QuestionTable from './components/QuestionTable.vue'
</script>