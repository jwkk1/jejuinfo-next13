import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res){

    let db = (await connectDB).db('jeju');
    let user = await db.collection('user_cred').findOne({email : req.body.email});

    if(req.method =='POST'){
        let db = (await connectDB).db('jeju');
        let user = await db.collection('user_cred').findOne({email : req.body.email});
        if(user === null){
            let encryption = await bcrypt.hash(req.body.password, 10);
            req.body.password = encryption 
            await db.collection('user_cred').insertOne(req.body);
            const responseCode = { status : 200, message: 'success' };
            res.status(200).json(responseCode)
        }else {
            const responseCode = { status : 403, message: 'duplicate email' };
            res.status(403).json(responseCode)
        }

    }
}