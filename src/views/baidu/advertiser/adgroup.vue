<style lang="less">
@import "../index.less";
</style>
<style scoped>
.sel {
  width: 220px;
}
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
          <Button type="primary" @click="handleGoBack" v-show="isGoBack">返回</Button>
          <!-- 游戏列表 -->
          <game-tree @on-change="handleGameIdChange"></game-tree>
          <!-- 搜索 -->
          <Input class="inp" placeholder="请输入推广单元ID或关键词" v-model="searchParams.keyword" @on-enter="searchAdgroups()"></Input>
          <Button type="primary" icon="search" @click="searchAdgroups()">搜索</Button>
        </Col>
        <Col class="manger-head-bar">
          <!-- 新建 -->
          <new-edit :title="newTitle" :to-route-name="toRouteName" :query-params="queryParam" class="margin-left-5"></new-edit>
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
          <Select placeholder="操作状态" v-model="searchParams.pause" class="sel_state" @on-change="searchAdgroups()">
            <Option v-for="(pause, index) in baiduConfig.pause" :value="pause.type" :key="index">{{pause.name}}</Option>
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
              <Select v-model="pageSize" style="width:80px" placement="top" transfer @on-change="searchAdgroups()">
                <Option v-for="item in 500" :value="item" :key="item" v-if="item%50==0">{{ item }}</Option>
              </Select>
            </span>
          </Col>
          <Col span="12" style="text-align: right;">
            <Page :total="pageTotalNum" :page-size="pageSize" :current="searchParams.page" ref="pages" @on-change="searchAdgroups" show-elevator show-total></Page>
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
      isGoBack: false, // 返回
      loading: false, // Table组件加载loading
      visible: false, // 弹窗可视
      batchEdit: '', // 批量修改状态
      tableColumnList: [], // Table结构
      tableList: [], // Table数据
      tabSize: 'small', // Table尺寸
      checkedIdList: [], // 批量修改选中ids
      uncheck: [], // viewpop没选中的
      // search params
      searchParams: {
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: formatDate(new Date(), 'yyyy-MM-dd'),
        authors: [], // 负责人数组
        keyword: '', // 搜索关键词
        pause: '', // 暂停/启用推广单元
        game_ids: [], // 游戏id数组
        orderField: '', // 排序参数名
        orderDirection: '', // 数据排列顺序
        page_size: 50, // 每页显示数量
        page: 1 // 第几页的数据
      }
    }
  },
  computed: {
    newTitle() {
      return this.$route.query.id ? '新建单元' : '新建计划'
    },
    toRouteName() {
      return this.$route.query.id ? 'bdadgroup' : 'bdcampaign'
    },
    queryParam() {
      const id = parseInt(this.$route.query.id)
      const retParam = id ? {campaign_id: id} : {}
      return retParam
    }
  },
  mounted() {
    const query = this.$route.query
    if (query.id) {
      this.isGoBack = true
    } else {
      this.isGoBack = false
    }
    // 返回时获取保存数据
    const unitCache = this.$store.state.bd.unitCache
    if (this.$route.meta.keepAlive && JSON.stringify(unitCache) !== '{}') {
      this.tabSize = unitCache.tabSize
      this.pageSize = unitCache.pageSize
      this.searchParams.keyword = unitCache.keyword
      this.searchParams.page = unitCache.page
      this.searchAdgroups(this.searchParams.page)
    } else {
      this.searchAdgroups()
    }

    this.getTableColumnList()
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1)
    },
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
      this.searchAdgroups()
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
      this.searchAdgroups()
    },
    handleAuthorChange(val) {
      this.searchParams.authors = val
      this.searchAdgroups()
    },
    // 返回没有选中的
    getuncheck(val) {
      this.uncheck = val
      this.getTableColumnList()
    },
    handleGameIdChange(idList) {
      this.searchParams.game_ids = Array.from(idList)
      this.searchAdgroups()
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
            this.searchAdgroups(this.page)
            this.visible = false
          }
        })
        .catch(err => {
          console.log('批量修改状态失败' + err)
        })
    },
    getTableColumnList() {
      const tableColumnList = [
        {
          type: 'selection',
          width: 60,
          key: ''
        },
        {
          title: '单元名称',
          key: 'adgroup_name',
          width: 200,
          render: (h, params) => {
            if (params.row._disabled) {
              return h('span', '本页统计')
            } else {
              let value = params.row.adgroup_name
              return [
                h('span', {
                  class: 'name_txt',
                  on: {
                    click: () => {
                      const query = {
                        id: params.row.id
                      }
                      this.$router.push({
                        name: 'bd_creative',
                        query: query
                      })
                    }
                  }
                }, params.row.adgroup_name),
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
                              value: params.row.adgroup_name,
                              autofocus: true,
                              placeholder: '请输入推广单元名称'
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
                            return this.$$Message.info('请输入修改信息')
                          }

                          Axios.post('api.php', {
                            action: 'bdAdPut',
                            opt: 'updateAdgroup',
                            account_id: params.row.account_id,
                            modify_time: params.row.modify_time,
                            adgroup_id: params.row.adgroup_id,
                            adgroup_name: value
                          }).then(res => {
                            if (res.ret === 1) {
                              this.$Message.info(res.msg)
                              this.searchAdgroups(this.searchParams.page)
                            }
                          }).catch(err => {
                            console.error('修改推广单元名失败', err)
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
          title: '状态',
          key: 'status',
          width: 120,
          render: (h, params) => {
            let type = params.row.status
            let statusTxt = ''
            if (type === '') return statusTxt
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
        // {
        //   title: '预算',
        //   key: 'budget',
        //   width: 100
        // },
        {
          title: '流量来源',
          key: 'ftypes',
          width: 150,
          render: (h, params) => {
            let txt = ''
            if (!params.row._disabled) {
              if (typeof params.row.ftypes !== 'undefined') {
                let ftypes = JSON.parse(params.row.ftypes)
                let len = ftypes.length
                for (let type in baiduConfig.ftypes) {
                  if (len === 0) {
                    txt = '无'
                  } else if (len >= 1) {
                    ftypes.forEach(v => {
                      if (type === v) {
                        txt += baiduConfig.ftypes[v] + '\n'
                      }
                    })
                  }
                }
              } else {
                txt = '无'
              }
            }
            return h('span', txt)
          }
        },
        {
          title: '版位',
          key: 'producttype',
          width: 150,
          render: (h, params) => {
            let txt = ''
            if (!params.row._disabled) {
              // 判断复选版位情况
              let producttypesOrigin = params.row.producttypes
              let producttypes = producttypesOrigin === '' ? '' : JSON.parse(producttypesOrigin)
              if (producttypes && producttypes.length > 1) {
                const ret = []
                for (let type in baiduConfig.producttype) {
                  producttypes.forEach(v => {
                    if (v === type) {
                      ret.push(baiduConfig.producttype[v])
                    }
                  })
                }
                txt = ret.join(',')
              } else {
                // 单选版位
                if (typeof params.row.producttype !== 'undefined') {
                  let producttype = JSON.parse(params.row.producttype)
                  txt = baiduConfig.producttype[producttype]
                } else {
                  txt = '无'
                }
              }
            }
            return h('span', txt)
          }
        },
        {
          title: '出价',
          key: 'bid',
          width: 100,
          render: (h, params) => {
            let txt = ''
            if (params.row._disabled) {
              txt = ''
            } else {
              txt = `${(+params.row.bid).toFixed(2)} 元`
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
        // {
        //   title: "激活成本",
        //   key: "",
        //   width: 120,
        //   sortable: "custom"
        // },
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
          sortable: 'custom'
        },
        // {
        //   title: '注册率',
        //   key: 'reg_rate',
        //   width: 100,
        //   sortable: 'custom'
        // },
        {
          title: '注册ARPU',
          key: 'reg_arpu',
          width: 100
        },
        {
          title: '注册设备数',
          key: 'reg_dev',
          width: 100
        },
        {
          title: '注册设备成本',
          key: 'cost_per_dev',
          width: 110
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
          key: '',
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
    // 推广单元搜索
    searchAdgroups(page) {
      this.loading = true
      if (page === undefined) {
        this.searchParams.page = 1
      } else {
        this.searchParams.page = page
      }
      const params = Object.assign({}, this.searchParams, {
        action: 'bdAdPut',
        opt: 'searchAdgroups',
        page_size: this.searchParams.page_size + '',
        page: this.searchParams.page + ''
      })
      Axios.post('api.php', params).then(res => {
        if (res.ret === 1) {
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
          this.loading = false
        }
      }).catch(err => {
        this.loading = false
        console.error('推广单元搜索错误', err)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'bd_creative') {
      to.meta.keepAlive = true
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'bd_creative') {
      const cache = {
        tabSize: this.tabSize,
        pageSize: this.pageSize,
        keyword: this.searchParams.keyword,
        page: this.searchParams.page
      }

      this.$store.commit('SAVE_BD_UNIT_CACHE', cache)
    }
    from.meta.keepAlive = false
    next()
  }
}
</script>
