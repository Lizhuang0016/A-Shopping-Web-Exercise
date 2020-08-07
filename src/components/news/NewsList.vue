<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                    <!-- id是动态绑定的，所以要用v-bind绑定，字符串用''，加上要绑定的数据-->
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <!-- 通过管道符|调用时间过滤器,可以通过传参指定年月日dataFormat('YYYY-MM-DD') -->
                                <span>发表时间:{{item.add_time | dateFormat}}</span>
                                <span>点击：{{item.click}}次</span>
                                </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import {Toast} from "mint-ui"  
export default {
     data(){
         return {
             newsList:[]//定义空的新闻列表
         }
     },
     created(){
        this.getNewsList();
     },
     methods:{
         getNewsList(){
             //获取新闻列表
             this.$http.get("api/getnewslist").then(result=>{
                 if(result.body.status===0){
                     //如果没有失败，就把数据保存到data上
                     this.newsList=result.body.message;
                 }
                 else{
                     Toast("获取新闻列表失败!")
                 }  
             });
         }
     }
}
</script>
<style lang="less" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #63B8FF;
            display: flex;//display:flex 是一种布局方式。它即可以应用于容器中，也可以应用于行内元素。
            //Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
            // flex布局有6个属性可以设置
            // flex-direction　　容器内项目的排列方向(默认横向排列)　　
            // flex-wrap　　容器内项目换行方式 
            // flex-flow　　以上两个属性的简写方式
            // justify-content　　项目在主轴上的对齐方式
            // align-items　　项目在交叉轴上如何对齐
            // align-content　　定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
            justify-content: space-between;
        }
    }
}
</style>
