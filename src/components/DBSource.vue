<template>
  <Space style="margin-bottom: 15px;">
      <Select
        v-model:value="dbUrl"
        theme="dark"
        placeholder="Select Dataset"
        style="width: 200px;"
        @change="onDbChange"
      >
        <SelectOption v-for="dbSrc in dbSource" :key="dbSrc.url" :value="dbSrc.url">{{ dbSrc.name }}</SelectOption>
      </Select>
      <Button type="primary" @click="showModal = true">Add</Button>
  </Space>

  <Modal v-model:open="showModal" title="DB Source" @ok="add">
    <Form
      name=""
      :model="formData"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      ref="formRef"
    >
      <FormItem
        label="URL"
        name="url"
        :rules="[{ required: true, message: 'Please input db url!' }]"
      >
        <Input v-model:value="formData.url" />
      </FormItem>
      <FormItem
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input db name!' }]"
      >
        <Input v-model:value="formData.name" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Space, Button, Select, SelectOption, Modal, Form, FormItem, Input, type FormInstance } from 'ant-design-vue'

import { dbSource, dbUrl } from '../db'

interface FormData {
  url: string;
  name: string;
}
const formData = reactive<FormData>({
  url: '',
  name: '',
})

const showModal = ref(false)

function onDbChange() {
  const oldSrc = dbSource.value.find(v => v.active)
  if (oldSrc) delete oldSrc.active

  const newSrc = dbSource.value.find(v => v.url === dbUrl.value)
  if (newSrc) newSrc.active = true

  localStorage.setItem('dbSource', JSON.stringify(dbSource.value))
  window.location.reload()
}

const formRef = ref<FormInstance>();

function add() {
  formRef.value?.validate().then((value) => {
    const dbSrc = dbSource.value.find(v => v.url === value.url)
    if (dbSrc) {
      dbSrc.name = value.name
    } else {
      dbSource.value.push({
        url: value.url,
        name: value.name,
      })
    }

    localStorage.setItem('dbSource', JSON.stringify(dbSource.value))
    showModal.value = false
    formData.url = ''
    formData.name = ''
  }).catch(() => {})
}
</script>
