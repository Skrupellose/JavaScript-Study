/**
 * window.open()打开一个窗口，并且返回这个窗口的引用
 * 第一个参数是要打开的网址
 * 第二个参数是目标窗口的属性名，如果不存在则新建窗口
 * 后面参数是用来配置浏览器的特性，若只穿前两个参数则以默认配置打开浏览器窗口
 * 参数配置：fullscreen height left location Menubar resizeable scrollbars status toolbar top width
 * 参数和属性通过=链接，每个属性用","隔开
 */

let baiduWindow = window.open("http://www.baidu.com/",
    "baiduWindow",
    "height=400,width=400"
)


if (baiduWindow == null) {
    alert("popup is closed") // 检查浏览器是否屏蔽弹窗
}

/**
 * js在浏览器中是单线程执行的，但允许定时器指定在某个时间之后或者每隔一段时间都执行相应的代码。
 * setTimeout方法接收两个参数，第一个是执行的代码，第二个是等待的时间，作用是等待指定时间后执行对应代码
 */

let timer1 = setTimeout(() => alert("timeout"), 2000)
clearTimeout(timer1) // 在超时任务还未执行的时候，可以清除该任务，若任务已经执行则该方法无效


/**
 * setInterval方法参数与setTimeout相同，只不过是每隔一段时间就执行一次，同样的支持清除任务
 */
let timer2 = setInterval(() => alert("handle task"), 3000)
clearInterval(timer2)


/**
 * 系统对话框
 */

alert("弹出框")

let result = confirm("确认框")
if (result) {
    alert("yes")
} else {
    alert("no")
}

let msg = prompt("提示框")
if (msg !== null) {
    alert(msg)
}