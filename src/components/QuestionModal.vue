<template>
  <Modal :open="show" @update:open="$emit('update:show', $event)" title="Q&A" @ok="handleOk">
    <Form
      name=""
      :model="formData"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      ref="formRef"
    >
      <FormItem
        label="Question"
        name="question"
        :rules="[{ required: true, message: 'Please input question!' }]"
      >
        <Input v-model:value="formData.question" />
      </FormItem>
      <FormItem
        label="Answer"
        name="answer"
        :rules="[{ required: true, message: 'Please input answer!' }]"
      >
        <Input.TextArea v-model:value="formData.answer" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Modal, Form, FormItem, Input } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

import db, { type Question } from '../db'

const props = defineProps<{
  id?: number;
  dataset_id: number;
  question?: Question;
  show: boolean;
}>()

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void;
}>()

interface FormData {
  question: string;
  answer: string;
}

const formData = reactive<FormData>({
  question: '',
  answer: '',
})

const formRef = ref<FormInstance>();

function handleOk() {
  formRef.value?.validate().then((values) => {
    const dbPromise = props.id ?
      db.questions.update(props.id, {
        question: values.question,
        answer: values.answer,
        ts: Date.now(),
      }) :
      db.questions.add({
        dataset_id: props.dataset_id,
        question: values.question,
        answer: values.answer,
        ts: Date.now(),
        create_ts: Date.now(),
      })
    
    dbPromise
      .then(() => emit('update:show', false))
      .catch(() => alert('Dataset already exists'))    
  }).catch(() => {});
}

watch(() => props.question, (question) => {
  if (question) {
    formData.question = question.question
    formData.answer = question.answer
  }  
})
</script>