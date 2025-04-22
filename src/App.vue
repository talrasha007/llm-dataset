<script setup lang="ts">
import { ref, h } from 'vue'
import type { MenuProps } from 'ant-design-vue';
import { Layout, Row, Col, LayoutHeader, LayoutContent, Menu, ConfigProvider } from 'ant-design-vue'
import { ApartmentOutlined, DatabaseOutlined } from '@ant-design/icons-vue'

const items = ref<MenuProps['items']>([
  {
    key: 'sync',
    icon: () => h(DatabaseOutlined),
    label: h('a', { href: '#/sync' }, 'SYNC')
  },
])
</script>

<template>
  <ConfigProvider>
    <Layout>
      <LayoutHeader>
        <Row class="top-nav">
          <Col flex="none"><img src="/favicon.svg" class="logo" /></Col>
          <Col flex="none">
            <Menu
              :items="items"
              mode="horizontal"
              theme="dark"
            />
          </Col>
        </Row>
      </LayoutHeader>
      <LayoutContent>
        bbb
      </LayoutContent>
    </Layout>
  </ConfigProvider>
</template>

<style lang="scss" scoped>
.top-nav {
  color: white;

  .logo {
    height: 30px;
    margin-top: 17px;
  }
}
</style>
