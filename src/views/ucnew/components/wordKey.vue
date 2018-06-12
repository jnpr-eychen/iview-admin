<style lang="less" scoped>
@import "../index.less";
.work-key {
    padding: 10px 15px;
    max-width: 240px;
    max-height: 270px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
</style>

<template>
  <div class="work-key">
    <h4 class="title">
      <Checkbox v-model="isChecked" :disabled="true">
        {{treeTitle}}
        <Tooltip placement="bottom">
          <Icon type="help-circled"></Icon>
          <div slot="content">
            <p v-for="(tip, index) in tipsText" :key="index">{{tip}}</p>
          </div>
        </Tooltip>
      </Checkbox>
    </h4>
    <div class="content">
      <Input v-model="wordList" type="textarea">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    treeTitle: {
      type: String,
      default: ''
    },
    words: {
      type: [Array, Object, String],
      default: (() => [])
    },
    tipsText: {
      type: [Array, String],
      default: (() => [])
    }
  },
  data() {
    return {
      isChecked: false,
      tipTxt: '',
      wordList: []
    }
  },
  methods: {
    handleTree(list) {
      this.isChecked = list.length > 0
      this.$emit('on-change', list)
    }
  }
}
</script>