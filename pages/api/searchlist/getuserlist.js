import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if(req.method == 'POST'){
        console.log()
        const db = (await connectDB).db("jeju");
        let userList = await db.collection(req.body.email.email).find().toArray();
        res.status(200).json({status:200, data:userList});
    }
}