import {User} from "../models/user.model";
import bcrypt from "bcrypt";

export class Generator{
   static async generatePassword(length:number) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+:;?><,.-=";
        let password = "";
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
    static async newPassDB(password:string,id:string){
       const hasPass:string= await bcrypt.hash(password,3)
       await User.update({password:hasPass},{where:{id:id}})
    }

}
