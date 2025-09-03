import multer from "multer";
import crypto from "crypto";
import path from "path";
import { PrismaClient } from "@prisma/client/extension";

export class UploadService{
    private prisma: PrismaClient;
    
    constructor(){
        this.prisma = new PrismaClient();
    }
}