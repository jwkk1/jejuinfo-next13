import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if(req.method == 'POST'){
        req.body.item.id = uuidv4();
        const db = (await connectDB).db("jeju");
        const filter = { _id : new ObjectId(req.body.id)}; 
        const update = { $push: { 'plan.addList':  req.body.item  } }; 
      
        let result = await db.collection(req.body.email+'schedule').updateOne(filter, update);
        res.status(200).json({status: 200, data: result});
    }
}