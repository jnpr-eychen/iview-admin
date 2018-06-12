<style scoped src="./fonts/iconfont.css"></style>
<style scoped>
:root{
  --color-theme: #1ba3f4;
  --color-grey: #ccc;
}
ul{margin: 0;list-style: none;}
.week-picker-container{
  padding: 10px;
  font-size: 13px;
}
.clearfix::before,.clearfix::after{display: block;content: '';height: 0;clear: both;visibility: hidden;}
.week-container,.week-picker-container {
    display: inline-block;
    margin: 0 auto;
}
.tip-bar{margin-top: 15px;margin-bottom: 15px;}
.tip-action{float: left;}
.tip-content{float: right;}
.tip-action li{display: inline-block;padding-left: 5px;padding-right: 5px;cursor: pointer;}
.tip-content .tip{display: inline-block;position: relative;;padding-left: 5px;padding-right: 5px;text-indent: 10px;}
.tip-content .tip::before{content: '';display: inline-block;position: absolute;width: 13px;height: 13px;left: 0; top: 50%;margin-top: -6.5px;}
.tip-content .tip-on::before{background-color: #1ba3f4;}
.tip-content .tip-stop::before{background-color: #ccc;}
.day-container li{display: inline-block;vertical-align: middle;height: 30px; line-height: 30px;text-align: center;}
.week-th{width:88px;}
.hour-th{width: 30px;}
.hour-td{width: 30px;color: #fff;background-color: #ccc;border-bottom: 1px solid #fff;border-right: 1px solid #fff;}
.hour-td:hover{opacity: 0.8;}
.icon-active::before{color: #1ba3f4;}
.hour-active{background-color: #1ba3f4;}
.cursor-pointer{cursor: pointer;}
.day-checker[type="checkbox"]{vertical-align: middle;}
/* .week-container{}
.day-line{} */
</style>

<template>
  <div class="week-picker-container">
    <div class="tip-bar clearfix">
      <ul @click="handleActionList" class="tip-action tip-hook">
        <li class="weekday-hook">工作日</li>
        <li class="weekend-hook">周末</li>
        <li class="all-hook">全部</li>
        <li class="clear-hook">重置</li>
      </ul>
      <div class="tip-content">
        <div class="tip tip-on">投放时间段</div>
        <div class="tip tip-stop">暂停时间段</div>
      </div>
    </div>
    <ul class="week-container">
      <li class="day-line">
        <ul ref="hourChecker" @click="handleHourChecker" class="day-container">
          <li class="week-th"></li>
          <li v-for="v in allHour" class="hour-th cursor-pointer ljy-icon icon-download" :class="{'icon-active': true}" :key="v"></li>
        </ul>
      </li>
      <li class="day-line">
        <ul class="day-container">
          <li class="week-th"><input @click="handleDayChecker" ref="dayChecker" type="checkbox" name="星期一" class="day-checker">星期一</li>
          <li @click="handleHour('monday', i, v)" v-if="Array.isArray(weekStatus.monday)" v-for="(v, i) in weekStatus.monday" :class="{'hour-active': v === NUM_ONE}" class="hour-td cursor-pointer" :key="i">{{i}}</li>
        </ul>
      </li>
      <li class="day-line">
        <ul class="day-container">
          <li class="week-th"><input @click="handleDayChecker" ref="dayChecker" type="checkbox" name="星期二" class="day-checker">星期二</li>
          <li  @click="handleHour('tuesday', i, v)" v-if="Array.isArray(weekStatus.tuesday)" v-for="(v, i) in weekStatus.tuesday" :class="{'hour-active': v === NUM_ONE}" class="hour-td cursor-pointer" :key="i">{{i}}</li>
        </ul>
      </li>
      <li class="day-line">
        <ul class="day-container">
          <li class="week-th"><input @click="handleDayChecker" ref="dayChecker" type="checkbox" name="星期三" class="day-checker">星期三</li>
          <li  @click="handleHour('wensday', i, v)" v-if="Array.isArray(weekStatus.wensday)" v-for="(v, i) in weekStatus.wensday" :class="{'hour-active': v === NUM_ONE}" class="hour-td cursor-pointer" :key="i">{{i}}</li>
        </ul>
      </li>
      <li class="day-line">
        <ul class="day-container">
          <li class="week-th"><input @click="handleDayChecker" ref="dayChecker" type="checkbox" name="星期四" class="day-checker">星期四</li>
          <li  @click="handleHour('thursday', i, v)" v-if="Array.isArray(weekStatus.thursday)" v-for="(v, i) in weekStatus.thursday" :class="{'hour-active': v === NUM_ONE}" class="hour-td cursor-pointer" :key="i">{{i}}</li>
        </ul>
      </li>
      <li class="day-line">
        <ul class="day-container">
          <li class="week-th"><input @click="handleDayChecker" ref="dayChecker" type="checkbox" name="星期五" class="day-checker">星期五</li>
          <li @click="handleHour('friday', i, v)" v-if="Array.isArray(weekStatus.friday)" v-for="(v, i) in weekStatus.friday" :class="{'hour-active': v === NUM_ONE}" class="hour-td cursor-pointer" :key="i">{{i}}</li>
        </ul>
      </li>
      <li class="day-line">
        <ul class="day-container">
          <li class="week-th"><input @click="handleDayChecker" ref="dayChecker" type="checkbox" name="星期六" class="day-checker">星期六</li>
          <li  @click="handleHour('saturday', i, v)" v-if="Array.isArray(weekStatus.saturday)" v-for="(v, i) in weekStatus.saturday" :class="{'hour-active': v === NUM_ONE}" class="hour-td cursor-pointer" :key="i">{{i}}</li>
        </ul>
      </li>
      <li class="day-line">
        <ul class="day-container">
          <li class="week-th"><input @click="handleDayChecker" ref="dayChecker" type="checkbox" name="星期日" class="day-checker">星期日</li>
          <li  @click="handleHour('sunday', i, v)" v-if="Array.isArray(weekStatus.sunday)" v-for="(v, i) in weekStatus.sunday" :class="{'hour-active': v === NUM_ONE}" class="hour-td cursor-pointer" :key="i">{{i}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'weekPicker',
  props: {
    weekStatus: {
      type: Object,
      default: () => ({
        monday: '111111111111111111111111',
        tuesday: '111111111111111111111111',
        wensday: '111111111111111111111111',
        thursday: '111111111111111111111111',
        friday: '111111111111111111111111',
        saturday: '111111111111111111111111',
        sunday: '111111111111111111111111'
      })
    },
    isHour: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  methods: {
    changeWeekdayStatus(status) {
      this.$set(this.weekStatus, 'monday', status)
      this.$set(this.weekStatus, 'tuesday', status)
      this.$set(this.weekStatus, 'wensday', status)
      this.$set(this.weekStatus, 'thursday', status)
      this.$set(this.weekStatus, 'friday', status)
    },
    changeWeekendStatus(status) {
      this.$set(this.weekStatus, 'saturday', status)
      this.$set(this.weekStatus, 'sunday', status)
    },
    setWeekdayStatus(active, inactive) {
      this.changeWeekdayStatus(active)
      this.changeWeekendStatus(inactive)
    },
    setWeekendStatus(active, inactive) {
      this.changeWeekdayStatus(inactive)
      this.changeWeekendStatus(active)
    },
    setAllStatus(active) {
      this.changeWeekdayStatus(active)
      this.changeWeekendStatus(active)
    },
    setClearStatus(inactive) {
      this.changeWeekdayStatus(inactive)
      this.changeWeekendStatus(inactive)
    },
    emitEvent(val) {
      const params = {}
      for (let key in val) {
        params[key] = val[key].join(',')
      }
      this.$emit('on-change', params)
    },
    handleActionList(e) {
      let target = e.target.className
      const active = '111111111111111111111111'.split('')
      const inactive = '000000000000000000000000'.split('')
      switch (target) {
        case 'weekday-hook':
          this.setWeekdayStatus(active, inactive)
          this.emitEvent(this.weekStatus)
          break
        case 'weekend-hook':
          this.setWeekendStatus(active, inactive)
          this.emitEvent(this.weekStatus)
          break
        case 'all-hook':
          this.setAllStatus(active)
          this.emitEvent(this.weekStatus)
          break
        case 'clear-hook':
          this.setClearStatus(inactive)
          this.emitEvent(this.weekStatus)
          break
      }
    },
    handleHour(type, index, value) {
      if (value === '1') {
        // this.weekStatus[type].splice(index, 1, '0') // 方法一：使用$set注册相应机制改变单个时间段状态
        this.$set(this.weekStatus[type], index, '0') // 方法二：使用splice变化数组改变单个时间段状态
        this.emitEvent(this.weekStatus)
      } else if (value === '0') {
        // this.weekStatus[type].splice(index, 1, '1') // 方法一：使用$set注册相应机制改变单个时间段状态
        this.$set(this.weekStatus[type], index, '1') // 方法二：使用splice变化数组改变单个时间段状态
        this.emitEvent(this.weekStatus)
      }
    },
    handleDayChecker(e) {
      let currTar = e.target.name
      let currChecked = e.target.checked
      const active = '111111111111111111111111'.split('')
      const inactive = '000000000000000000000000'.split('')
      switch (currTar) {
        case '星期一':
          this._changeDayGroupStatus('monday', active, inactive, currChecked)
          this.emitEvent(this.weekStatus)
          break
        case '星期二':
          this._changeDayGroupStatus('tuesday', active, inactive, currChecked)
          this.emitEvent(this.weekStatus)
          break
        case '星期三':
          this._changeDayGroupStatus('wensday', active, inactive, currChecked)
          this.emitEvent(this.weekStatus)
          break
        case '星期四':
          this._changeDayGroupStatus('thursday', active, inactive, currChecked)
          this.emitEvent(this.weekStatus)
          break
        case '星期五':
          this._changeDayGroupStatus('friday', active, inactive, currChecked)
          this.emitEvent(this.weekStatus)
          break
        case '星期六':
          this._changeDayGroupStatus('saturday', active, inactive, currChecked)
          this.emitEvent(this.weekStatus)
          break
        case '星期日':
          this._changeDayGroupStatus('sunday', active, inactive, currChecked)
          this.emitEvent(this.weekStatus)
          break
      }
    },
    handleHourChecker(e) {
      let currTar = e.target // 获取所点击的列对象
      let currIndex = this._findIndex(currTar, this.hourTHList) // 获取所点击列序号
      let hourListTotal = this._getTotal(this._getHourArr(this.weekStatus, currIndex))
      if (hourListTotal === 7) {
        this.setHourListStatus(currIndex, '0')
        this.emitEvent(this.weekStatus)
      } else {
        this.setHourListStatus(currIndex, '1')
        this.emitEvent(this.weekStatus)
      }
    },
    setHourListStatus(currIndex, value) {
      this.weekStatus.monday.splice(currIndex, 1, value)
      this.weekStatus.tuesday.splice(currIndex, 1, value)
      this.weekStatus.wensday.splice(currIndex, 1, value)
      this.weekStatus.thursday.splice(currIndex, 1, value)
      this.weekStatus.friday.splice(currIndex, 1, value)
      this.weekStatus.saturday.splice(currIndex, 1, value)
      this.weekStatus.sunday.splice(currIndex, 1, value)
    },
    modeHour() {
      this.weekStatus.monday = this.weekStatus.monday.split('')
      this.weekStatus.tuesday = this.weekStatus.tuesday.split('')
      this.weekStatus.wensday = this.weekStatus.wensday.split('')
      this.weekStatus.thursday = this.weekStatus.thursday.split('')
      this.weekStatus.friday = this.weekStatus.friday.split('')
      this.weekStatus.saturday = this.weekStatus.saturday.split('')
      this.weekStatus.sunday = this.weekStatus.sunday.split('')
    },
    modeHalfHour() {},
    selectorMethods() {
      if (this.isHour) {
        this.modeHour()
      } else {
        this.modeHalfHour()
      }
    },
    initDOM() {
      this.checkboxList = [...document.querySelectorAll('.day-checker')]
      this.hourTHList = [...document.querySelectorAll('.hour-th')]
    },
    _findIndex(target, list) {
      if (!Array.isArray(list)) return
      return list.findIndex((item) => {
        return item === target
      })
    },
    // 数组每项转化为整型
    _toInt(list) {
      const ret = []
      if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
          ret.push(parseInt(list[i]))
        }
      }
      return ret
    },
    // 获取小时数组
    _getHourArr(obj, index) {
      let ret = []
      for (let val in obj) {
        if (val !== 'isHour') {
          ret.push(obj[val][index])
        }
      }
      return ret
    },
    // 获取每天数组的数字总和
    _getTotal(list) {
      list = this._toInt(list)
      return list.reduce(function(sum, num) {
        return sum + num
      })
    },
    _changeDayGroupStatus(target, active, inactive, flag) {
      if (flag) {
        // this.weekStatus[target] = active
        this.$set(this.weekStatus, target, active)
      } else {
        this.$set(this.weekStatus, target, inactive)
        // this.weekStatus[target]  = inactive
      }
    }
  },
  computed: {
    getActive() {
      return 1
    }
  },
  watch: {
    /* eslint-disable no-useless-computed-key */
    ['weekStatus.monday'](val) {
      let total = this._getTotal(val)
      if (this.allHour === total) {
        this.checkboxList[0].checked = true
      } else {
        this.checkboxList[0].checked = false
      }
    },
    ['weekStatus.tuesday'](val) {
      let total = this._getTotal(val)
      if (this.allHour === total) {
        this.checkboxList[1].checked = true
      } else {
        this.checkboxList[1].checked = false
      }
    },
    ['weekStatus.wensday'](val) {
      let total = this._getTotal(val)
      if (this.allHour === total) {
        this.checkboxList[2].checked = true
      } else {
        this.checkboxList[2].checked = false
      }
    },
    ['weekStatus.thursday'](val) {
      let total = this._getTotal(val)
      if (this.allHour === total) {
        this.checkboxList[3].checked = true
      } else {
        this.checkboxList[3].checked = false
      }
    },
    ['weekStatus.friday'](val) {
      let total = this._getTotal(val)
      if (this.allHour === total) {
        this.checkboxList[4].checked = true
      } else {
        this.checkboxList[4].checked = false
      }
    },
    ['weekStatus.saturday'](val) {
      let total = this._getTotal(val)
      if (this.allHour === total) {
        this.checkboxList[5].checked = true
      } else {
        this.checkboxList[5].checked = false
      }
    },
    ['weekStatus.sunday'](val) {
      let total = this._getTotal(val)
      if (this.allHour === total) {
        this.checkboxList[6].checked = true
      } else {
        this.checkboxList[6].checked = false
      }
    }
  },
  created() {
    this.NUM_ONE = '1'
    this.allHour = 24
    this.checkboxList = []
    this.hourTHList = []
  },
  mounted() {
    this.initDOM()
    this.selectorMethods()
  }
}
</script>
