<style scoped>
.logo-content{
  width: 100%;
}
/* .slide-enter-active, .slide-leave-active {
  transition: width .5s;
}
.slide-enter, .slide-leave-to {
  width: 100%;
} */
</style>
<template>
  <!-- main container -->
  <Layout class="height-100">

    <!-- 侧边菜单 -->
    <Sider ref="sider" hide-trigger collapsible :collapsed-width="40" v-model="isCollapsed">
      <jy-aside ref="aside" :is-collapsed="isCollapsed">
        <div slot="top" class="logo-content text-center">
          <img v-show="!isCollapsed" src="../common/logo.png" key="max-logo" />
          <img v-show="isCollapsed" src="../common/logo-min.jpg" key="min-logo" />
        </div>
      </jy-aside>
    </Sider>

    <!-- 内容区 -->
    <Layout class="height-100">
      <jy-header @on-change="handleCollapsed" :isCollapsed="isCollapsed"></jy-header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </Layout>

  </Layout>
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
