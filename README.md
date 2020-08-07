## 制作APP首页
1. 完成Header区域，使用的是Mint-UI中的Header组件
2. 制作底部的Tabbar区域，使用的是MUI的Tabbar.html
   + 在制作购物车小图标的时候
   + 先把扩展图标的css样式，拷贝到项目中
   + 拷贝扩展字体库ttf文件，到项目中
   + 为购物车小图标，添加样式mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在中间区域放置一个router-view来展示路由匹配到的组件

## 改造tabbar为router-link

## 设置选中路由高亮

## 点击tabbar中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，用vue-resource npm i vue-resource -S
2. 使用vue-resource的this.$http.get获取数据
3. 获取到的数据，要保存到data上
4. 使用v-for循环渲染每个item项 

## 改造九宫格区域的样式

## 改造新闻资讯的路由链接

## 新闻资讯的页面制作
1. 绘制界面，使用MUI中的media-list.html
2. 使用vue-resouce 获取数据
3. 渲染真实数据

## 实现新闻资讯列表点击跳转到新闻详情
1. 把列表中的每一项改造为router-link 同时，在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面，NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个comment.vue评论子组件
1. 先创建一个单独的comment.vue组件模板
2. 在需要使用comment组件的页面中，先手动导入comment组件
  + ‘import comment from './comment.vue'’
3. 在父组件中，使用“components”属性，将刚才导入的comment组件，注册为自己的子组件
4. 将注册子组件的时候的注册名称，以标签的形式在页面中引用

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论更多的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让pageIndex++，然后重新调用this.getComments()方法，重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数据的concat方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定，为发表按钮绑定一个时间
2. 校验评论内容是否为空，如果为空，则用Toast提示用户
3. vue-resource发送一个请求，把评论的内容提交给服务器
4. 当发表评论OK之后，重新刷新列表，以显示最新评论 
 + 如果调用getComments方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
 + 所以换一种方法，当评论成功后，在客户端，手动拼接处一个最新的评论对象，然后调用数组的unshift方法，把最新的评论，最佳到data中comments的开头，这样，就能实现刷新评论列表的功能

## 改造图片分析按钮为路由的链接并显示对应的组件页面

## 绘制图片列表组件页面结构并美化样式
1. 制作顶部滑动条
2. 制作地步的图片列表
### 制作顶部滑动条的坑
 1. 需要借助于MUI中的tab-top-webview-main.html
 2. 需要把silder区域的mui-fullscreen类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要初始化
  + 导入mui.js
  + 调用官方提供的方式去初始化
  + mui('.mui-scroll-wrapper').scroll({
	  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  + });
 4. 我们在初始化滑动条的时候，导入的mui.js，但是控制台报错:Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the       arguments objects for calls to them at Function.d.extend (mui.min.js:946)
  + 经过合理的推测，觉得，可能是mui.js中用到了caller', 'callee', and 'arguments' ，但是webpack打包好的bundle.js中，默认是启用严格模式的，所以，这两者冲突了
  + 解决方案：
  + 1.把mui.js中的非严格模式的代码改掉，但是不现实
  + 2.把webpack打包的时候的严格模式禁用掉
    + 如何禁用？安装一个babelrc的插件 把开头的use strict 去掉
    + npm install babel-plugin-transform-remove-strict-mode -D
    + 然后在.babelrc中添加{"plugins":["transform-remove-strict-mode"]}
 5. 刚进入图片分享页面的时候，滑动条无法正常工作，经过我们认真的分析，发现，如果需要初始化滑动条，不许要等DOM元素加载完毕，所以我们把初始化滑动条的代码，搬到了mounted生命周期函数中
 6. 当滑动条调试OK之后，发现，tabbar无法正常工作了，这时候，我们需要把每个tabbar按钮的样式中'mui-tab-item'重新改一下名字
  + 具体操作方法是
   + 先去页面审查元素，然后检查所有标签中引用了类mui-tab-item的元素
   + 把所有的样式加上其他的类名复制一遍
   + 然后只把mui-tab-item的名字改一下，例如改成mui-tab-item-new
 7. 获取所有分类，并渲染分类列表
### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用Mint-UI提供的现成组件'kazy-load'
2. 根据'lazy-load'的使用文档，尝试使用
3. 渲染图片列表数据
### 实现了图片列表的懒加载改造和样式美化

## 实现了点击图片跳转到图片详情页面
1. 在改造li标签为router-link的时候要加上tag="li"属性，将router-link执行渲染为li标签显示在页面上

## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中的缩略图功能
1. 使用插件vue-preview这个缩略图插件
2. 获取到所有的图片列表，然后使用v-for指令渲染数据
3. 注意，img标签上的class不能去掉
4. 注意，每个图片数据对象中，必须有w和h属性

## 尝试在手机上去进行项目的预览和测试
1. 保证手机可以正常运行
2. 保证手机和开发项目的电脑处于同一个wifi环境中，也就是说手机可以访问到电脑的IP
3. 打开自己的项目中pack.json文件，在dev脚本中，添加一个--host指令，把当前电脑的wifi IP地址，设置为--host的指令值,例如--host 192.168.1.103
 + 如何查看自己的电脑所处的wifi的IP呢，在cmd终端中运行'ipconfig'，查看无线网的ip地址