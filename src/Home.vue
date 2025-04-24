
<template>
  <DBSource />
  <Row :gutter="[16, 24]">
    <Col span="6" v-for="ds of datasets" class="card" @click="router.push(`/${ds.id!}`)">
      <Card :title="ds.name">
        <p>{{ ds.description }}</p>
        <Divider />
        <Row>
          <Col flex="auto"></Col>
          <Col flex="none">
            <Space>
              <Button @click="$event.stopPropagation(); modalDs = ds; showDatasetModal = true" type="primary" size="small"><EditOutlined /></Button>
              <Button @click="del(ds.id!, $event)" type="primary" size="small" danger><DeleteOutlined /></Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </Col>
    <Col span="6">
      <Card title="Add New Dataset" @click="modalDs = undefined; showDatasetModal = true" class="card">
        <p style="text-align: center;"><FileAddOutlined style="font-size: 32px; padding: 24px 0;" /></p>
      </Card>
    </Col>
  </Row>
  <DatasetModal :dataset="modalDs" title="Add Dataset" v-model:show="showDatasetModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Row, Col, Card, Space, Button, Divider } from 'ant-design-vue'
import { FileAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

import db, { useDatasets, type Dataset } from './db'

import DBSource from './components/DBSource.vue'
import DatasetModal from './components/DatasetModal.vue'

const router = useRouter()
const modalDs = ref<Dataset | undefined>()
const showDatasetModal = ref(false)
const datasets = useDatasets()

async function del(id: string, event: MouseEvent) {
  event.stopPropagation()

  if (confirm('Are you sure?'))
    await db.datasets.delete(id)
    await db.questions.where('dataset_id').equals(id).delete()
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
</style>