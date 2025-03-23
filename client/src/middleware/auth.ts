import { Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "6d38a9bc0703858d54d35dc7aa58ae13a5b0d0e2b39ef1498753f6aae5aa6d37392231f660a200fa78491669ebb8da10dfef0b31aaae13b861cc66098098b0c52f7f4ebef59b7acba4b9bcaa39eefba665abe1a424131734cacd90bd348e25c7a8669362e5a466ec2f108a1d03e88a5a1895f73e4a2f8abca9d98bb383f8869a8406551ac385a3a7fbc5a7017fccb414270dee8049cbc6336afdd418023551a65ceed280917655f8ef6d6660b23510cae858932314b373b0abdc16833d85bcbce5737730f320db21c817333e4fcd079df3d33de5fe4ea5a4ea879e0a8f739b3c8d8a22d455d168ac9383ed78e10b3760eebb134cd604bb707aa58d1723fce563";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export const authenticate = (req: Request): AuthUser | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null; 
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as AuthUser;
    return decoded; 
  } catch (error) {
    console.error("Invalid token", error);
    return null; 
  }
};
