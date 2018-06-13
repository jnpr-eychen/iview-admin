<style scoped>
.jy-aside{
  width: 100%;
  height: 100%;
  background-color: #2d2f38;
}
</style>
<template>
  <div class="jy-aside no-wrap">
    <slot name="top"></slot>
    <menuCollapse @on-change="handleMenuChange" :menu-list="menuRouter" :menuitem-cls="menuitemCls"></menuCollapse>
  </div>
</template>
<script>
import menuCollapse from '@/components/menu-collapse/menuCollapse'
import {menuRouter} from '@/router/router'
export default {
  name: 'jy-aside',
  components: {
    menuCollapse
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuRouter: menuRouter, // 菜单列表 @param {Array}
      activeName: '',
      openName: [],
      theme: 'dark',
      mode: 'vertical',
      accordion: true,
      menuitemCls: ''
    }
  },
  watch: {
    isCollapsed(newVal) {
      this.isCollapsed = newVal
      this.menuitemCls = this.menuitemClasses()
    }
  },
  mounted() {
    this.menuitemCls = this.menuitemClasses()
  },
  methods: {
    handleMenuChange(name) {
      this.$router.push({name})
    },
    menuitemClasses() {
      return this.isCollapsed ? '' : 'collapsed-menu'
    }
  }
}
</script>
