/**
 * navigator对象只要浏览器启用Javascript就一定存在，但不同浏览器支持的属性不尽相同
 */

/**
 * 1.检测插件
 * plugins属性的值是包含插件信息的数组，包含name，description，filename，length几个属性
 */



let hasPlugins = (name) => {
    name = name.toLowerCase()
    for (let plugin of window.navigator.plugins) {
        if (plugin.name.toLocaleLowerCase().indexOf(name) > -1) {
            return true
        } else {
            return false
        }
    }
}
console.log(window.navigator.plugins[0])
console.log(hasPlugins("PDF Viewer"))
console.log(navigator.vendor)