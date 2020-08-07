<template>

  <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
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
            //数量改变了
            //console.log(this.$refs.numbox.value)
            //每当数量值改变，则立即把最新的数量同步到购物车的store中，覆盖之前的数量值
            this.$store.commit("updateGoodsList",{
              id:this.goodsid,
              count:this.$refs.numbox.value
            })
        },
    },
    //父组件向子组件传值，子组件接收这个值要使用props
    props:["initcount","goodsid"],
};
</script>
<style lang="less" scoped>
</style>
