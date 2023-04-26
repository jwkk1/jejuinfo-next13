import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    
    if(req.method == 'POST'){

        const db = (await connectDB).db("jeju");
        let item = await db.collection(req.body.email.email).findOne({contentsid : req.body.item.contentsid});
        console.log(item)
        if(item === null){
            let result = await db.collection(req.body.email.email).insertOne(req.body.item);
            let userList = await db.collection(req.body.email.email).find().toArray();
            res.status(200).json({status:200, message : 'addData', data: userList});
        } else {
            let result = await db.collection(req.body.email.email).deleteOne({contentsid : req.body.item.contentsid});
            let userList = await db.collection(req.body.email.email).find().toArray();
            res.status(200).json({status:200, message : 'deleteData', data: userList});
        }
    }
}