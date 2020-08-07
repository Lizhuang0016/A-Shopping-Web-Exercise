<template>
<!-- 使用父组件传递过来的max值的时候,因为父组件的goodsinfo.stock_quantity属性是通过this.$http.get方法获取到的，这是一个异步方法，
在页面进行渲染的时候这个异步方法可能还没有执行，所以这个时候max=goodsinfo.stock_quantity得到的可能是undefined -->
<!-- 问题：我们不知道什么时候拿到max值，但是总归有一刻，会得到一个真正的max值 -->
<!-- 我们可以使用watch属性监听,来监听父组件传过来的max值,不关watch会被触发几次,但是,最后一次,肯定是一个合法的max数值 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    //在合适的生命周期函数中进行初始化，原因具体详见PhotoInfo.vue
    mounted(){
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods:{
        countChanged(){
            //每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
            //console.log(this.$refs.numbox.value)
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        },
    },
    //props属性接收父组件传递的值
    props:["max"],
    watch:{
      //属性监听
      max:function(newVal,oldVal){
        //使用mui的JS API设置numbox的最大值
        mui(".mui-numbox").numbox().setOption("max",newVal);
      }
    },
};
</script>
<style lang="less" scoped>
</style>
