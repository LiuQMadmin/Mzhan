// 结构出来一些方法
const {src,dest,series,parallel,watch}=require("gulp");
// 服务器
const gulpwebserver=require("gulp-webserver");
// 打包工具
const webpackstream=require("webpack-stream");
// 引进来路径解析的模块
const path=  require("path");
// 安装编译sass的文件
const sass=require("gulp-sass");
const proxy=require("http-proxy-middleware");


// 定义一个服务器
function webserver(){
    return src("./dist")
    .pipe(gulpwebserver({
        host:"localhost",
        port:9999,
        livereload: true,
        middleware:[
          proxy("/api",{
            target:"http://www.haohuow.com",
            // 只要请求的同源就不用加这个http://www.haohuow.com这就算同源
            changeOrigin:true,
            // 这个是去掉/index.php，因为访问的那个网址里面这么这些数据
            pathRewrite:{
              "^/api":"",
            }
          })
        ]
    }))
}
// 编译并且拷贝js文件
function packjs(){
    return src("./src/js/**/*")
    .pipe(webpackstream({
        // 在开发环境里面配置webpackstream
        mode:"development",
        // 入口 写一个对象
        entry:{
          // 这里写文件的入口
            app:"./src/js/app.js",
        },
        output:{
            filename:"[name].js",  //读取app后面的名字
            // 这里时输出的路径
            path:path.resolve(__dirname,"./dist"),  //可以完成这两个字符串的拼接，如果时../还可以后退一个文件夹
        },
        // 编译js的代码
        module: {//将ES6及ES8转成ES5的代码
        rules:[
            {
                // 编译什么类型的文件
              test: /\.js$/,
            //   排除什么什么文件
              exclude: /node_modules/,
            //   使用什么
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                //   这个可以把promise翻译称游览器可以识别的语言
                  plugins: ['@babel/plugin-transform-runtime']
                }
              }
            },
            // 这一段是读取摸板字符串的文件
            {
                test: /\.html$/,
                loader: 'string-loader',
            }
          ]
        }
    }))
    .pipe(dest("./dist/js"))
}
// 拷贝html
function copyhtml(){
    return src("./src/*.html")
    .pipe(dest("./dist"))
}
// 拷贝libs里面的文件
function copylibs(){
    return src("./src/libs/**/*")
    .pipe(dest("./dist/libs"))
}
// 拷贝images里面的文件
function copyimages(){
    return src("./src/images/**/*")
    .pipe(dest("./dist/images"))
  }
  // 拷贝图标文件
function copyicons(){
    return src("./src/icons/**/*")
    .pipe(dest("./dist/icons"))
  }
//   拷贝摸板文件
function copyviews(){
    return src("./src/views/**/*")
    .pipe(dest("./dist/views"))
  }
  // 拷贝样式文件.scss后缀名字
function packcss(){
    return src("./src/styles/app.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/styles'));
}
// 添加这些事件的监听
function watcher(){
    watch("./src/views/**/*",series(copyviews))
    watch("./src/icons/**/*",series(copyicons))
    watch("./src/images/**/*",series(copyimages))
    watch("./src/libs/**/*",series(copylibs))
    watch("./src/**/*",series(copyhtml))
    watch("./src/styles/**/*",series(packcss))
    // 排除不执行的文件
    watch(["./src/**/*","!src/libs/**/*","!src/styles/**/*","!src/html/**/*","!src/images/**/*"],series(packjs))
  }

// 暴露出去一个公有的任务，可以用gulp webserver进行访问
exports.webserver=series(webserver)
exports.packjs=series(packjs)

// 这里的series是串行，parallel是并行，执行gulp就可以执行这里的所有任务parallel(packjs,packcss),parallel(copyhtml,copylibs),
exports.default=series(parallel(packjs,packcss,copyimages),parallel(copyhtml,copylibs),webserver,watcher);