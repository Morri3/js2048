const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    let data = event.data;
    data["_openid"] = cloud.getWXContext().OPENID;
    data["people"] = [cloud.getWXContext().OPENID];

    return await db.collection("hold")
        .add({data:data})
}