const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

    let res = await db.collection("hold")
        .where({
            _id: event.hold_id,
            people: cloud.getWXContext().OPENID,
        })
        .get()
    // console.log("here", res.data.length);
    // if (res.data != undefined) console.log("1", res);
    if (res.data.length == 0) {
        // console.log("1", res);
        await db.collection("hold")
            .doc(event.hold_id)
            .update({
                data: {
                    people: _.push([cloud.getWXContext().OPENID]),
                }
            })
    }
}