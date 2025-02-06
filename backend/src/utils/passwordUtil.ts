import {hashSync,compareSync} from 'bcrypt-edge'

export const hashPassword = (password:string)=>{
    return hashSync(password,10);
}

export const comparePassword = (password:string,hash:string)=>{
    return compareSync(password,hash);
}