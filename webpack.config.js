const path=require('path')//路径操作，node中用path模块

const webpack=require('webpack')//启用热更新的第二步

const VueLoaderPlugin = require('vue-loader/lib/plugin');// Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,

//导入 在内存中生成HTML页面的插件
//只要是插件，都一定要放到plugins节点中去
//插件的作用：1.自动在内存中根据指定页面生成一个内存的页面 2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin=require('html-webpack-plugin')

//这个配置文件，起始就是一个JS文件，通过Node中的操作模块，向外暴露了一个配置对象
module.exports={
    //在配置文件中，需要手动指定入口和出口
    //入口，表示要使用webpack打包哪个文件
    entry:path.join(__dirname,'./src/main.js'),//join拼接绝对路径，动态可变，__dirname返回当前文件的绝对路径，动态的
    output:{//输出文件的配置
        path:path.join(__dirname,'./dist'),//指定打包好的文件输出到哪个目录中去
        filename:'bundle.js'//指定输出的文件的名称
    },
    // derServer:{//这是配置dev-server命令参数的第二种形式，相对来说麻烦一些
    //     opne:true,//自动打开浏览器
    //     port:3000,//设置启动时候的运行端口
    //     contentBase:'src',//指定托管的根目录
    //     hot:true//启动热更新的第一步
    // },
    plugins:[//配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//启动热更新的第三步，new一个热更新的模块对象
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename:'index.html'//指定生成页面的名称
        }),
        new VueLoaderPlugin() // Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
    ],
    module:{//这个节点，用于配置所有第三方模块加载器，
        rules:[//所有第三方模块的匹配规则
            //要安装包npm install style-loader css-loader -D
            {test:/\.css$/,use:['style-loader','css-loader']},//匹配处理.css文件的第三方loader规则，loader的调用顺序是从右到左
            //要安装包 npm install less-loader -D 和一个依赖项 npm install less --save-dev
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //要安装包 npm i sass-loader -D 和依赖项 npm i node-sass -D0(依赖项如果安装失败使用cnpm试试)
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            //要安装包 npm i url-loader file-loader -D，其中file-loader是内部依赖，不用显示调用
            {test:/\.(jpg|png|gif|bpm|jpeg)/,use:'url-loader?limit=7361&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
            //limit给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64格式字符串

            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件的loader

            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel来转换高级的ES语法

            {test:/\.vue$/,use:'vue-loader'}//处理.vue文件的loader
        ]
    },
    resolve:{
        alias:{//修改vue被导入时候的包的路径
            //"vue$":"vue/dist/vue.js"
        }
    },
    
}


//当在控制台直接输入webpack命令执行的时候
//1.首先，webpack发现，我们并没有通过命令的形式，给他指定入口和出口
//2.webpack就回去项目的根目录中查找一个叫做‘webpack.config.js’的配置文件
//3.当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行文配置文件后， 就得到了配置文件中，导出的配置对象
//4.当webpack拿到配置对象后，就拿到了配置对象中指定的入口和出口，然后进行打包构建