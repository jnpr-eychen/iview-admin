<style scoped>
.selecter{
  display: inline-block;
  width: inherit;
}
</style>
<template>
  <div class="selecter">
    <Select :placeholder="placeholder" v-model="val" class="sel_state" @on-change="handleSelectChange()">
      <Option v-for="(item, index) in data" :value="item.type" :key="index">{{item.name}}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  name: 'selecter',
  props: {
    value: {
      type: [Number, String]
    },
    placeholder: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      val: ''
    }
  },
  mounted() {
    this.val = this.value
  },
  methods: {
    handleSelectChange() {
      this.value = this.val
      this.$emit('on-change', this.val)
    }
  }
}
</script>
