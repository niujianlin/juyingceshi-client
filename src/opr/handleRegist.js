// 需要接收数据

export default ({ret,a})=> {
    function handleRegist (ret) {
        console.log("抽出来了",ret)
        console.log("抽出来了",a)
    }

    return {
        handleRegist
    }
}

