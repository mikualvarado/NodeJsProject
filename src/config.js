import dotenv from 'dotenv';
dotenv.config();
export const SECRET_TOKEN = process.env.SECRET_TOKEN || 'secret';
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 3000;

//console.log(process.env.MONGODB_URI);
//console.log(PORT);