// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const arr = ["8:00-9:35", "9:50-11:25", "13:30-15:05", "15:20-16:55", "18:30-21:00"]

// 云函数入口函数
exports.main = async (event, context) => {
    date = new Date();
    let hour = date.getHours();
    hour = (hour + 8) % 24
    console.log("hour", hour);
    let minute = date.getMinutes();
    let qry = {}
    let s1 = hour.toString();
    if (minute < 10) s1 += ":0" + minute.toString();
    else s1 += ":" + minute.toString();

    console.log("s1", s1);

    if (s1 >= "21:00") qry.time = "18:30-21:00";
    else if (s1 >= "16:55") qry.time = "15:20-16:55";
    else if (s1 >= "15:05") qry.time = "13:30-15:05";
    else if (s1 >= "11:25") qry.time = "9:50-11:25";
    else if (s1 >= "9:35") qry.time = "8:00-9:35";

    console.log("qry.time", qry.time);

    let res = await db.collection("ground")
        .where({
            time: _.lte(qry.time),
            is: true,
        })
        .get()

    await db.collection("ground")
        .where({
            time: _.lte(qry.time),
            is: true,
        })
        .update({
            data: {
                is: false
            }
        })

    let arr = res.data;
    for (let i = 0; i < arr.length; i++) {
        await db.collection("reserve")
            .where({
                ground_id: arr[i],
            })
            .update({
                data: {
                    is: 1
                }
            })
    }
}