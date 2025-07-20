import { ProfileInfoService } from "./profile-info.service";
import { UpdateInfoDTO } from "./dto/update-info.dto";
import { Request, Response } from "express";

export class ProfileInfoController {
    private profileInfoService: ProfileInfoService;

    constructor() {
        this.profileInfoService = new ProfileInfoService();
    }

    getProfile = async (req: Request, res: Response) => {
        let userId: string = "";
        if (typeof req.user === "object" && "id" in req.user) {
            userId = req.user.id;
        }

        try {
            const profile = await this.profileInfoService.getProfileInfo(userId);
            res.status(200).json(profile);
        } catch (error) {
            res.status(404).json({ message: error });
        }
    }

    updateProfile = async (req: Request, res: Response) => {
        
    }
}