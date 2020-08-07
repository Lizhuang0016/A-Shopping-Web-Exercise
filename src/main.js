//入口文件
import Vue from 'vue'

//1.1.导入路由模块
import VueRouter from 'vue-router'
//1.2.安装路由模块
Vue.use(VueRouter)
//1.3.导入自己的路由配置模块即单独放置路由信息的router.js文件
import router from './router.js'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car=JSON.parse(localStorage.getItem('car')||'[]')

var store = new Vuex.Store({
    state: { //this.$store.state.***
        //将购物车的商品数据，用一个数据存储起来，在car数组中，存储一些商品对象，咱们可以暂时将这个商品对象，设计成这个样子
        //{id:商品的id,count:商品的数量,price:商品的单价,selected:商品时候被选中}
        car: car,
    },
    mutations: { //this.$store.commit('',)
        addToCar(state, goodsinfo) {
            //点击加入购车，把商品信息，保存到store中的car上
            //1.如果购物车中已有这个商品，那么只需要更新数量
            //2.如果没有，则直接把商品push到car中
            //默认没有找到商品
            var flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            //如果最终，循环完毕，得到的flag还是false，那么说明购物车内没有这个商品，直接把商品数据push到购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }
            //当更新car之后，把car数组存储到本地的localStorage中
            //localStorage用法https://www.cnblogs.com/st-leslie/p/5617130.html
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsList(state,goodsinfo){
            //修改购物车中该商品的数量值
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            //根据Id。从store中的购物车中删除对应的那条商品数据
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1);
                    return true;
                }
            })
            //将删除完毕后，最新的购物车数据，同步到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            //更新商品的选中状态
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected;
                }
            })
            //同步到本地
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters: { //this.$store.getters.***
        //获取所有商品的数量和
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        //获取每个商品的数量，构成对象数组
        getGoodsCount(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.count;
            })
            return o;
        },
        //获取每个商品的选中状态,构成对象数组
        getGoodsSelected(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.selected;
            })
            return o;

        },
        //获取勾选商品的数量以及勾选商品的总价
        getGoodsCountAndAmount(state){
            var o={
                count:0,//勾选的数量
                amount:0,//勾选的总价
            };
            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price*item.count
                } 
            })
            return o;
        }
    }
})

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

//2.1.导入vue-resource
import VueResource from 'vue-resource'
//2.2.安装vue-resource
Vue.use(VueResource)
Vue.http.options.xhr = {
    withCredentials: true
}
//设置请求的根路径,要放在vue-resource之后，因为Vue的http属性要在安装了vue-resource之后才能调用
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true


//导入MUI的样式
import './lib/mui/css/mui.min.css'

//按需导入MUI的样式
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'

//按需导入Mint-UI中的组件
// import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// //冷加载的图标显示要生效需要使用全局导入Mint-UI
// Vue.use(Lazyload);

//全局导入Mint-UI
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装Vue自带的图片预览插件
//npm i vue-preview -S
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入axios
//import axios from 'axios'
// axios.get('/api/json.php').then(function(res){
//           console.log(res);
// });


//导入App跟组件
import app from './App.vue'

var vm = new Vue({
    el: "#app",
    data: {},
    render: c => c(app), //把app组件绑定到vm实例上
    router, //挂载路由对象到VM实例上
    store,//将Vuex的store挂载到Vue实例上
})