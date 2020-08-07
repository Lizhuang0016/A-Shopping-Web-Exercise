<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price*$store.getters.getGoodsCount[item.id]}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 如何从购物车中获取商品的数量 -->
                                <!-- 1.我们可以先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的ID作为对象的属性名，count值作为对象的属性名 -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计</p>
                            <p>已勾选商品
                                <span class="red">{{this.$store.getters.getGoodsCountAndAmount.count}}</span>件，总价￥
                                <span class="red">{{this.$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
    </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue"
export default{
    data(){
        return {
            goodslist:[],//存放商品列表
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //1.获取到store中所有商品的Id，然后拼接处一个用逗号分隔的字符串
            var idArray=[];
            this.$store.state.car.forEach(item => {
                idArray.push(item.id)
            });
            //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArray.length<=0){
                return;
            }
            //2.获取购物车商品列表
            this.$http.get("api/goods/getshopcarlist/"+idArray.join(",")).then(result=>{
                if(result.body.status===0){
                    this.goodslist=result.body.message
                }
            })
        },
        remove(id,index){
            //点击删除，把商品从store中根据传递的Id删除，同时，把当前组件中的goodslist中，对应要删除的那个商品，使用index来删除,即更新当前组件
            this.goodslist.splice(index,1)
            //更新store中的购物车数据
            this.$store.commit('removeFromCar',id)
        },
        selectedChanged(id,value){
            //每当点击开关，把最新的开关状态，同步到store中
            //console.log(id+"---"+value)
            this.$store.commit('updateGoodsSelected',{id:id,selected:value})
        }
    },
    components:{
        numbox,
    },
}
</script>

<style scoped lang="less">
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color:red;
                font-weight: bold;
            }
           
            
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
        }
    }
}
</style>