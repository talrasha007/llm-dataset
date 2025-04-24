<script setup lang="ts">
import { ref } from 'vue'
import { Row, Col, Button } from 'ant-design-vue'
import { FileAddOutlined } from '@ant-design/icons-vue'

import QuestionModal from './components/QuestionModal.vue'
import QuestionTable from './components/QuestionTable.vue'

const show = ref(false)
</script>

<template>
  <Row>
    <Col flex="auto"></Col>
    <Col flex="none">
      <Button type="primary" @click="show = true"><FileAddOutlined />Add</Button>
    </Col>
  </Row>
  <br />
  <QuestionTable :dataset_id="$route.params.dataset_id as string" />
  <QuestionModal v-model:show="show" :dataset_id="$route.params.dataset_id as string" />
</template>
