let container = document.createElement("div")
let btn = document.createElement("button")
let fn = (element, e) => {
    alert(`${element} emit!!! event type: ${e.type}`)
    e.stopPropagation()
    e.preventDefault()

}
container.setAttribute("id", "container")
btn.setAttribute("id", "submit")
btn.textContent = "点一点"
btn.addEventListener("click", fn.bind(fn, "btn"))
container.addEventListener("click", fn.bind(fn, "div"))
document.body.appendChild(container)
container.appendChild(btn)

/**
 * 取消默认事件使用的是prevenDefault()
 * 阻止事件冒泡使用的是stopPropagation()
 */


/**
 * 事件类型：
 * 
 */