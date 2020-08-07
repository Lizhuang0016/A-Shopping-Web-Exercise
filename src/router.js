//因为要使用到路由对象，所以需要导入VueRouter
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photo/PhotoList.vue'
import PhotoInfo from './components/photo/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'



//创建路由对象
var router = new VueRouter({
    routes: [//配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component: HomeContainer},
        {path:'/member',component: MemberContainer},
        {path:'/shopcar',component: ShopcarContainer},
        {path:'/search',component: SearchContainer},
        {path:'/home/newslist',component:NewsList},
        //:id表示绑定，表示id是一个参数
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/photolist',component:PhotoList},
        {path:'/home/photoinfo/:id',component:PhotoInfo},
        {path:'/home/goodslist',component:GoodsList},
        {path:'/home/goodsinfo/:id',component:GoodsInfo},
        //name属性指定组件的名称，以便在使用编程式导航的时候使用组件的name属性进行组件的跳转
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
    ],
    linkActiveClass:'mui-active', //覆盖默认的路由高亮类，默认的类叫做router-link-active，vue会为选中的路由自动添加这个类，用linkActiveClass修改默认的类名，因为mui-active自带高亮样式
})

//把路由对象暴露出去，在main.js中引用
export default router