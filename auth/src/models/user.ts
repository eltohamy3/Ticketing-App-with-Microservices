import mongoose , {Document ,Schema ,Model} from "mongoose";


// An interface that describes the properties that are requried to create a new User



export interface UserAttrs extends Document  {
  email : string ;
  password : string; 
  isActive? : boolean ; 
  createdAt? :Date ; 
  updatedAt? : Date;
}
const userSchema = new Schema<UserAttrs>({
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
  timestamps : true // adds createdAt and UpdatedAt
});
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};



 const User: Model<UserAttrs> = mongoose.model<UserAttrs>("User" , userSchema);


  const buildUser = (attrs: UserAttrs) =>{
  return new User(attrs);}


export {User , buildUser};