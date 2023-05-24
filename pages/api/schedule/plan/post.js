import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method == 'POST'){
        const db = (await connectDB).db("jeju");
        const filter = { _id : new ObjectId(req.body.id)}; 
        const update = { $set: { "plan" : req.body.plan  } } 
      
        let result = await db.collection(req.body.email+'schedule').updateOne(filter, update);
        res.status(200).json({status: 200, data: result});
    }
}