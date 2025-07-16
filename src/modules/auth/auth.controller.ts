import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { RegisterDTO } from "./dto/register.dto";

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
}
