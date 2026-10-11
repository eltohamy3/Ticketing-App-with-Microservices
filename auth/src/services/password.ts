

import bcrypt from 'bcrypt'


export class Password{
  static async toHash(password:string){
    const saltOrRounds = 10 ;
    return await bcrypt.hash(password , saltOrRounds);
  }
  static async compare(suppliedPassword: string, storedPassword: string) {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}
