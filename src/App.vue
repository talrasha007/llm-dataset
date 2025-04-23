<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Layout, Row, Col, LayoutHeader, LayoutContent, Select, SelectOption, Menu, ConfigProvider } from 'ant-design-vue'
import { GithubFilled } from '@ant-design/icons-vue'

import db, { useDatasets } from './db'

const route = useRoute()
const router = useRouter()
const datasets = useDatasets()
const currentDatasetName = ref('')
watch(() => route.path, async (path) => {
  if (path === '/') {
    currentDatasetName.value = ''
  } else {
    const dataset = await db.datasets.get(parseInt(route.params.dataset_id as string))
    currentDatasetName.value = dataset?.name || ''
  }
})
</script>

<template>
  <ConfigProvider>
    <Layout>
      <LayoutHeader>
        <Row class="top-nav" :gutter="16">
          <Col flex="none"><RouterLink to="/" style="display: flex; align-items: center;"><img src="/favicon.svg" class="logo" /></RouterLink></Col>
          <Col flex="none" v-if="currentDatasetName">
            <Select
              v-model:value="currentDatasetName"
              theme="dark"
              placeholder="Select Dataset"
              style="width: 200px;"
              @change="(val) => router.push(`/${val}`)"
            >
              <SelectOption v-for="dataset in datasets" :key="dataset.id" :value="dataset.id">{{ dataset.name }}</SelectOption>
            </Select>
          </Col>
          <Col flex="none">
            <Menu
              :selectedKeys="[]"
              mode="horizontal"
              theme="dark"
            >
            </Menu>
          </Col>
          <Col flex="auto" />
          <Col flex="none">
            <a style="color: white;" href="https://github.com/talrasha007/llm-dataset" target="_blank">
              <GithubFilled style="font-size: 20px;" />
            </a>
          </Col>
        </Row>
      </LayoutHeader>
      <LayoutContent style="padding: 24px 50px; background-color: #eee;">
        <RouterView />
      </LayoutContent>
    </Layout>

  </ConfigProvider>
</template>

<style lang="scss" scoped>
.top-nav {
  color: white;

  > * {
    display: flex;
    align-self: center;
  }

  .logo {
    height: 30px;
    cursor: pointer;
  }
}
</style>
