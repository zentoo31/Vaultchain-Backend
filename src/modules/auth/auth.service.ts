import { validate } from "class-validator";
import { PrismaClient } from "../../generated/prisma";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import bcrypt from "bcrypt";
import { HttpError } from "../../utils/http.errors";
import { WalletGenerator } from "../../utils/walletGenerator";

export class AuthService {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }
    
    async registerUser(registerDto: RegisterDTO) {
        const errors = await validate(registerDto);
        if (errors.length > 0) {
            throw new HttpError(400,"Validation failed!");
        }

        const existingUser = await this.findUserByEmail(registerDto.email);
        if(existingUser) throw new HttpError(400,"User already exists with this email!");

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const walletGenerator = new WalletGenerator();
        const wallet = await walletGenerator.generateWalletPerUser();
    
        const newUser =  await this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword
            },
        });

        await this.prisma.profile.create({
            data: {
                userId: newUser.id
            }
        });

        await this.prisma.wallet.create({
            data: {
                userId: newUser.id,
                bitcoinAddress: wallet.address,
                privateKey: wallet.privateKey,
                publicKey: wallet.publicKey,
                mnemonicPhrase: wallet.mnemonic
            }
        })
        
        return newUser;
    }

    async loginUser(loginDto: LoginDTO){
        const errors = await validate(loginDto);
        if (errors.length > 0) {
            throw new HttpError(400,"Validation failed!");
        }

        const user = await this.findUserByEmail(loginDto.email);
        if (!user) {
            throw new HttpError(401,"User not found!");
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new HttpError(401,"Invalid password!");
        }

        return user;
    }

    
    async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }    
}