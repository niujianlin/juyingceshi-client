
function wbsockSend(infotype, info) {
    let obj = {
        token: "",
        infotype: infotype,
        info: info
    }
    return obj
}

function register() {
    return wbsockSend("register", "")
}
function damopr(cmd) {
    return wbsockSend("damopr", cmd)
}
function mbopr(cmd) {
    return wbsockSend("mbopr", cmd)
}
function loraopr(cmd) {
    return wbsockSend("loraopr", cmd)
}
function damread(unid) {
    return wbsockSend("damread", { unid: unid })
}
function damreadall() {
    return wbsockSend("damreadall", "")
}
function sync() {
    return wbsockSend("sync", "")
}
function loraautocfg(cmd) {
    return wbsockSend("loraopr", cmd)
}

export {register,damopr,mbopr,loraopr,damread,damreadall,sync,loraautocfg} 
