<template>
  <Modal :open="show" @update:open="$emit('update:show', $event)" :title="title" @ok="handleOk">
    <Form
      name=""
      :model="formData"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      ref="formRef"
    >
      <FormItem
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input ds name!' }]"
      >
        <Input v-model:value="formData.name" />
      </FormItem>
      <FormItem
        label="Description"
        name="description"
        :rules="[{ required: true, message: 'Please input ds description!' }]"
      >
        <Input.TextArea v-model:value="formData.description" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Modal, Form, FormItem, Input } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

import db from '../db'

defineProps<{
  title: string;
  show: boolean;
}>()

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void;
}>()

interface FormData {
  name: string;
  description: string;
}

const formData = reactive<FormData>({
  name: '',
  description: '',
})

const formRef = ref<FormInstance>();

function handleOk() {
  formRef.value?.validate().then((values) => {
    db.datasets.add({
      name: values.name!,
      description: values.description!,
      ts: Date.now(),
      create_ts: Date.now(),
    })
    .then(() => emit('update:show', false))
    .catch(() => alert('Dataset already exists'))    
  }).catch(() => {});
}
</script>