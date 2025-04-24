<template>
  <Table :data-source="questions" :columns="columns" :pagination="false" bordered>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'actions'">
        <Space>
          <Button type="primary" @click="show = true; question = record as Question"><EditOutlined />Edit</Button>
          <Button type="primary" danger @click="del(record.id)"><DeleteOutlined /></Button>
        </Space>
      </template>
    </template>
  </Table>

  <QuestionModal v-model:show="show" :question="question" :id="question?.id" :dataset_id="$route.params.dataset_id as string" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Table, Button, Space, type TableColumnType } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

import db, { useQuestions, type Question } from '../db'
import QuestionModal from './QuestionModal.vue'

const props= defineProps<{
  dataset_id: string;
}>()

const show = ref(false)
const question = ref<Question | undefined>()

let questions = useQuestions(props.dataset_id)
watch(() => props.dataset_id, () => {
  questions = useQuestions(props.dataset_id)
})

function del(id: string) {
  if (confirm('Are you sure to delete this question?'))
    db.questions.delete(id)
}

const columns: TableColumnType[] = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer',
    customCell: (record: Question, dataIndex: number | undefined) => {
      if (dataIndex === undefined) return { }

      if (record.answer === questions.value?.[dataIndex - 1]?.answer) {
        return { rowSpan: 0 }
      }

      if (record.answer === questions.value?.[dataIndex + 1]?.answer) {
        let i = 1
        while (record.answer === questions.value?.[dataIndex + i]?.answer) {
          i++
        }
        return { rowSpan: i }
      }

      return { }
    }
  },
  {
    key: 'actions',
    title: ''
  }  
]
</script>

