module.exports = (err, ctx) => {
    let status = 500
    switch (err.code) {
        case '10001':
            status = 400 // 400  （表示：请求参数有误）
            break
        case '10002':
            status = 409 // 409 Conflict  （表示：由于和被请求的资源的当前状态之间存在冲突，请求无法完成）
            break
        default:
            status = 500
    }
    ctx.status = status
    ctx.body = err
}