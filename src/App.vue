<template>
  <div id="app-p">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$store)
  }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
#app-p{
  width: 100%;
  height: 100%;
}
</style>
