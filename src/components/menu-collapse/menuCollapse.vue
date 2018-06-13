<style scoped>
.menu-item >>> span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item >>> i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.menu-item >>> .ivu-menu-submenu-title > i:not(.ivu-icon-android-radio-button-on){
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu >>> .ivu-menu-submenu-title > i:not(.ivu-icon-android-radio-button-on){
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
  <Menu ref="asideMenu" @on-select="handleMenuSelect" :mode="mode" width="auto" :theme="theme" accordion :active-name="activeName" :open-names="openName" :class="menuitemCls" class="menu-item no-wrap">
    <template v-if="menuList && menuList.length !== 0" v-for="(item, index) in menuList">
      <jy-subMenu :value="item" :key="index"></jy-subMenu>
    </template>
  </Menu>
</template>
<script>
import jySubMenu from '@/components/menu-collapse/subMenu'
export default {
  name: 'jy-menu',
  components: {
    jySubMenu
  },
  props: {
    menuList: {
      type: Array,
      default: () => ([])
    },
    theme: {
      type: String,
      default: 'dark'
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    accordion: {
      type: Boolean,
      default: false
    },
    menuitemCls: {
      type: [Array, String],
      default: ''
    }
  },
  data() {
    return {
      openName: [],
      activeName: ''
    }
  },
  mounted() {
    this.initOpenName()
  },
  updated() {
    this.$nextTick(() => {
      // 更新展开的子目录
      this.$refs.asideMenu.updateOpened()
    })
  },
  methods: {
    initOpenName() {
      const ret = []
      // 查找展开的子目录 -> 暂时存在bug 稍后解决
      const currRoute = this.$router.history.current.matched
      ret.push(currRoute[currRoute.length - 1].name)
      // const currRoute = this.$router.history.current.path.split('/')
      // ret.push(currRoute[currRoute.length - 1])
      this.openName = ret
      console.log('r', this.openName, this.$router)
    },
    handleMenuSelect(name) {
      this.activeName = name
      this.initOpenName()
      this.$emit('on-change', name)
    }
  }
}
</script>
