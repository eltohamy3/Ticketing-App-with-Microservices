import mongoose , {Document ,Schema ,Model} from "mongoose";


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
  timestamps : true // adds createdAt and UpdatedAt
});
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.build = (attrs : UserAttrs)=>{
  return new User(attrs);
}


const User = mongoose.model<UserDoc,UserModel>("User" , userSchema);

export {User };