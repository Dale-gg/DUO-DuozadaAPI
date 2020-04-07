import bcrypt from 'bcrypt'

export default function passEncode(password: string, saltRounds: number) {  
    var hash = bcrypt.hashSync(password, saltRounds);

    return hash; 
};