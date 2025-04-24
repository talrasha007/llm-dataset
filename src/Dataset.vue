<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Row, Col, Button, Space, Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { FileAddOutlined, DownOutlined } from '@ant-design/icons-vue'

import db from './db'

import QuestionModal from './components/QuestionModal.vue'
import QuestionTable from './components/QuestionTable.vue'

const show = ref(false)

const route = useRoute()
async function downloadAsOpenai() {
  const results = await db.questions.where('dataset_id').equals(route.params.dataset_id as string).toArray()

  const content = results.map(result => {
    return JSON.stringify({
      messages: [
        { role: 'system', content: '$SYSTEM$' },
        { role:'user', content: result.question },
        { role:'assistant', content: result.answer }
      ]
    })
  }).join('\n')
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'openai.jsonl'
  a.click()
  URL.revokeObjectURL(url)
}

</script>

<template>
  <Row>
    <Col flex="auto"></Col>
    <Col flex="none">
      <Space>
        <Dropdown>
          <template #overlay>
            <Menu>
              <MenuItem @click="downloadAsOpenai">
                <span>Openai finetune</span>
              </MenuItem>
              <MenuItem>
                <span>CF Workers Finetune</span>
              </MenuItem>
            </Menu>
          </template>
          <Button>
            <Space>
              Download as
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Button type="primary" @click="show = true"><FileAddOutlined />Add</Button>
      </Space>
    </Col>
  </Row>
  <br />
  <QuestionTable :dataset_id="$route.params.dataset_id as string" />
  <QuestionModal v-model:show="show" :dataset_id="$route.params.dataset_id as string" />
</template>
