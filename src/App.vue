<template>
    <div class="app-container"> 
        <!-- 顶部 Header 区域 -->
        <mt-header fixed title="Vue项目之购物网站"> 
            <span slot="left" @click="goBack" v-show="flag"> 
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        <!-- <div class="rebutton" @click="returnLast"> < 返回</div> -->
        <!-- 中间 路由 router-view 区域 -->
        <transition>
        <router-view></router-view>
</transition>

        <!-- 底部 Tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-new" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-new" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-new" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-new" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>


    </div>
</template>

<script>
export default{
    data(){
        return {
            flag:false,//控制返回按钮的显示
        }
    },
    created(){
        this.flag=this.$route.path==='/home'?false:true
    },
    methods:{
        returnLast(){
            //返回上一个页面
            console.log("返回")
            this.$router.go(-1)
        },
        //点击后退
        goBack(){
            this.$router.go(-1)
        }
    },
    watch:{
        //停留在其他页面刷新页面的时候，因为是刚刷新，并没有触发路由的改变，所以监听不起作用，而flag默认为false，会不显示，所以需要在created函数中判断是否为主页面
        '$route.path':function(newVal){
            if(newVal==="/home"){
                this.flag=false;
            }else{
                this.flag=true;
            }
        }
    }
}
</script>

<style scoped>
.mint-header{
    z-index: 99;
}
.app-container{
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
}

.v-enter{
    opacity: 0;
    transform: translateX(100%);
}

.v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position:absolute;
}

.v-enter-active,
.v-leave-active{
    transition: all 0.5s ease;
}

/* 改类名，解决无法切换tabbar的问题 */
.mui-bar-tab .mui-tab-item-new.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-new {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-new .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-new .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.rebutton{
    position: absolute;
    /* background-color: white; */
    color: white;
    font-size: 14px;
    z-index: 100;
    margin: -30px 0 0 10px;
}
</style>