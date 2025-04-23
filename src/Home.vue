
<template>
  <Row :gutter="[16, 24]">
    <Col span="6" v-for="ds of datasets" class="card" @click="router.push(`/${ds.id!}`)">
      <Card :title="ds.name">
        <p>{{ ds.description }}</p>
      </Card>
    </Col>
    <Col span="6">
      <Card title="Add New Dataset" @click="showDatasetModal=true" class="card">
        <p style="text-align: center;"><FileAddOutlined /></p>
      </Card>
    </Col>
  </Row>
  <DatasetModal title="Add Dataset" v-model:show="showDatasetModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Row, Col, Card } from 'ant-design-vue'
import { FileAddOutlined } from '@ant-design/icons-vue'

import { useDatasets } from './db'

import DatasetModal from './components/DatasetModal.vue'

const router = useRouter()
const showDatasetModal = ref(false)
const datasets = useDatasets()
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
</style>