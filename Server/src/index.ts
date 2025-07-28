import express from "express"
import { userModel } from "./models/userModel";
import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import { Auth } from "./middleware/auth.js";
import { contentModel, linkModel } from "./models/contentModel";
import { Random } from "./random";
import cors from "cors"
const JWT_SECRET="100Rupees"


mongoose.connect("mongodb+srv://amchinnavengababu:xebuMHvrUlwlV93Z@cluster0.qotcnag.mongodb.net/brainly")
const app=express();
app.use(express.json());
app.use(cors())
app.post("/Signup",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.create({
        email,
        password
    })
    res.json({user,success:true})

})
app.post("/Signin",async(req,res)=>{
    try{
        const {email,password}=req.body;
    const user=await userModel.findOne({
        email,
        password
    })
    //@ts-ignore
    let token
    if(user){
        token=jwt.sign({id:user._id},JWT_SECRET);
    }
    res.json({user,token})
    }
    catch(error){
         res.status(403).json({
            message: "Incorrrect credentials"
        })
    }


})
app.post("/Create",Auth,async(req,res)=>{
    const {link,title}=req.body;
    //@ts-ignore
    const userId=req.userId
    const content=await contentModel.create({
        link,
        title,
        userId,
        tags:[]
        
    })
    res.json({content,success:true})

})
app.get("/content",Auth,async(req,res)=>{
     //@ts-ignore
    const userId=req.userId;
    const contents=await contentModel.find({userId}).populate("userId","email");
    res.json(contents)
})
app.get("/content/youtube",Auth,async(req,res)=>{
     //@ts-ignore
    const userId=req.userId;
    const title="youtube"
    const contents=await contentModel.find({title}).populate("userId","email");
    res.json(contents)
})
app.delete("/content/:id",Auth,async(req,res)=>{
    //@ts-ignore
    const id=req.params.id;
      //@ts-ignore
     const userId=req.userId;
    const contents=await contentModel.deleteMany({userId,_id:id});
    res.json(contents)
})
app.post("/share",Auth, async (req,res)=>{
       //@ts-ignore
    const userId=req.userId;
    const {share}=req.body;
     
    if(share){
        const hash=Random(1000);
        const link=await linkModel.create({
            hash,
            userId
        })
        res.json({hash});
    }
    else{
        await linkModel.deleteOne({ userId })
        res.json({message:"no link sharable"})
    }


})
app.get("/share/:hash", async(req,res)=>{
    const hash=req.params.hash;
    const link=await linkModel.findOne({hash});
    if(link){
        const user=await userModel.find({_id:link.userId})
         const content = await contentModel.find({ userId: link.userId })
          res.json({user,content})
    }
    res.json({message:"no user with links"})
   
    
})

// app.post("/api/v1/brain/share", Auth, async (req, res) => {
//     const { share } = req.body;
//     if (share) {
//         // Check if a link already exists for the user.
//         //@ts-ignore
//         const existingLink = await linkModel.findOne({ userId: req.userId });
//         if (existingLink) {
//             res.json({ hash: existingLink.hash }); // Send existing hash if found.
//             return;
//         }

//         // Generate a new hash for the shareable link.
//         const hash = Random(10);
//         //@ts-ignore
//         await linkModel.create({ userId: req.userId, hash });
//         res.json({ hash }); // Send new hash in the response.
//     } else {
//         // Remove the shareable link if share is false.
//         //@ts-ignore
//         await linkModel.deleteOne({ userId: req.userId });
//         res.json({ message: "Removed link" }); // Send success response.
//     }
// });

// // Route 7: Get Shared Content
// app.get("/api/v1/brain/:shareLink", async (req, res) => {
//     const hash = req.params.shareLink;

//     // Find the link using the provided hash.
//     const link = await linkModel.findOne({ hash });
//     if (!link) {
//         res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
//         return;
//     }

//     // Fetch content and user details for the shareable link.
//     const content = await contentModel.find({ userId: link.userId });
//     const user = await userModel.findOne({ _id: link.userId });

//     if (!user) {
//         res.status(404).json({ message: "User not found" }); // Handle missing user case.
//         return;
//     }

//     res.json({
//         username: user.email,
//         content
//     }); // Send user and content details in response.
// });
app.listen(3000);