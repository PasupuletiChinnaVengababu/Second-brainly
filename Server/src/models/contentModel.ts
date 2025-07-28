import mongoose from "mongoose";
const Schema=mongoose.Schema;

const contentSchema=new Schema({
    link:{type:String,required:true},
    title: String,
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],

})
const sharbleSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
})
export const linkModel=mongoose.model("Tag",sharbleSchema)
export const contentModel=mongoose.model("Content",contentSchema)