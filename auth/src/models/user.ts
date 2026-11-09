import mongoose , {Document ,Schema ,Model, SaveOptions} from "mongoose";

import { Password } from "../services/password";

// An interface that describes the properties that are requried to create a new User


export interface UserAttrs   {
  email : string ;
  password : string; 
  isActive? : boolean ; 
}


 // an interface that describes the properties that a User Document has
export interface  UserDoc extends Document{
  email : string ; 
  password : string; 
  isActive : boolean ; 
  createdAt : Date  ;
  updatedAt : Date ;
}

// an interface that describe the User model has 
interface UserModel extends mongoose.Model<UserDoc>{
  build (attrs : UserAttrs): UserDoc; 
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
    transform (doc, ret) {
      const user = ret as any;
      user.id = user._id;
      delete user._id;
      delete user.password;
      delete user.__v;
      return user;
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