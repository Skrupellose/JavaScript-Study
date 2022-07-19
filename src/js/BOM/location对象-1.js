/**
 * location对象属于既是window的属性也是document的属性，即window.location = document.location
 * location对象不仅保存着当前加载文档的信息，也保存着把URL解析为离散片段后能够通过属性访问的信息。
 * let URL = "http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents"
 * 
 * location.hash        #contents           URL散列值
 * location.host        www.wrox.com:80     服务器名称与端口号
 * location.hostname    www.wrox.com        服务器名
 * location.href        http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents      当前完整的URL
 * location.pathname    /WileyCDA/          URL中的路径和文件名
 * location.port        80                  URL中的端口号
 * location.protocol    http                URL中的协议
 * location.search      ?q=javascript       URL中的查询字符串，以问号开头
 * location.username    foouser             URL中域名前指定的用户名
 * location.password    barpassword         URL中域名前指定的密码
 * location.origin      http://www.wrox.com URL的源地址
 */

/**
 * 查询字符串，location.search属性能够返回完整的查询字符串，但没有办法逐个访问每个查询参数，所以需要自己封装方法
 */

let getQueryStringArgs = (string) => {
    let qs = (string.length > 0 ? string.substring(1) : ""),
        args = {}
    for (let item of qs.split("&").map(kv => kv.split("="))) {
        let k = decodeURIComponent(item[0]),
            v = decodeURIComponent(item[1])
        if (k.length) {
            args[k] = v
        }
    }
    return args
}


let result = getQueryStringArgs("?q=javascript")
// console.log(result) // { q: 'javascript' }

/**
 * URLSearchParams提供了一组标准API方法，通过它们可以检查和修改查询字符串
 * 给URLSearchParams构造函数传入一个查询字符串就可以创建一个实例。这个实例上暴露了get() set() 和 delete()等方法
 */

let qs = "?q=js&num=10"
let searchParams = new URLSearchParams(qs)
for (let item of searchParams) {
    console.log(item)
    //[ 'q', 'js' ]
    // [ 'num', '10' ]
}

/**
 * 常用修改浏览器地址的方法有三个：
 * 1.window.location()
 * 2.location.href()
 * 3.location.assign()
 * 1、2方法其实都是调用的方法3实现的地址切换
 * 这些方法修改URL之后还会再浏览器历史记录中增加对应的历史记录，如果只想切换对应的URL但是不增加记录可以使用location.replace()
 * 还有单纯进行页面重载的location.reload()方法，参数为布尔值，若强制从服务器加载需要传值true，不然可能会从缓存中加载页面
 * 另外，reload()后的代码可能执行也可能不执行，这取决于网络延迟和系统资源等因素，因此reload()最好作为最后一行语句
 */


