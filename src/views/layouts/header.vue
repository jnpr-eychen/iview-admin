<style scoped>
.layout-header-bar{
  padding: 0 10px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
</style>
<template>
  <Header class="layout-header-bar">
    <Icon @click.native="handleCollapsed" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24" class="menu-icon"></Icon>
  </Header>
</template>
<script>
export default {
  name: 'jy-header',
  props: {
    isCollapsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    rotateIcon() {
      return this.isCollapsed ? 'rotate-icon' : ''
    }
  },
  mounted() {},
  methods: {
    handleCollapsed() {
      this.$emit('on-change', !this.isCollapsed)
    }
  }
}
</script>
