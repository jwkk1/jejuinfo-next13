import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    
    if(req.method == 'POST'){
        const db = (await connectDB).db("jeju");
        let item = await db.collection(req.body.email + 'schedule').findOne({title : req.body.title});
        if(item === null){
            let result = await db.collection(req.body.email + 'schedule').insertOne(req.body);
            let schedule = await db.collection(req.body.email + 'schedule').find().toArray();
            res.status(200).json({status:200, message : 'addSchedule', data: schedule});
        } else {
            res.status(200).json({status:200, message : 'duplicateSchedule'});
        }
    }
}