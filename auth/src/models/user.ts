import mongoose , {Document ,Schema ,Model, SaveOptions} from "mongoose";

import { Password } from "../services/password";

// An interface that describes the properties that are requried to create a new User


export interface UserAttrs   {
  email : string ;
  password : string; 
  isActive? : boolean ; 
}

// an interface that describe the User model has 
interface UserModel extends mongoose.Model<UserDoc>{
  build (attrs : UserAttrs): UserDoc; 
 }

 // an interface that describes the properties that a User Document has

interface  UserDoc extends Document{
  email : string ; 
  password : string; 
  isActive : boolean ; 
  createdAt : Date  ;
  updatedAt : Date ;
}



const userSchema = new Schema({
  email : {
    type : String ,
    required: true , 
    trim : true
  } , 
  password : {
    type : String , 
    required : true , 
    select :false 
  }  ,
  isActive:{
    type : Boolean , 
    default : true
  }
} , {
  timestamps : true, // adds createdAt and UpdatedAt , 
  toJSON : {
    transform (doc , ret){
      // remap the _id to id
      ret.id = ret._id ; 
      delete ret._id; 
      delete ret.password ; 
      delete ret.__v; 
      return ret ;
    }
  }
});

userSchema.statics.build = (attrs : UserAttrs)=>{
  return new User(attrs);
}
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  try {
    this.password = await Password.toHash(this.password);
  } catch (error) {
    throw error;
  }
});
const User = mongoose.model<UserDoc,UserModel>("User" , userSchema);

export {User };