import { InferSchemaType, Schema,model } from "mongoose";

const todoSchema = new Schema({
    title : {type : String , required : true},
    description : { type:String,required:true},
    completed:{type:Boolean,default:false},
} ,{timestamps : true});


type toDo = InferSchemaType<typeof todoSchema>;

export default model<toDo>("toDO",todoSchema);