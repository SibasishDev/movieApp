import bcrypt, { hash } from "bcrypt";

class BcryptService {

    saltedRounds : number;
    constructor() {
        this.saltedRounds = 10;
    }
    encryptPassword = (password :string) => {
        return new Promise((resolve,reject) => {
            bcrypt.hash(password,this.saltedRounds).then(hash => resolve(hash)).catch(err => reject(err));
        })
    }

    decryptPassword = (password : string, hashPassword : string) => {
      return  bcrypt.compare(password,hashPassword);
    }
}

export const bcryptService = new BcryptService();