import { ProfileInfoService } from "./profile-info.service";
import { UpdateInfoDTO } from "./dto/update-info.dto";
import { Request, Response } from "express";

export class ProfileInfoController {
    private profileInfoService: ProfileInfoService;

    constructor() {
        this.profileInfoService = new ProfileInfoService();
    }

    updateProfile = async (req: Request, res: Response) => {
        
    }
}