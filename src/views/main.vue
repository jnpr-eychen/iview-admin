<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>
<template>
  <div class="layout">

    <!-- main container -->
    <Layout :style="{margin: '20px', background: '#fff', minHeight: '260px'}">

      <!-- 侧边菜单 -->
      <Sider ref="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <jy-aside ref="aside" :is-collapsed="isCollapsed"></jy-aside>
      </Sider>

      <!-- 内容区 -->
      <Layout>
        <jy-header @on-change="handleCollapsed" :isCollapsed="isCollapsed"></jy-header>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </Layout>

    </Layout>
    <!-- <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
            <Icon type="ios-navigate"></Icon>
            <span>Option 1</span>
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="search"></Icon>
            <span>Option 2</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="settings"></Icon>
            <span>Option 3</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          Content
        </Content>
      </Layout>
    </Layout> -->
  </div>
</template>
<script>
import jyAside from '@/views/layouts/aside'
import jyHeader from '@/views/layouts/header'
export default {
  name: 'main-container',
  components: {
    jyAside,
    jyHeader
  },
  data() {
    return {
      isCollapsed: false
    }
  },
  methods: {
    handleCollapsed(isCollapsed) {
      this.isCollapsed = isCollapsed
      this.collapsedSider()
    },
    collapsedSider() {
      // console.log(this.$refs.aside, '11')
      this.$refs.sider.toggleCollapse()
    }
  }
}
</script>
