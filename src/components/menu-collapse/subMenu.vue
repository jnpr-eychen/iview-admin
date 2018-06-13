<style scoped>
.jy-sub-menu{
  width: 100%;
  height: 100%;
  background-color: #2d2f38;
}
</style>
<template>
  <div class="jy-sub-menu">
    <MenuItem v-if="value && !value.children" :name="value.name">
      <Icon :type="value.icon"></Icon>
      {{value.title}}
    </MenuItem>
    <Submenu v-if="value && value.children" :name="value.name">
      <template slot="title">
        <Icon :type="value.icon"></Icon>
        {{value.title}}
      </template>
      <template v-for="(sub, index) in value.children">
        <jy-subMenu :value="sub" :key="index"></jy-subMenu>
      </template>
    </Submenu>
  </div>
</template>
<script>
export default {
  name: 'jy-subMenu',
  props: {
    value: Object
  },
  watch: {
    value(newVal) {
      this.value = newVal
    }
  }
}
</script>
