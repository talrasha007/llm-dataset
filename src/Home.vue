
<template>
  <Row :gutter="16">
    <Col span="6">
      <Card title="Add New Dataset" @click="showDatasetModal=true" style="cursor: pointer;"></Card>
    </Col>
  </Row>
  <DatasetModal title="Add Dataset" v-model:show="showDatasetModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { liveQuery } from "dexie"
import { Row, Col, Card } from 'ant-design-vue'
// import db from './db'
// import { useObservable } from "@vueuse/rxjs"
import DatasetModal from './components/DatasetModal.vue'

const showDatasetModal = ref(true)
</script>