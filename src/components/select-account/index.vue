<template>
  <span>
    <Button type="ghost" icon="android-add" :loading="loading" @click="newsEdit">{{title}}</Button>
    <Modal v-model="accountModal" title="选择新建计划帐号" @on-ok="setAccount" @on-cancel=" accountModal = false">
      <div class="select">
        <Select v-model="account_id" placeholder="请选择帐号">
          <Option v-for="(item, index) in accountList" :value="item.account_id" :key="index">{{ item.account_name }}</Option>
        </Select>
      </div>
    </Modal>
  </span>
</template>
<script>
import Axios from '@/api/index'
export default {
  name: 'selectAccount',
  props: ['title', 'mediaType'],
  data() {
    return {
      loading: false,
      accountModal: false,
      accountList: [],
      account_id: ''
    }
  },
  methods: {
    newsEdit() {
      this.loading = true
      Axios.get('api.php', {
        action: 'api',
        opt: 'getAccount',
        media_type: this.mediaType
      })
        .then(res => {
          this.loading = false
          if (res.ret === 1) {
            this.accountList = res.data
            this.accountModal = true
          }
        })
        .catch(err => {
          this.loading = false
          console.log('获取媒体账号' + err)
        })
    },
    setAccount() {
      if (this.account_id === '') {
        this.$Message.info('请选择帐号')
        return
      }
      this.$emit('on-change', this.account_id)
      this.accountModal = false
    }
  }
}
</script>
