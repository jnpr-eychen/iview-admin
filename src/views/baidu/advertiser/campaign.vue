<style lang="less">
@import "../index.less";
</style>
<style scoped>
.inp {
  display: inline-block;
  width: 150px;
}
.ad .ivu-poptip {
  display: inline-block;
}
.sel_state {
  text-align: left;
  width: 110px;
}
.manger-head-bar:first-of-type{
    flex: 2;
    text-align: left;
}
.manger-head-bar:last-of-type{
    flex: 1;
    text-align: right;
}
</style>
<template>
  <div class="bd bd-campaign">
    <Card shadow class="margin-top-10">
      <Row type="flex" justify="space-between">
        <Col class="manger-head-bar">
          <!-- 游戏列表 -->
          <game-tree @on-change="handleGameIdChange"></game-tree>
          <!-- 搜索 -->
          <Input class="inp" placeholder="请输入推广计划ID或关键词" v-model="searchParams.keyword" @on-enter="searchCampaigns()"></Input>
          <Button type="primary" icon="search" @click="searchCampaigns()">搜索</Button>
        </Col>
        <Col class="manger-head-bar">
          <!-- 新建 -->
          <new-edit to-route-name="bd_campaign" title="新建计划"></new-edit>
        </Col>
      </Row>
    </Card>

    <Card shadow class="margin-top-10">
      <Row>
        <Col span="20">
          <!--自定义指标-->
          <view-tip @on-change="getuncheck" :check="checkAllGroup" action="bdAdPut" opt="searchCampaigns"></view-tip>
          <!--选择负责人-->
          <select-author @on-change="handleAuthorChange"></select-author>
          <!-- 操作状态 -->
          <Select placeholder="操作状态" v-model="searchParams.pause" class="sel_state" @on-change="searchCampaigns()">
            <Option v-for="(pause, index) in baiduConfig.pause" :value="pause.type" :key="index">{{pause.name}}</Option>
          </Select>
          <!-- 推广对象 -->
          <Select placeholder="推广对象" v-model="searchParams.subject" class="sel_state" @on-change="searchCampaigns()">
            <Option v-for="(subject, index) in baiduConfig.subject" :value="subject.type" :key="index">{{subject.name}}</Option>
          </Select>
          <DatePicker type="daterange" :options="options" placement="bottom-start" placeholder="请选择日期" format="yyyy-MM-dd"  @on-change="handleDateChange"></DatePicker>
        </Col>
        <Col span="4" style=" text-align: right;">
          <Poptip placement="bottom-end" v-model="visible">
            <Button type="ghost" icon="edit">批量修改</Button>
            <div class="api" slot="content">
              <div style="text-align: left;">
                  <Select v-model="batchEdit">
                    <Option value="enable">启用</Option>
                    <Option value="disable">暂停</Option>
                    <Option value="delete">删除</Option>
                  </Select>
              </div>
              <div class="tipbtn margin-top-10">
                <Button type="text" size="small" @click="visible=false">取消</Button>
                <Button type="primary" size="small" @click="editStatus()">确定</Button>
              </div>
            </div>
          </Poptip>
        </Col>
      </Row>

      <div>
        <Table :data="tableList" :height="height" :loading="loading" :columns="tableColumnList" :size="tabSize" class="margin-top-10" ref="toutiaoAdTable" @on-selection-change="handlecheckChange" @on-sort-change="handleSortchange" stripe :row-class-name="rowClassName"></Table>
        <Row class="margin-top-10">
          <Col span="12"> 表格尺寸
            <Radio-group v-model="tabSize" type="button">
              <Radio label="large">大</Radio>
              <Radio label="default">中</Radio>
              <Radio label="small">小</Radio>
            </Radio-group>
            <span>
              每页显示
              <Select v-model="pageSize" style="width:80px" placement="top" transfer @on-change="searchCampaigns()">
                <Option v-for="item in 500" :value="item" :key="item" v-if="item%50==0">{{ item }}</Option>
              </Select>
            </span>
          </Col>
          <Col span="12" style="text-align: right;">
            <Page :total="pageTotalNum" :page-size="pageSize" :current="searchParams.page" ref="pages" @on-change="searchCampaigns" show-elevator show-total></Page>
          </Col>
        </Row>
      </div>
    </Card>

  </div>
