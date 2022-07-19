/**
 * DOM的节点类型共有12种，由定义在Node类型上的12个数值常量表示：
 * 可以比较对应的常量来确定类型
 */

// if (someNode.nodeType == Node.ELEMENT_NODE) {
//     console.log("元素节点")
// } 


/**
 * document类型
 * document类型是Javascript种表示文档节点的类型，在浏览器中，文档对象document是HTMLDocument的实例
 * 表示整个HTML页面。document是window对象的属性，因此是一个全局对象。document类型的节点有以下特征
 * nodeType等于9
 * nodeName值为"#document"
 * nodeValue值为null
 * parentNode值为null
 * ownerDocument值为null
 */

/**
 * 文档子节点：document.documentElement
 * 文档body节点：document.body
 * 文档title节点：document.title
 * 文档URL三大属性：document.URL document.domain document.referer
 */

/**
 * 使用DOM一般是为了获取某个或某组元素的引用，然后再执行某些操作
 * document对象上就暴露了一些方法，可以实现这些操作:
 * document.getElementById、document.getElementByTagName、document.getElementByName
 */

/**
 * element类型
 * element类型的特征：
 * nodeType等于1
 * nodeName的值等于元素的标签名
 * nodeValue的值为null
 * parentNode值为Document或Element对象
 */

/**
 * 1.可以通过nodeName和tagName属性获得元素的标签名
 * 2.HTMLElement继承Element并增加了一些属性：
 * id 元素的唯一标识符
 * title 包含元素的额外信息
 * lang 元素内容的语言代码
 * dir 语言的书写方向
 * className 相当于class属性
 */

/**
 * 元素类型对于属性的操作方法有三个
 * 1.getAttribute()
 * 2.setAttribute()
 * 3.removeAttribute()
 */

/**
 * text类型
 * text类型的特征
 * nodeType等于3
 * nodeName的值等于"#text"
 * nodeValue的值为节点中包含的文本
 * parentNode值为Element对象
 */

/**
 * 创建文本节点
 * document.createTextNode("hello world")
 */

/**
 * Comment类型
 * DOM中的注释通过Comment类型表示
 * nodeType等于8
 * nodeName值为"#comment"
 * nodeValue值为注释的内容
 * parentNode值为Document或者Element对象
 * 不支持子节点
 */
