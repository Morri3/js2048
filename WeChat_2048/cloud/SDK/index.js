// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    let qry = event.qry == undefined ? {} : event.qry;
    let data = event.data == undefined ? {} : event.data;
    let opt = event.opt;
    let collection = event.collection;

    if (opt == "insert") {
        data["_openid"] = cloud.getWXContext().OPENID;
        return await db.collection(collection)
            .add({
                data: data
            })
    } else if (opt == "delete") {
        return await db.collection(collection)
            .where(qry)
            .remove()
    } else if (opt == "update") {
        return await db.collection(collection)
            .where(qry)
            .update({
                data: data
            })
    } else if (opt == "query") {
        return await db.collection(collection)
            .where(qry)
            .orderBy("create_time", "desc")
            .get()
    }
}