
<template>
  <Row :gutter="[16, 24]">
    <Col span="6" v-for="ds of datasets">
      <Card :title="ds.name">
        <p>{{ ds.description }}</p>
      </Card>
    </Col>
    <Col span="6">
      <Card title="Add New Dataset" @click="showDatasetModal=true" style="cursor: pointer;">
        <p style="text-align: center;">+</p>
      </Card>
    </Col>
  </Row>
  <DatasetModal title="Add Dataset" v-model:show="showDatasetModal" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { liveQuery } from "dexie"
import { Row, Col, Card } from 'ant-design-vue'
import db, { type Dataset } from './db'
import { from } from 'rxjs'
import { useObservable } from '@vueuse/rxjs'

import DatasetModal from './components/DatasetModal.vue'

const showDatasetModal = ref(false)
const datasets: Ref<Dataset[] | undefined> = useObservable(from(liveQuery(() => db.datasets.toArray())))
</script>