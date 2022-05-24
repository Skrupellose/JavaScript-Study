function cjsFn(){
    console.log('i am from cjs module')
}
const cjsStr = 'i am cjs strings'
module.exports = {
    cjsFn,
    cjsStr
}