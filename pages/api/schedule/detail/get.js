import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method == 'POST'){
        console.log(req)
        const db = (await connectDB).db("jeju");
        let detail = await db.collection(req.body.email+'schedule').findOne({ _id : new ObjectId(req.body.id) });
        res.status(200).json({status: 200, data: detail});
    }
}