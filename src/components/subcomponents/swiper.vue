<template>
    <div>
        <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
          <img :src="item.img" alt="" :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
    </div>

    <!-- 分析，为什么商品评论中的轮播图那么丑 -->
    <!-- 1.首页中的图片，它的宽和高，都是使用了100%的宽度 -->
    <!-- 2.在商品的详情页面中，轮播图的图片，如果也使用宽高为100%的话，页面不好看 -->
    <!-- 3.商品详情页面中的轮播图，期望是高度100%，宽度自适应 -->
    <!-- 4.经过分析，得到原因，首页中的轮播图和详情中的轮播图，分歧点是宽度到底是100%还是自适应 -->
    <!-- 5.既然这两个轮播图，其他方面都没有冲突，只是宽度有分析，那么，我们可以定义一个属性，让轮播图的调用者，手动指定是否为100%的宽度 -->
</template>
<script>
export default {
    props:["lunbotuList","isfull"]
}
</script>
<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
      text-align: center;
    // &:nth-child(1) {
    //   background-color: aqua;
    // }
    // &:nth-child(2) {
    //   background-color: burlywood;
    // }
    // &:nth-child(3) {
    //   background-color: darkkhaki;
    // }
  }
  img {
    
    height: 100%;
  }
}
.full{
    width: 100%;
}
</style>
