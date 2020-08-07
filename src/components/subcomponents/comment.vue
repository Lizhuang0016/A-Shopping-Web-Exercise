<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要吐槽的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间 ：{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content===''?'此用户很懒，什么都没有留下':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMoreComments">加载更多</mt-button>
        
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            pageIndex:1,//默认展示第一页数据
            comments:[],//所有的评论数据
            msg:'',//评论输入的内容
        };
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                if(result.body.status===0){
                    if(this.pageIndex>=4){
                        Toast("没有更多评论了！")
                    }else{
                    //直接赋值的话第二页的评论会覆盖第一页的评论内容，而不会越来越多,所以要采用数组的拼接
                    //this.comments=result.body.message;
                    this.comments=this.comments.concat(result.body.message)
                    }  
                }else{
                    Toast("获取评论失败!")
                }
            })
        },
        getMoreComments(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            //校验评论内容是否为空
            if(this.msg.trim().length===0){
                //为空的时候return，则之后的代码不再执行
                return Toast("评论内容不能为空！")
            }
            //发表评论
            //post方法的参数
            //参数1:请求的url地址
            //参数2：提交给服务器的数据对象{content:this.msg}
            //参数3：定义提交时候，表单中数据的格式{emulateJSON：true}
            this.$http.post("api/postcomment/"+this.$route.params.id,{content:this.msg.trim()}).then(function(result){
                if(result.body.status===0){
                    //构建一个评论对象
                    var cmt={
                        user_name:"匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    //将新的评论添加到所有评论的最前面
                    this.comments.unshift(cmt);
                    this.msg="";
                }else{
                    Toast("不知道为什么发表评论失败！")
                }
            })
        }
    },
    //父组件向子组件传值，先在绑定数据，在在子组件中声明，然后才能调用
    props:["id"]
}
</script>
<style lang="less" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin:0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
