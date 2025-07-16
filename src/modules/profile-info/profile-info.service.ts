import { UpdateInfoDTO } from "./dto/update-info.dto";
import { Prisma, PrismaClient } from "../../generated/prisma";

export class ProfileInfoService{
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
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