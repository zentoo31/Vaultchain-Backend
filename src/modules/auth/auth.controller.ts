import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../config/constants";


export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response) => {
        const registerDto = new RegisterDTO();
        registerDto.email = req.body.email;
        registerDto.password = req.body.password;

        await this.authService.registerUser(registerDto);
        res.status(201).json({ message: "User registered successfully" });
    }

    login = async (req: Request, res: Response) => {
        const loginDto = new LoginDTO();
        loginDto.email = req.body.email;
        loginDto.password = req.body.password;

        const user = await this.authService.loginUser(loginDto);

        const token = jwt.sign(
            { id: user.id },
            JWT_SECRET as Secret,
            {expiresIn: '1h'}
        );
        
        res
            .cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000
            })
            .status(200)
            .json({
                message: "Login successful"
        });
    }

    logout = async (req: Request, res: Response) => {
        res
            .clearCookie('token')
            .status(200)
            .json({ message: "Logged out successfully" });
    }
}
