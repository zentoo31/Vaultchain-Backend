import { UpdateInfoDTO } from "./dto/update-info.dto";
import { PrismaClient } from "../../generated/prisma";

export class ProfileInfoService{
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getProfileInfo(userId: string){
        const profile = await this.prisma.profile.findUnique({
            where: { userId: userId },
        });

        if (!profile) {
            throw new Error("Profile not found");
        }

        return profile;
    }


    async updateProfileInfo(userId: string, updateInfoDto: UpdateInfoDTO) {
        const { bio, avatarUrl } = updateInfoDto;

        const updatedProfile = await this.prisma.profile.update({
            where: { userId },
            data: {
                bio,
                avatarUrl,
            },
        });

        return updatedProfile;
    }
}