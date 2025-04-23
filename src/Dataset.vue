<template>
  Dataset: {{ route.params.dataset_id  }}
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>