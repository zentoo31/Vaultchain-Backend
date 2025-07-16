import { validate } from "class-validator";
import { PrismaClient } from "../../generated/prisma";
import { RegisterDTO } from "./dto/register.dto";
import bcrypt from "bcrypt";

export class AuthService {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }
    
    async registerUser(registerDto: RegisterDTO) {
        const errors = await validate(registerDto);
        if (errors.length > 0) {
            throw new Error("Validation failed!");
        }

        const existingUser = await this.findUserByEmail(registerDto.email);
        if(existingUser) throw new Error("User already exists with this email!");

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
        const newUser =  await this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
            },
        });

        await this.prisma.profile.create({
            data: {
                userId: newUser.id
            }
        });
        
        return newUser;
    }
    
    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }    
}