</template>
<script>
import Axios from '@/api/index'
import { DateShortcuts, formatDate } from '@/utils/DateShortcuts.js'
import baiduConfig from '@/utils/baiduConfig.json'
import newEdit from '../components/newEdit'
import viewTip from '../components/viewPopti.vue'
import gameTree from '@/components/select-tree/searchTree'
import selectAuthor from '@/components/select-author/index'
export default {
  components: {
    newEdit,
    gameTree,
    viewTip,
    selectAuthor
  },
  data() {
    return {
      baiduConfig: baiduConfig,
      height: document.body.clientHeight - 300,
      checkAllGroup: ['impression'], // viewpop默认选中的
      options: DateShortcuts, // 日期辅助功能
      pageTotalNum: 0, // 总数量
      pageSize: 50, // 每页数量,
      loading: false, // Table组件加载loading
      visible: false, // 弹窗可视
      tableColumnList: [], // Table结构
      tableList: [], // Table数据
      tabSize: 'small', // Table尺寸
      batchEdit: '', // 批量修改状态
      checkedIdList: [], // 批量修改选中ids
      uncheck: [], // viewpop没选中的
      // search params
      searchParams: {
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: formatDate(new Date(), 'yyyy-MM-dd'),
        authors: [], // 负责人数组
        keyword: '', // 搜索关键词
        pause: '', // 暂停/启用推广计划
        subject: '', // 推广对象
        game_ids: [], // 游戏id数组
        orderField: '', // 排序参数名
        orderDirection: '', // 数据排列顺序
        page_size: 50, // 每页显示数量
        page: 1 // 第几页的数据
      }
    }
  },
  mounted() {
    // 返回时获取保存数据
    const planCache = this.$store.state.bd.planCache
    if (this.$route.meta.keepAlive && JSON.stringify(planCache) !== '{}') {
      this.tabSize = planCache.tabSize
      this.pageSize = planCache.pageSize
      this.searchParams.keyword = planCache.keyword
      this.searchParams.page = planCache.page
      this.searchCampaigns(this.searchParams.page)
    } else {
      this.searchCampaigns()
    }

    this.getTableColumnList()
  },
  methods: {
    // 表格高亮calss
    rowClassName(row, index) {
      if (row._disabled) {
        return 'table-statistics'
      }
    },
    // 排序
    handleSortchange(col) {
      this.searchParams.orderField = col.key
      this.searchParams.orderDirection = col.order === 'asc' ? 'SORT_ASC' : 'SORT_DESC'
      this.searchCampaigns()
    },
    // 获取选中的id
    handlecheckChange(rowList) {
      const ret = []
      rowList.forEach(row => {
        ret.push(row.id)
      })
      this.checkedIdList = ret
    },
    handleDateChange(val) {
      this.searchParams.startDate = val[0]
      this.searchParams.endDate = val[1]
      this.searchCampaigns()
    },
    handleAuthorChange(val) {
      this.searchParams.authors = val
      this.searchCampaigns()
    },
    // 返回没有选中的
    getuncheck(val) {
      this.uncheck = val
      this.getTableColumnList()
    },
    // 选择游戏
    handleGameIdChange(idList) {
      this.searchParams.game_ids = Array.from(idList)
      this.searchCampaigns()
    },
    // 修改状态
    editStatus() {
      Axios.post('api.php', {
        action: 'bdAdPut',
        opt: 'updateCampaignStatus',
        ids: this.checkedIdList,
        opt_status: this.batchEdit
      })
        .then(res => {
          if (res.ret === 1) {
            this.$Message.info(res.msg)
            this.searchCampaigns(this.page)
            this.visible = false
          }
        })
        .catch(err => {
          console.log('批量修改状态失败' + err)
        })
    },
    // 初始化Table 结构
    getTableColumnList() {
      const tableColumnList = [
        {
          type: 'selection',
          width: 60,
          key: '',
          className: 'no-ellipse'
        },
        {
          title: '广告组名称',
          key: 'campaign_name',
          width: 200,
          render: (h, params) => {
            if (params.row._disabled) {
              return h('span', '本页统计')
            } else {
              let value = params.row.campaign_name
              return [
                h('span', {
                  class: 'name_txt',
                  on: {
                    click: () => {
                      const query = {
                        id: params.row.id
                      }
                      this.$router.push({
                        name: 'bd_adgroup',
                        query: query
                      })
                    }
                  }
                }, params.row.campaign_name),
                h('i-button', {
                  props: {
                    icon: 'edit',
                    type: 'text',
                    size: 'small'
                  },
                  class: ['edit'],
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        render: h => {
                          return h('i-input', {
                            props: {
                              value: params.row.campaign_name,
                              autofocus: true,
                              placeholder: '请输入推广计划名称'
                            },
                            on: {
                              input: val => {
                                value = val
                              }
                            }
                          })
                        },
                        onOk: () => {
                          if (value === '') {
                            return this.$Message.info('请输入修改信息')
                          }

                          Axios.post('api.php', {
                            action: 'bdAdPut',
                            opt: 'updateCampaign',
                            account_id: params.row.account_id,
                            modify_time: params.row.modify_time,
                            campaign_id: params.row.campaign_id,
                            campaign_name: value
                          }).then(res => {
                            if (res.ret === 1) {
                              this.$Message.info(res.msg)
                              this.searchCampaigns(this.searchParams.page)
                            }
                          }).catch(err => {
                            console.error('修改推广计划名失败', err)
                          })
                        }
                      })
                    }
                  }
                })
              ]
            }
          }
        },
        {
          title: '账号ID',
          key: 'account_id',
          width: 120
        },
        {
          title: '推广对象',
          key: 'subject',
          width: 120,
          render: (h, params) => {
            let txt = baiduConfig.subjectObj[params.row.subject]
            return h('span', txt)
          }
        },
        {
          title: '状态',
          key: 'status',
          width: 120,
          render: (h, params) => {
            let type = params.row.status
            let statusTxt = ''
            if (type === '') return
            baiduConfig.status.forEach(item => {
              if (item.type === type) {
                statusTxt = item.name
              }
            })
            return h('span', statusTxt)
          }
        },
        {
          title: '开关/状态',
          key: 'pause',
          width: 100,
          render: (h, params) => {
            if (!params.row.pause) {
              return
            }
            return [
              h('i-switch', {
                props: {
                  size: 'small',
                  value: params.row.pause === '0'
                },
                style: {
                  marginRight: '10px'
                },
                on: {}
              }),
              h('span', params.row.pause === '0' ? '开启' : '暂停')
            ]
          }
        },
        {
          title: '预算',
          key: 'budget',
          width: 100,
          render: (h, params) => {
            let txt = ''
            if (params.row._disabled) {
              txt = ''
            } else {
              txt = `${(+params.row.budget).toFixed(2)} 元`
            }
            return h('span', txt)
          }
        },
        {
          title: '预算分配控制',
          key: 'bgtctltype',
          width: 120,
          render: (h, params) => {
            let txt = ''
            if (params.row._disabled) {
              txt = ''
            } else {
              txt = baiduConfig.bgtctltypeObj[params.row.bgtctltype]
            }
            return h('span', txt)
          }
        },
        {
          title: '总花费',
          key: 'cost',
          width: 100,
          sortable: 'custom',
          render: (h, params) => {
            let txt = typeof params.row.cost !== 'undefined' ? params.row.cost : 0
            return h('span', `${txt} 元`)
          }
        },
        {
          title: '展示数',
          key: 'impression',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '点击数',
          key: 'click',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '点击率',
          key: 'ctr',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '平均点击单价',
          key: 'cpc',
          width: 150,
          sortable: 'custom'
        },
        {
          title: '千次展现费用',
          key: 'cpm',
          width: 150,
          sortable: 'custom'
        },
        {
          title: '激活数',
          key: 'active',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '激活成本',
          key: 'cost_per_dev',
          width: 120,
          sortable: 'custom'
        },
        // {
        //     title: '激活率',
        //     key: 'active_rate',
        //     width: 100,
        //     sortable: 'custom'
        // },
        {
          title: '转化数',
          key: 'conversion',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '转化成本',
          key: 'cost_per_conversion',
          width: 120,
          sortable: 'custom'
        },
        {
          title: '转化率',
          key: 'cvr',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '注册数',
          key: 'reg_total',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '注册成本',
          key: 'cost_per_reg',
          width: 120,
          sortable: 'custom',
          render: (h, params) => {
            return h('span', params.row.cost_per_reg)
          }
        },
        {
          title: '注册率',
          key: 'reg_rate',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '注册ARPU',
          key: 'reg_arpu',
          width: 100
        },
        {
          title: '活跃数',
          key: 'active',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '活跃率',
          key: 'active_per_reg',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '付费人数',
          key: 'pay_num',
          width: 120,
          sortable: 'custom'
        },
        {
          title: '付费金额',
          key: 'pay_total',
          width: 100
        },
        {
          title: '付费率',
          key: 'pay_per_reg',
          width: 100,
          sortable: 'custom'
        },
        {
          title: '回本率',
          key: 'roi',
          width: 100,
          sortable: 'custom'
        },
        // {
        //     title: '播放数',
        //     key: '',
        //     width: 100
        // },
        // {
        //     title: '有效播放次数',
        //     key: '',
        //     width: 150
        // },
        // {
        //     title: '有效播放率',
        //     key: '',
        //     width: 100
        // },
        // {
        //     title: '已选流量',
        //     key: '',
        //     width: 100
        // },
        {
          title: '投放时间',
          key: 'starttime',
          width: 100
        },
        {
          title: '结束时间',
          key: 'endtime',
          width: 100
        },
        // {
        //     title: '转化类型',
        //     key: '',
        //     width: 100
        // },
        {
          title: '负责人',
          key: 'author',
          width: 100
        },
        // {
        //     title: '广告质量度',
        //     key: '',
        //     width: 100
        // },
        {
          title: '操作',
          key: '',
          width: 130,
          render: (h, params) => {
            if (params.row._disabled) return
            return [
              h('span', {
                class: 'edit_link',
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'bdcampaign',
                      query: {
                        account_id: params.row.account_id,
                        id: params.row.id
                      }
                    })
                  }
                }
              }, '编辑'),
              h('span', {
                class: 'copy_link',
                on: {
                  click: () => {}
                }
              }, '复制'),
              h('span', {
                class: 'del_link',
                on: {
                  click: value => {
                    this.$Modal.confirm({
                      title: '操作提示',
                      content: '<p>确认删除</p>',
                      onOk: () => {

                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '删除')
            ]
          }
        }
      ]
      this.uncheck.forEach(item => {
        tableColumnList.forEach((col, i) => {
          if (col.key === item) {
            tableColumnList.splice(i, 1)
          }
        })
      })
      this.tableColumnList = tableColumnList
    },
    // 推广计划搜索
    searchCampaigns(page) {
      this.loading = true
      if (page === undefined) {
        this.searchParams.page = 1
      } else {
        this.searchParams.page = page
      }

      const params = Object.assign({}, this.searchParams, {
        action: 'bdAdPut',
        opt: 'searchCampaigns',
        subject: this.searchParams.subject === '' ? '' : +this.searchParams.subject,
        page_size: this.searchParams.page_size + '',
        page: this.searchParams.page + ''
      })
      Axios.post('api.php', params).then(res => {
        if (res.ret === 1) {
          this.loading = false
          const data = res.data
          // 添加统计
          if (res.data.list.length > 0) {
            res.data.curr_page_total._disabled = true
            res.data.list.push(res.data.curr_page_total)
            res.data.list.unshift(res.data.curr_page_total)
          }

          // 初始化数据
          this.pageTotalNum = data.total_number
          this.tableList = data.list
        }
      }).catch(err => {
        this.loading = false
        console.error('推广计划搜索错误', err)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'bd_adgroup') {
      to.meta.keepAlive = true
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'bd_adgroup') {
      const cache = {
        tabSize: this.tabSize,
        pageSize: this.pageSize,
        keyword: this.searchParams.keyword,
        page: this.searchParams.page
      }
      this.$store.commit('SAVE_BD_PLAN_CACHE', cache)
    }
    from.meta.keepAlive = false
    next()
  }
}
</script>
