<style scoped>
ul,li{
  list-style: none;
}
.clear:after {
  content: '\20';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.weekbox {
  margin: 0 auto;
  background: #fafafa;
  width: 707px;
  border: solid 1px #eee;
}
.weekname {
  float: left;
}
.weekname li {
  height: 35px;
  width: 80px;
  text-align: center;
  line-height: 35px;
  border-top: solid 1px #eee;
}
.weektime {
  float: left;
  width: 625px;
  height: 100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #fff;
}

.weektime>li {
  position: relative;
  width: 13px;
  height: 35px;
  border-left: solid 1px #eee;
  border-top: solid 1px #eee;
  float: left;
  cursor: pointer;
}

.weektime>li:hover {
  background: #f2f2f2;
}

.weektime>li.active {
  background: #1ba3f4;
}

.tip {
  display: none;
  position: absolute;
  border: solid 1px #eee;
  background: #fff;
  border-radius: 3px;
  width: 140px;
  text-align: center;
  line-height: 30px;
  z-index: 1;
  top: 100%;
  left: 100%;
  color: #999;
}

.weektime>li:hover .tip {
  display: block;
}

.datetime li {
  float: left;
  width: 26px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border-left: solid 1px #eee;
}

.mtime li {
  width: 312px;
  height: 35px;
  line-height: 35px;
  float: left;
  text-align: center;
  border-left: solid 1px #eee;
  border-bottom: solid 1px #eee;
  font-weight: bold;
}

.weektitle {
  float: left;
  width: 80px;
  text-align: center;
  line-height: 71px;
}

.timetitle {
  float: left;
}

.btn_clear {
  float: right;
}

.hint_box {
  margin: 0 auto;
  width: 707px;
  width: 707px;
  line-height: 35px;
}
.hint-box-item{}
.grey {
  color: #999;
}
</style>
<template>
<div>
  <div class="weekbox">
    <div class="clear">
      <div class="weektitle">星期\时间</div>
      <div class="timetitle">
        <ul class="mtime clear">
          <li>00:00 - 12:00</li>
          <li>12:00 - 24:00</li>
        </ul>
        <ul class="datetime clear">
          <li v-for="n in 24" :key="n">{{n-1}}</li>
        </ul>
      </div>
    </div>
    <div class="clear">
      <ul class="weekname">
        <li>星期一</li>
        <li>星期二</li>
        <li>星期三</li>
        <li>星期四</li>
        <li>星期五</li>
        <li>星期六</li>
        <li>星期日</li>
      </ul>
      <div class="weektimediv">
        <div class="weektime">
          <ul class="weektime" id="weekbox">
            <li class="weekli" v-for="(item,index) in week" :key="index" :class="{ 'active': item === 1 }" @click="check(index)">
              <div class="tip">
                {{index|time}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="hint_box">
    <span class="hint-box-item"><Icon type="android-checkbox-outline-blank" size="16"></Icon>未选</span>
    <span class="hint-box-item"><Icon type="android-checkbox-blank" color="#1ba3f4" size="16"></Icon>已选</span>
    <span class="grey hint-box-item">可拖动鼠标选择时间段</span>
    <Button type="text" class="btn_clear hint-box-item" @click="empty()" size="small">清空</Button>
  </div>

</div>
</template>

<script>
export default {
  name: 'weekTime',
  props: ['value'],
  data() {
    return {
      week: [],
      weekold: []
    }
  },
  mounted() {
    let that = this
    let weekStrArr = this.value.split('')
    let weekIntArr = []
    let weekIntArr1 = []
    weekIntArr = weekStrArr.map(function(data) {
      return +data
    })
    weekIntArr1 = weekStrArr.map(function(data) {
      return +data
    })
    this.week = weekIntArr
    this.weekold = weekIntArr1

    let selList = []
    const fileNodes = document.getElementsByClassName('weekli')

    this.$nextTick(function() {
      for (var i = 0; i < fileNodes.length; i++) {
        selList.push(fileNodes[i])
      }
    })

    const weekbox = document.getElementById('weekbox')
    var startX = 0,
      startY = 0,
      endX = 0,
      endY = 0,
      isSelect = false

    weekbox.onmousedown = function(e) {
      isSelect = true
      startX = e.clientX
      startY = e.clientY
    }

    weekbox.onmousemove = function(e) {
      if (isSelect) {
        endX = e.clientX
        endY = e.clientY
        if (Math.abs(startX - endX) < 3 || Math.abs(startY - endY) < 3) {
          return
        }
        for (var i = 0; i < selList.length; i++) {
          let sl = selList[i].offsetLeft
          let st = selList[i].offsetTop - document.getElementsByClassName('uc-plan-wrapper')[0].scrollTop
          if (startX < endX) {
            if (startY < endY) {
              if (sl + selList[i].offsetWidth > startX && sl < endX && st + selList[i].offsetHeight > startY && st < endY) {
                that.$set(that.week, i, 1)
              } else {
                that.$set(that.week, i, 0)
              }
            } else {
              if (sl + selList[i].offsetWidth > startX && sl < endX && st < startY && st > endY - selList[i].offsetHeight) {
                that.$set(that.week, i, 1)
              } else {
                that.$set(that.week, i, 0)
              }
            }
          } else {
            if (startY < endY) {
              if (sl < startX && sl > endX - selList[i].offsetWidth && st + selList[i].offsetHeight > startY && st < endY) {
                that.$set(that.week, i, 1)
              } else {
                that.$set(that.week, i, 0)
              }
            } else {
              if (sl < startX && sl > endX - selList[i].offsetWidth && st < startY && st > endY - selList[i].offsetHeight) {
                that.$set(that.week, i, 1)
              } else {
                that.$set(that.week, i, 0)
              }
            }
          }

          that.weekold.forEach((item, i) => {
            if (item === 1) {
              that.$set(that.week, i, 1)
            }
          })
        }
      }
    }
    weekbox.onmouseup = function() {
      that.week.forEach((item, i) => {
        if (item === 1) {
          that.$set(that.weekold, i, 1)
        }
      })
      isSelect = false
    }
  },
  watch: {
    week(val) {
      let value
      val.forEach((item, i) => {
        if (i === 0) {
          value = item
        } else {
          value = value.toString() + item.toString()
        }
      })
      this.$emit('input', value)
      this.$emit('on-change', value)
    }
  },
  methods: {
    // 选取
    check(index) {
      if (this.week[index] === 1) {
        this.$set(this.week, index, 0)
        this.$set(this.weekold, index, 0)
      } else {
        this.$set(this.week, index, 1)
        this.$set(this.weekold, index, 1)
      }
    },
    // 清空
    empty() {
      for (var i = 0; i < this.week.length; i++) {
        this.$set(this.week, i, 0)
        this.$set(this.weekold, i, 0)
      }
    }
  },
  filters: {
    time: function(val) {
      let n = Math.floor(val / 48)
      let week
      switch (n) {
        case 0:
          week = '星期一'
          break
        case 1:
          week = '星期二'
          break
        case 2:
          week = '星期三'
          break
        case 3:
          week = '星期四'
          break
        case 4:
          week = '星期五'
          break
        case 5:
          week = '星期六'
          break
        default:
          week = '星期日'
      }

      let stime = toHourMinute(val % 48 * 30)
      let etime = toHourMinute(val % 48 * 30 + 30)
      return week + ' ' + stime + '-' + etime
    }
  }
}

// 时间格式
function toHourMinute(minutes) {
  let h = Math.floor(minutes / 60)
  let m = minutes % 60
  if (h < 10) h = '0' + h
  if (m < 10) m = '0' + m
  return (h + ':' + m)
}
</script>
