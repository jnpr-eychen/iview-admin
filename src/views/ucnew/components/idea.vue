<style scoped lang="less">
@import "../index.less";
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
.uc-idea {
  box-sizing: border-box;
  background-color: #fff;
}
.uc-idea-content {
  padding: 0 20px;
  .g-belong {
    .name {
      margin-right: 60px;
    }
  }
  .g-style {
    justify-content: flex-start;
    align-items: center;
    .item {
      margin-right: 60px;
    }
    .ivu-radio-group {
      .item {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
  }
}
.padding-top-30 {
  padding-top: 30px;
}
.g-flex {
  display: flex;
}
.g-flex-lt {
  width: 700px;
  flex: 0 0 700px;
  border-right: 1px solid #eee;
  .template {
    .g-flex-item{
      flex: 1;
    }
  }
  .template-3 {
    .g-flex {
      justify-content: space-between;
      .g-flex-item {
      }
    }
  }
}
.g-flex-rt {
  flex: 0 0 392px;
  width: 392px;
}
.g-src {
  position: relative;
  padding-bottom: 20px;
  .tip {
    position: absolute;
    top: 0;
    left: 0;
    width: 600px;
    line-height: 24px;
    color: #969696;
  }
  .template {
    position: relative;
    .mask {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      z-index: 1000;
      background-color: #fff;
      overflow: hidden;
      .image-view {
        height: 100%;
      }
    }
    .g-flex {
      .g-flex-item {
        position: relative;
        padding-top: 30px;
      }
    }
  }
  .btn-close {
    display: inline-block;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    top: 0;
    color: #ff0000;
    font-size: 20px;
    cursor: pointer;
  }
}
.btn-green {
  color: #19be6b;
  border-color: #19be6b !important;
}
button.ivu-btn {
  margin: 0 10px;
  border-radius: 0;
}
.phone-preview {
  .bg-phone {
    padding: 85px 28px 0;
    width: 392px;
    height: 438.71px;
    background: url("./bg-phone.png") no-repeat center top;
    .title {
      margin-bottom: 10px;
      margin: 10px;
      font-size: 15px;
      max-height: 86px;
      overflow: hidden;
      // height: 24px;
      // line-height: 24px;
      font-weight: 400;
      color: #333;
      // display: -webkit-box;
      // -webkit-line-clamp: 2;
      // -webkit-box-orient: vertical;
      // text-overflow: ellipsis;
    }
    .bg-image {
      width: 341px;
      height: 160px;
      overflow: hidden;
      background: url("./new.jpg")no-repeat top center;
      background-size: 341px 160px;
      .image {
        position: relative;
        width: 341px;
      }
    }
    .desc {
      margin: 10px;
      overflow: hidden;
      .item {
        margin-right: 10px;
      }
    }
  }
  .phone-template2 {
    height: 300px;
    .content {
      margin: 10px 0;
      justify-content: space-around;
      align-items: center;
      height: 95px;
      .item-lt {
        position: relative;
        flex: 1;
        height: 100%;
        .title{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
          width: 220px;
          max-height: 66px;
          word-wrap:break-word;
        }
        .desc{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 95%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .item-rt {
        flex: 0 0 100px;
        width: 100px;
        .bg-image {
          max-width: 100px;
          height: 75px;
          .image {
            width: inherit;
            height: inherit;
          }
        }
      }
    }
  }
  .phone-template3 {
    height: 350px;
    .image-content {
      justify-content: space-between;
      align-items: center;
      .bg-image {
        width: 110px;
        height: 82px;
        .image {
          width: inherit;
          height: inherit;
        }
      }
    }
  }
  .phone-foot {
    height: 100px;
    overflow: hidden;
    width: 330px;
    background: url("./phone-foot.png") no-repeat top center;
    border: none;
    margin-top: 10px;
  }
}
.txt p {
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 20px;
}
table {
  margin: 10px;
  td{
    position: relative;
    padding: 8px 5px;
    vertical-align: middle;
    color: #333;
    font-size: 12px;
    line-height: 1.5em;
    border-top: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    word-break: break-all;
  }
  }
</style>

<template>
  <div class="uc-idea">
    <div class="color-green border-bottom padding-tb-10">
      <Button slot="title" type="text" @click="handleGoBack" class="padding-left-0">
        <Icon type="chevron-left"></Icon>
        返回单元列表
      </Button>
    </div>

    <div class="uc-idea-content">
      <div class="border-bottom g-belong padding-lr-30 padding-tb-20">
        <span v-if="campaignName.length > 0" class="name color-grey">所属计划：{{campaignName}}</span>
        <span v-if="adgroupName.length > 0" class="name color-grey">所属单元：{{adgroupName}}</span>
      </div>

      <div class="g-style g-flex border-bottom padding-lr-30 padding-tb-20">
        <h3 class="sub-title color-green item">创意样式</h3>
        <RadioGroup @on-change="handleChangeTemplate" v-model="creativeSetting.creativeTemplate_id">
          <Radio v-if="creativeTemplates && creativeTemplates.length > 0" v-for="(template, index) in creativeTemplates" :key="index" :label="template.creativeTemplateId" :class="{'btn-green': creativeSetting.creativeTemplate_id === template.creativeTemplateId}" :disabled="isEdit" class="item">{{template.creativeTemplateName}}</Radio>
        </RadioGroup>

      </div>

      <div class="g-flex border-bottom">
        <div class="g-flex-lt">
          <div class="g-src border-bottom padding-lr-30">
            <h3 class="sub-title color-green padding-tb-20">创意样式</h3>

            <div v-for="(uploadBlock, iu) in creativeTemplatesFieldsList" v-if="creativeTemplatesFieldsList.length > 0 && creativeSetting.creativeTemplate_id === uploadBlock.creativeTemplate_id" :class="{'template-1': uploadBlock.style === 'big','template-2': uploadBlock.style === 'small','template-3': uploadBlock.style === 'three'}" :key="iu" class="template">

               <div class="g-flex">

                <div v-for="(image, index) in uploadBlock.image" v-if="uploadBlock.image.length > 0" :key="index" class="g-flex-item">

                    <p v-if="index == '0'" class="tip">{{image.tips}}</p>

                    <!-- 创意样式 信息流大图与信息流小图-->
                    <div v-if="uploadBlock.style === 'big'"  class="updata_img">
                      <Upload type="drag" :action="actionUrl" accept="image/*" :format="['jpg','png']" :show-upload-list="false" :max-size="20" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" >
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                      </div>
                      </Upload>
                      <div v-show="pic1_img" ref="imageMask" class="mask">
                        <div ref="btnClose" @click="handleCloseMask" class="btn-close">x</div>
                        <img :src="pic1_img" alt="" class="image-view">
                      </div>
                    </div>

                    <div v-if="uploadBlock.style === 'small'"  class="updata_img">
                      <Upload type="drag" :action="actionUrl" accept="image/*" :format="['jpg','png']" :show-upload-list="false" :max-size="20" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" >
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>点击或将文件拖拽到这里上传</p>
                      </div>
                      </Upload>
                      <div v-show="pic2_img" ref="imageMask" class="mask">
                        <div ref="btnClose" @click="handleCloseMask" class="btn-close">x</div>
                        <img :src="pic2_img" alt="" class="image-view">
                      </div>
                    </div>

                    <!-- 创意样式 信息流大三图-->
                    <div v-if="uploadBlock.style == 'three' && image.key=== 'pic1_img' "  class="updata_img">
                      <Upload type="drag" :action="actionUrl" accept="image/*" :format="['jpg','png']" :show-upload-list="false" :max-size="20" :on-success="handleSuccess31" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" >
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                      </div>
                      </Upload>
                      <div v-show="pic31_img" ref="imageMask" class="mask">
                        <div ref="btnClose" @click="handleCloseMask" class="btn-close">x</div>
                        <img :src="pic31_img" alt="" class="image-view">
                      </div>
                    </div>

                    <div v-if="uploadBlock.style == 'three' && image.key=== 'pic2_img' "  class="updata_img">
                      <Upload type="drag" :action="actionUrl" accept="image/*" :format="['jpg','png']" :show-upload-list="false" :max-size="20" :on-success="handleSuccess32" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" >
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                      </div>
                      </Upload>
                      <div v-show="pic32_img" ref="imageMask" class="mask">
                        <div ref="btnClose" @click="handleCloseMask" class="btn-close">x</div>
                        <img :src="pic32_img" alt="" class="image-view">
                      </div>
                    </div>

                    <div v-if="uploadBlock.style == 'three' && image.key=== 'pic3_img' "  class="updata_img">
                      <Upload type="drag" :action="actionUrl" accept="image/*" :format="['jpg','png']" :show-upload-list="false" :max-size="20" :on-success="handleSuccess33" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" >
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                      </div>
                      </Upload>
                      <div v-show="pic33_img" ref="imageMask" class="mask">
                        <div ref="btnClose" @click="handleCloseMask" class="btn-close">x</div>
                        <img :src="pic33_img" alt="" class="image-view">
                      </div>
                  </div>
                </div>
            </div>
          </div>

        </div>
          <!-- 文本 -->
          <div class="g-content padding-lr-30">
            <h3 class="sub-title color-green padding-tb-20">创意文本及URL</h3>
            <Form v-if="template.creativeTemplateId === creativeSetting.creativeTemplate_id" v-for="(template, ip) in creativeTemplates" :key="ip" :model="fieldSetting" :label-width="126" label-position="left">
              <FormItem v-if="field.alias !== '图片'" v-for="(field, ic) in template.creativeTemplateFields" :key="ic" :label="field.alias">
                <Input @on-blur="handleField" v-model="fieldSetting[field.key]" :placeholder="field.alias" class="item-width"></Input>
                <Button @click="isWordPackages=true" v-if="field.alias === '标题'" :disabled="packageWord.isDisable" type="ghost">插入词包</Button>
                <p :class="[isErr[field.key] ? 'color-red' : 'color-grey']" class="font-size-12">{{field.tips}}</p>
                <div v-if="field.alias === '标题' && isWordPackages" class="margin-top-10">
                  <word-packages @on-select="handlePackageChange"></word-packages>
                </div>
              </FormItem>
              <FormItem>
                <span slot="label">点击监测链接 <span @click="monitorModal=true"><Icon type="help-circled"></Icon></span></span>
                <Input @on-blur="handleMonitorUrl" v-model="creativeSetting.clickMonitorUrl" placeholder="点击监测链接" class="item-width"></Input> (可选)
                <p :class="[isErr.clickMonitorUrl ? 'color-red' : 'color-grey']" class="font-size-12">请以http或https开头，长度不能大于1024个字符</p>
              </FormItem>
            </Form>

          </div>
        </div>
        <!-- 预览 -->
        <div class="phone-preview g-flex-rt padding-lr-30">
          <h3 class="sub-title color-green padding-tb-20">广告预览</h3>
          <!-- 大图 -->
          <div v-for="(preView, ip) in creativeTemplatesFieldsList" v-if="creativeTemplatesFieldsList.length > 0" :key="ip">
            <div v-if="creativeSetting.creativeTemplate_id === preView.creativeTemplate_id" v-show="preView.style === 'big'" class="bg-phone phone-template1">
              <div class="title">{{viewTitle}}</div>
              <div class="bg-image">
                <img v-show="pic1_img" :src="pic1_img" alt="广告预览" class="image">
              </div>
              <div class="desc">
                <Icon type="volume-high"></Icon>
                <span class="item">推广</span>
                <span class="item">刚刚</span>
                <span class="item">{{fieldSetting.source}}</span>
              </div>
              <div class="phone-foot"></div>
            </div>
            <!-- 小图 -->
            <div v-if="creativeSetting.creativeTemplate_id === preView.creativeTemplate_id" v-show="preView.style === 'small'" class="bg-phone phone-template2">
              <div class="content g-flex border-bottom">
                <div class="item-lt">
                  <div class="title">{{viewTitle}}</div>
                  <div class="desc">
                    <Icon type="volume-high"></Icon>
                    <span class="item">推广</span>
                    <span class="item">刚刚</span>
                    <span class="item">{{fieldSetting.source}}</span>
                  </div>
                </div>
                <div class="item-rt">
                  <div class="bg-image">
                    <img v-show="pic2_img" :src="pic2_img" alt="广告预览" class="image">
                  </div>
                </div>
              </div>
              <div class="phone-foot"></div>
            </div>
            <!-- 三图 -->
            <div v-if="creativeSetting.creativeTemplate_id === preView.creativeTemplate_id" v-show="preView.style === 'three'" class="bg-phone phone-template3">
              <div class="title">{{viewTitle}}</div>
              <div class="image-content g-flex">
                <div class="bg-image">
                  <img v-show="pic31_img" :src="pic31_img" alt="广告预览" class="image">
                </div>
                <div class="bg-image">
                  <img v-show="pic32_img" :src="pic32_img" alt="广告预览" class="image">
                </div>
                <div class="bg-image">
                  <img v-show="pic33_img" :src="pic33_img" alt="广告预览" class="image">
                </div>
              </div>
              <div class="desc">
                <Icon type="volume-high"></Icon>
                <span class="item">推广</span>
                <span class="item">刚刚</span>
                <span class="item">{{fieldSetting.source}}</span>
              </div>
              <div class="phone-foot"></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="padding-lr-30 padding-tb-20">
      <Button @click="handleSumbit" type="primary">确认</Button>
      <Button @click="handleGoBack" type="ghost">取消</Button>
    </div>

    <!--点击监测链接 弹窗  -->
    <Modal v-model="monitorModal" @on-ok="monitorModal=false" width="850" title="点击监测链接描述">
      <div class="txt">
        <p>阿里汇川广告平台在新建创意提交物料时，支持在所有样式下增加点击监测链接：</p>
        <p>点击监测链接，选填，长度不多于1024个字符；设置后，广告真实点击时给此链接打点。</p>
        <p>同时，我们对点击监测链接支持跟踪参数：</p>
      </div>
      <table>
        <thead>
          <tr>
            <td>参数</td>
            <td>参数</td>
            <td>格式</td>
            <td>可选性</td>
          </tr>
        </thead>
        <tbody><tr><td><span>IDFA_SUM</span></td><td><span>IOS设备唯一标识</span></td><td><span>原值转大写，计算32位md5sum，再转大写</span></td><td><span>IOS必选</span></td></tr><tr><td><span>IMEI_SUM</span></td><td><span>Android设备唯一标识</span></td><td><span>Android必填，原值转大写，计算32位md5sum，再转大写</span></td><td><span>安卓必选</span></td></tr><tr><td><span>TS</span></td><td><span>点击发生的时间</span></td><td><span>UTC时间戳</span></td><td><span>可选</span></td></tr><tr><td><span>MAC_SUM</span></td><td><span>用户设备的mac地址的md5</span></td><td><span>保留 “:”，保持大写，取md5sum，再转大写</span></td><td><span>可选</span></td></tr><tr><td><span>MAC_SUM1</span></td><td><span>用户设备的mac地址的md5</span></td><td><span>去除“:”，保持大写，取md5sum，再转大写</span></td><td><span>可选</span></td></tr><tr><td><span>ANDROIDID_SUM</span></td><td><span>用户终端的AndroidID，md5加密</span></td><td><span>取md5sum摘要</span></td><td><span>可选</span></td></tr><tr><td><span>UA</span></td><td><span>数据上报终端设备的User Agent</span></td><td><span>经过url encode的字符串</span></td><td><span>可选</span></td></tr><tr><td><span>OS</span></td><td><span>操作系统</span></td><td><span>0表示Ios ,1表示Android,2其他</span></td><td><span>可选</span></td></tr><tr><td><span>LBS</span></td><td><span>经纬度</span></td><td><span>精确到两位小数，精度在前维度在后，用逗号分隔</span></td><td><span>可选</span></td></tr><tr><td><span>IP</span></td><td><span>媒体投放系统获取的用户终端的IP地址</span></td><td><span>A.B.C.D</span></td><td><span>可选</span></td></tr></tbody>
      </table>
      <div class="txt">
        <p>注：UC精准仅支持：IDFA_SUM、IMEI_SUM、ANDROIDID_SUM、OS、LBS</p>
        <p>例：点击链接设为：http://e.sm.cn?os={OS}&imei={IMEI_SUM}&android={ANDROID_ID}, 则在点击产生时给此链接地址打点：http://www.sm.cn?os=1&imei=59147654422199D605A3B10F37D22&android=59147654736289472D605A3B10910F，其中1表示操作系统是Android，“59147654422199D605A3B10F37D220”为设备的IMEI号的MD5值，“59147654736289472D605A3B10910F”为设备的Android id 的MD5值。</p>
      </div>
    </Modal>
  </div>
</template>

<script>
// import unitbyid from '../simple/unitbyid'
// import getCampaignNameList from '../simple/getCampaignNameList'
// import creativeTemplates from '../simple/creativeTemplates'
import Axios from '@/api/index'
import util from '@/utils/index'
import { deepClone } from '@/utils/DateShortcuts.js'
import wordPackages from './wordPackages'
// 常用变量
const ERR_OK = 1
const TIPS_TYPE_TITLE = 'titleTips'
const TIPS_TYPE_SOURCET = 'sourceTips'
const TIPS_TYPE_SCHEME_URL = 'scheme_urlTips'
const TIPS_TYPE_TARGET_URL = 'target_urlTips'

export default {
  // 图片模板类型： 大图：big，小图：small，三图：three
  data() {
    return {
      monitorModal: false, // 点击监测链接弹窗
      isEdit: false, // 判断当前推广计划状态：true为编辑状态，false为新建状态
      isWordPackages: false, // 词包
      campaignNameList: [], // 计划名称列表
      campaignName: '', // 当前计划名称
      adgroupName: '', // 当前单元名称
      currCreativeList: [], // 当前创意列表
      creativeTemplates: [], // 同步返回的创意模板
      currCreativeTemplatesField: {
        adgroup_id: '',
        creativeTemplate_id: '',
        creativeTemplateName: '',
        content: {},
        image: [],
        imageSize: '',
        style: ''
      }, // 当前封装后的创意模板
      creativeTemplatesFieldsList: [], // 封装后的创意模板 的 fields 字段
      accountId: this.$route.query.account,
      campaignId: this.$route.query.campaign_id,
      adgroupId: this.$route.query.adgroup_id,
      creativeId: this.$route.query.creative,
      currId: 0, // isEdit=true 状态下 用于获取创意内容
      paused: 1,
      creativeSetting: {
        account_id: this.$route.query.account,
        adgroup_id: this.$route.query.adgroup_id,
        campaign_id: this.$route.query.campaign_id,
        videoId: 0,
        creativeTemplate_id: 1,
        clickMonitorUrl: '', // 点击监测链接
        wildcardIds: null,
        content: {}
      },
      packageWord: {
        id: null,
        packageName: '',
        defaultWord: '',
        isDisable: false
      },
      viewTitle: '',
      fieldSetting: {
        app_name: '', // APP名称
        title: '',
        source: '', // 推广来源
        scheme_url: 'http://', // 直达链接
        target_url: 'http://', // 点击URL
        description: 'http://' // 描述
      },
      pic1_img: '',
      pic2_img: '',
      pic31_img: '',
      pic32_img: '',
      pic33_img: '',
      isErr: {
        title: false,
        source: false,
        target_url: false,
        scheme_url: false,
        clickMonitorUrl: false
      },
      image: {
        name: 'img',
        type: 'string',
        size: 90,
        format: '*.jpg|*.png',
        width: 640,
        height: 300
      },
      imageResp: {
        image_id1: '',
        srcImageUrl1: '',
        image_id2: '',
        srcImageUrl2: '',
        image_id31: '',
        srcImageUrl31: '',
        image_id32: '',
        srcImageUrl32: '',
        image_id33: '',
        srcImageUrl33: ''
      },
      actionUrl: ''
    }
  },
  methods: {
    // 获取词包
    handlePackageChange(word) {
      [this.packageWord] = [word]
      this.isWordPackages = false
      this.wildcardIds = word.id

      this.fieldSetting.title += this.packageWord.packageName
      this.viewTitle += this.packageWord.defaultWord
    },
    handleSuccess31(filte) {
      if (filte.ret === '1') {
        let img = filte.data
        this.imageResp.image_id31 = img.image_id
        this.imageResp.srcImageUrl31 = img.srcImageUrl
        this.pic31_img = img.srcImageUrl
      }
      if (filte.ret === '-1') {
        this.$Message.warning({
          desc: filte.msg
        })
      }
    },
    handleSuccess32(filte) {
      if (filte.ret === '1') {
        let img = filte.data
        this.imageResp.image_id32 = img.image_id
        this.imageResp.srcImageUrl32 = img.srcImageUrl
        this.pic32_img = img.srcImageUrl
      }
      if (filte.ret === '-1') {
        this.$Message.warning(filte.msg)
      }
    },
    handleSuccess33(filte) {
      if (filte.ret === '1') {
        let img = filte.data
        this.imageResp.image_id33 = img.image_id
        this.imageResp.srcImageUrl33 = img.srcImageUrl
        this.pic33_img = img.srcImageUrl
      }
      if (filte.ret === '-1') {
        this.$Message.warning(filte.msg)
      }
    },
    handleSuccess(filte) {
      if (filte.ret === '1') {
        let img = filte.data
        this.creativeTemplatesFieldsList.forEach(simple => {
          if (simple.creativeTemplate_id === this.creativeSetting.creativeTemplate_id) {
            if (simple.style === 'big') {
              this.imageResp.image_id1 = img.image_id
              this.imageResp.srcImageUrl1 = img.srcImageUrl
              this.pic1_img = img.srcImageUrl
            } else if (simple.style === 'small') {
              this.imageResp.image_id2 = img.image_id
              this.imageResp.srcImageUrl2 = img.srcImageUrl
              this.pic2_img = img.srcImageUrl
            }
          }
        })
        return
      }
      if (filte.ret === '-1') {
        this.$Message.warning(filte.msg)
      }
    },
    handleFormatError(file) {
      this.$Message.warning('文件' + file.name + '格式不正确，请选择图片文件。')
    },
    defaultList(list) {
    },
    handleBeforeUpload(file) {
      // console.log(
      //   'handleBeforeUpload',
      //   this.actionUrl,
      //   file,
      //   file.size,
      //   typeof file.size
      // )
      // console.log(file)
      // console.log(this.imgSize)
      // this.$Notice.warning({
      //     title: '文件准备上传',
      //     desc: '文件 ' + file.name + ' 准备上传。'
      // })
    },
    handleProgress(event, file) {
      // this.loading = true
      // this.percent = event.percent
      // if (event.percent === 100) {
      //     this.loading = false
      // }
      // console.log(event.percent)
      // this.$Notice.info({
      //     title: '文件正在上传',
      //     desc: '文件 ' + file.name + ' 正在上传。'
      // })
    },
    handleMaxSize(file) {
      //  console.log('handleMaxSize', this.actionUrl, file.size, typeof file.size)
      // this.$Notice.warning({
      //     title: '超出文件大小限制',
      //     desc:
      //         '文件' +
      //         file.name +
      //         '太大，不能超过' +
      //         this.imgSize +
      //         'KB。'
      // })
    },
    handleError(event, file) {
      this.$Message.error({
        title: '文件上传失败',
        desc: '文件' + file.name + '上传失败。'
      })
    },
    // 获取字符长度
    getByteLen(str) {
      let len = 0
      for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i)
        /* eslint-disable no-control-regex */
        if (char.match(/[^\x00-\xff]/gi) !== null) {
          len += 2
        } else {
          len += 1
        }
      }
      return len
    },
    handleCloseMask(e) {
      switch (this.currCreativeTemplates.style) {
        case 'big':
          this.pic1_img = ''
          break
        case 'small':
          this.pic1_img = ''
          this.pic2_img = ''
          break
        case 'three':
          this.pic31_img = ''
          this.pic32_img = ''
          this.pic33_img = ''
          break
      }
    },
    handleDescription(currStr) {},
    handleMonitorUrl(e) {
      const len = +this.currCreativeTemplates.target_urlSize
      /* eslint-disable no-useless-escape */
      const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

      const currStr = e.target.value
      let currLen = this.getByteLen(currStr)
      if (len > currLen && reg.test(currStr)) {
        this.isErr.clickMonitorUrl = false
      } else {
        this.$Message.warning(this.currCreativeTemplates[TIPS_TYPE_TARGET_URL])
        this.isErr.clickMonitorUrl = true
      }
      this.creativeSetting.clickMonitorUrl = currStr
    },
    handleSchemeUrl(currStr) {
      const len = +this.currCreativeTemplates.scheme_urlSize
      const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

      let currLen = this.getByteLen(currStr)
      if (len > currLen && reg.test(currStr)) {
        this.isErr.scheme_url = false
      } else {
        this.isErr.scheme_url = true
        this.$Message.warning(this.currCreativeTemplates[TIPS_TYPE_SCHEME_URL])
      }
      this.fieldSetting.scheme_url = currStr
    },
    handleSource(currStr) {
      const lenList = this.currCreativeTemplates.sourceSize.split('-')
      lenList.map(num => +num)

      let currLen = this.getByteLen(currStr)
      if (lenList[0] > currLen || lenList[1] < currLen) {
        this.$Message.warning(this.currCreativeTemplates[TIPS_TYPE_SOURCET])
        this.isErr.source = true
      } else {
        this.isErr.source = false
      }
      this.fieldSetting.source = currStr
    },
    handleTitle(currStr) {
      console.log(this.currCreativeTemplates)
      const lenList = this.currCreativeTemplates.titleSize.split('-')
      lenList.map(num => +num)

      let currLen = this.getByteLen(currStr)
      if (lenList[0] > currLen || lenList[1] < currLen) {
        this.isErr.title = true
        this.$Message.warning(this.currCreativeTemplates[TIPS_TYPE_TITLE])
      } else {
        this.isErr.title = false
      }

      // 判断词包的状态
      let packageName = this.packageWord.packageName
      if (packageName !== '') {
        if (currStr.indexOf(packageName) > -1) {
          this.fieldSetting.title = currStr
          const reg = this.fieldSetting.title.split(packageName)
          this.viewTitle = reg[0] + this.packageWord.defaultWord + reg[1]
          this.packageWord.isDisable = true
        } else {
          packageName = ''
          this.packageWord.defaultWord = ''
          this.packageWord.isDisable = false
        }
      } else {
        this.fieldSetting.title = this.viewTitle = currStr
      }
    },
    handleAppName(currStr) {
      console.log('handleAppName', currStr)
    },
    handleTargetURL(currStr) {
      const len = +this.currCreativeTemplates.target_urlSize
      const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

      let currLen = this.getByteLen(currStr)
      if (len > currLen && reg.test(currStr)) {
        this.isErr.target_url = false
      } else {
        this.$Message.warning(this.currCreativeTemplates[TIPS_TYPE_TARGET_URL])
        this.isErr.target_url = true
      }
      this.fieldSetting.target_url = currStr
    },
    handleField(e) {
      let tarName = e.target.placeholder
      let currValue = e.target.value
      switch (tarName) {
        case '标题':
          this.handleTitle(currValue)
          break
        case '推广来源':
          this.handleSource(currValue)
          break
        case '点击URL':
          this.handleTargetURL(currValue)
          break
        case '直达链接':
          this.handleSchemeUrl(currValue)
          break
        case 'APP名称':
          this.handleAppName(currValue)
          break
        case '描述':
          this.handleDescription(currValue)
          break
        case '监控URL':
          this.handleMonitorUrl(currValue)
          break
      }
    },
    initCurrCreativeTemplates(id) {
      this.creativeTemplatesFieldsList.forEach(vp => {
        if (id === vp.creativeTemplate_id) {
          this.currCreativeTemplates = vp
        }
      })
    },
    handleChangeTemplate(id) {
      this.initCurrCreativeTemplates(id)
      this.initImageInfo(this.currCreativeTemplates)
    },
    // 初始化上传图片信息
    initImageInfo(currTemp) {
      if (!currTemp) {
        return
      }
      const imageSize = currTemp.imageSize.split('*')
      this.image.width = parseInt(imageSize[0])
      this.image.height = parseInt(imageSize[1])
      this.image.size = currTemp.image[0].size
      this.actionUrl =
        'http://ads.tanwan.com/api.php?action=ucAdPut&opt=adsimg_doadd&account_id=' +
        this.accountId +
        '&target_width=' +
        this.image.width +
        '&target_height=' +
        this.image.height +
        '&sessionid=' + util.getItem('sessionid')
    },
    // 初始化创意 编辑 状态下的数据
    initEditIdea(currCreativeList) {
      this.accountId = currCreativeList.account_id
      this.adgroupId = currCreativeList.adgroup_id
      this.campaignId = currCreativeList.campaign_id
      this.creativeSetting.account_id = currCreativeList.account_id
      this.creativeSetting.adgroup_id = currCreativeList.adgroup_id
      this.creativeSetting.campaign_id = currCreativeList.campaign_id
      this.creativeSetting.videoId = currCreativeList.videoId ? this.currCreativeList.videoId : '0'
      this.creativeSetting.creativeTemplate_id = currCreativeList.creativeTemplate_id
      this.creativeSetting.clickMonitorUrl = currCreativeList.clickMonitorUrl
      this.creativeSetting.wildcardIds = currCreativeList.wildcardIds
      this.creativeSetting.appId = currCreativeList.appId
      this.creativeSetting.channelApkId = currCreativeList.channelApkId
      this.paused = currCreativeList.paused
      const content = JSON.parse(currCreativeList.content)
      this.fieldSetting.app_name = content.app_name
      this.fieldSetting.title = content.title
      this.viewTitle = content.title
      this.fieldSetting.source = content.source
      this.fieldSetting.scheme_url = content.scheme_url
      this.fieldSetting.target_url = content.target_url
      this.fieldSetting.description = content.description

      this.initCurrCreativeTemplates(this.creativeSetting.creativeTemplate_id)
      this.initImageInfo(this.currCreativeTemplatesField)
      switch (this.currCreativeTemplatesField.style) {
        case 'big':
          this.pic1_img = content.pic1_img
          break
        case 'small':
          this.pic1_img = content.pic1_img
          this.pic2_img = content.pic2_img
          break
        case 'three':
          this.pic1_img = content.pic1_img
          this.pic2_img = content.pic2_img
          this.pic3_img = content.pic3_img
          break
      }
    },
    getImageField(templateId) {
      let retContent = {}
      this.creativeTemplatesFieldsList.forEach(field => {
        if (field.creativeTemplate_id === templateId) {
          for (let k in field.content) {
            retContent[k] = this.fieldSetting[k]
            // 判断是否三图
            if (field.style === 'three') {
              if (k === 'pic1_img') {
                retContent[k] = this.pic31_img
              }
              if (k === 'pic2_img') {
                retContent[k] = this.pic32_img
              }
              if (k === 'pic3_img') {
                retContent[k] = this.pic33_img
              }
            } else {
              if (k === 'pic1_img') {
                retContent[k] = this.pic1_img
              }
            }
          }
        }
      })
      return retContent
    },
    // 根据id获取创意内容
    getCurrCreativeList() {
      Axios.post('api.php', {
        action: 'ucAdPut',
        opt: 'getCreativeById',
        id: this.currId
      })
        .then(res => {
          if (ERR_OK === res.ret) {
            this.currCreativeList = res.data[0]
            this.initEditIdea(this.currCreativeList)
          }
        })
        .catch(err => {
          console.log('获取创意内容错误：' + err)
        })
      // 本地测试
      // this.currCreativeList = unitbyid.data[0].adgroup_name
    },
    // 获取广告样式列表
    getCreativeTemplates() {
      Axios.post('api.php', {
        action: 'ucAdPut',
        opt: 'getCreativeTemplates',
        adgroup_id: this.adgroupId,
        account_id: this.accountId
      })
        .then(res => {
          if (ERR_OK === res.ret) {
            if (res.data.length < 1) {
              location.reload()
            }
            this.creativeTemplates = res.data
            this.creativeSetting.creativeTemplate_id = res.data[0].creativeTemplateId

            res.data.forEach((vp, ip) => {
              this.creativeTemplatesFieldsList.push({
                id: vp.id,
                adgroup_id: vp.adgroup_id,
                creativeTemplate_id: vp.creativeTemplateId,
                creativeTemplateName: vp.creativeTemplateName,
                content: {},
                image: [],
                imageSize: vp.size,
                style: ''
              })
              if (vp.creativeTemplateName.indexOf('三图') > -1) {
                this.creativeTemplatesFieldsList[ip]['style'] = 'three'
              } else if (vp.creativeTemplateName.indexOf('大图') > -1) {
                this.creativeTemplatesFieldsList[ip]['style'] = 'big'
              } else if (vp.creativeTemplateName.indexOf('小图') > -1) {
                this.creativeTemplatesFieldsList[ip]['style'] = 'small'
              }
              vp.creativeTemplateFields.forEach((vc, ic) => {
                this.creativeTemplatesFieldsList[ip].content[vc.key] = ''
                this.creativeTemplatesFieldsList[ip][`${vc.key}Size`] = vc.size
                this.creativeTemplatesFieldsList[ip][`${vc.key}Tips`] = vc.tips
                if (vc.alias === '图片') {
                  this.creativeTemplatesFieldsList[ip].image.push({
                    key: vc['key'],
                    alias: vc['alias'],
                    tips: vc['tips'],
                    size: vc['size']
                  })
                }
              })
            })
            if (this.isEdit) {
              this.getCurrCreativeList()
            } else {
              this.initCurrCreativeTemplates(this.creativeSetting.creativeTemplate_id)
            }
          }
        })
        .catch(err => {
          console.log('获取广告样式列表错误：' + err)
        })
    },
    // 获取单元名称列表
    getAdgroupNameList() {
      Axios.post('api.php', {
        action: 'ucAdPut',
        opt: 'getAdgroupById',
        adgroup_id: this.adgroupId
      })
        .then(res => {
          if (ERR_OK === res.ret) {
            const unit = res.data[0]
            this.adgroupName = unit.adgroup_name
          }
        })
        .catch(err => {
          console.log('获取单元名称列表错误：' + err)
        })
      // 本地测试
      // this.adgroupName = unitbyid.data[0].adgroup_name
    },
    // 获取计划名称
    getCampaignName() {
      this.campaignNameList.forEach(campaign => {
        if (campaign.campaign_id === this.campaignId) {
          this.campaignName = campaign.campaign_name
        }
      })
    },
    // 获取计划名称列表
    getCampaignNameList() {
      Axios.post('api.php', {
        action: 'ucAdPut',
        opt: 'getCampaignNameList'
      })
        .then(res => {
          if (ERR_OK === res.ret) {
            this.campaignNameList = res.data
            this.getCampaignName()
          }
        })
        .catch(err => {
          console.log('获取计划名称列表错误：' + err)
        })
      // 本地测试
      // this.campaignNameList = getCampaignNameList.data
      // this.getCampaignName()
    },
    // 新建创意
    addIdea() {
      let creative = deepClone(this.creativeSetting)
      Object.assign(creative.content, this.getImageField(this.creativeSetting.creativeTemplate_id))
      let addParams = Object.assign({}, creative, {
        action: 'ucAdPut',
        opt: 'addCreative',
        campaign_id: parseInt(this.$route.query.campaign_id)
      })
      // console.log('新建创意参数', creative, addParams)
      Axios.post('api.php', addParams)
        .then(res => {
          if (ERR_OK === res.ret) {
            this.creativeId = res.data.creative_id
            this.$Message.success('新建推广创意成功')
          }
        })
        .catch(err => {
          console.log('新建推广创意错误：' + err)
        })
    },
    // 编辑创意
    updateIdea() {
      let creative = deepClone(this.creativeSetting)
      Object.assign(creative.content, this.getImageField(this.creativeSetting.creativeTemplate_id))
      let updateParams = Object.assign({}, creative, {
        action: 'ucAdPut',
        opt: 'updateCreative',
        creative_id: this.creativeId,
        campaign_id: parseInt(this.creativeSetting.campaign_id),
        videoId: parseInt(this.creativeSetting.videoId),
        creativeTemplate_id: parseInt(this.creativeSetting.creativeTemplate_id),
        appId: 0,
        channelApkId: 0,
        paused: parseInt(this.paused)
      })
      // console.log('编辑创意参数', updateParams)
      Axios.post('api.php', updateParams)
        .then(res => {
          if (ERR_OK === res.ret) {
            this.creativeId = res.data.creative_id
            this.$Message.success('编辑创意成功')
            this.handleGoBack()
          }
        })
        .catch(err => {
          console.log('编辑创意错误：' + err)
        })
    },
    // 返回提交创意
    handleSumbit() {
      if (this.isEdit) {
        this.updateIdea()
      } else {
        this.addIdea()
      }
    },
    // 返回上级路由
    handleGoBack() {
      this.$router.go(-1)
    },
    // 获取account信息
    getAccountInfo() {
      let query = this.$route.query
      this.creativeSetting.account_id = query.account
      this.creativeSetting.adgroup_id = query.adgroup_id
      this.creativeSetting.campaign_id = query.campaign_id

      if (query.edit && query.edit === '1') {
        this.isEdit = true
        this.currId = this.$route.query.id
      } else {
        this.isEdit = false
      }
    }
  },
  mounted() {
    this.actionUrl =
      'http://ads.tanwan.com/api.php?action=ucAdPut&opt=adsimg_doadd&account_id=' +
      this.accountId +
      '&target_width=' +
      this.image.width +
      '&target_height=' +
      this.image.height +
      '&sessionid=' + util.getItem('sessionid')
  },
  created() {
    this.getAccountInfo()
    this.getCreativeTemplates()
    this.getCampaignNameList()
    this.getAdgroupNameList()
  },
  components: {
    wordPackages
  }
}
</script>
