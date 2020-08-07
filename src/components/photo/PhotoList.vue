<template>
  <div>
    <!-- 这是顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!-- 采用属性绑定的方式动态绑定控件的类，要在""中使用''，多个类的时候要使用数组-->
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <div>
      <ul class="photo-list">
          <!-- tag="li"属性把router-link渲染成li，默认渲染成a标签，因为样式是写在li标签上的 -->
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li"> 
          <img v-lazy="item.img_url" />
          <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <div class="info-body">{{ item.zhaiyao }}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
//1. 导入MUI的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], //存储所有分类的数组
      list: [] //存放所有的图片
    };
  },
  mounted() {
    //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    //当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    //如果要操作元素了，最好在mounted里面，因为，这个时候的DOM元素是最新的
    //2.初始化mui的scroll（区域滚动）控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0); //默认进入页面的时候请求所有图片的数组
  },
  methods: {
    getAllCategory() {
      //获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      //根据分类ID，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  //防止滑动的时候控制台的警告
  //css属性touch-action用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #999;
    border-radius: 5px;
    img {
      width: 100%;
      vertical-align: middle;
      border-radius: 5px;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      
      margin-right: 10px;
      margin-top: -84px;
      
      .info-title {
        font-size: 14px;
        max-height: 14px;
        overflow: hidden;
      }
      .info-body {
        font-size: 13px;
        max-height: 60px;
        overflow: hidden;
      }
    }
  }
}
</style>
