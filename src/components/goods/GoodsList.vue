<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <mt-button type="danger" size="large" @click="getMoreGoods">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageindex:1,//存放默认的展示页面数
            goodslist:[],//存放商品列表的数组
        }
    },
    created() {
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.goodslist=result.body.message;
                    //this.goodslist=this.goodslist.concat(result.body.message)
                }
            })
        },
        getMoreGoods(){
            this.pageindex++;
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then(result=>{
                if(result.body.status===0){
                    //this.goodslist=result.body.message;
                    this.goodslist=this.goodslist.concat(result.body.message)
                }
            })
        },
        getDetail(id){
            //使用JS的形式进行路由导航
            //注意，一定要区分this.$route和this.$router这两个对象
            //其中：this.$route是路由【参数对象】 所有路由中的参数，params，query都属于它
            //其中：this.$router是一个路由导航对象，用它可以方便的使用JS代码，实现路由的前进，后退，跳转到新的URL地址
            console.log(this)
            //1.最简单的方式
            this.$router.push("/home/goodsinfo/"+id)
            //2.传递对象
            //this.$router.push({path:"/home/goodsinfo/"+id})
            //3.传递命名的路由，要在路由对象router中给路由添加除了path属性和component属性之外的name属性，来为某个路由对象命名
            //this.$router.push({name:"goodsinfo",params:{id}})
        }
    }
}
</script>
<style lang="less" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap; //wrap属性规定灵活的项目在必要的时候拆行或拆列。
    justify-content: space-between;
    padding: 7px;
    .goods-item{
        width: 49%;
        border:1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color:red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left:10px; 
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>
