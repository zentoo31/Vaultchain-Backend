import { UpdateInfoDTO } from "./dto/update-info.dto";
import { PrismaClient } from "../../generated/prisma";
import { HttpError } from "../../utils/http.errors";

export class ProfileInfoService{
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getProfileInfo(userId: string){
        const profile = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                email: true,
                profile: {
                    select: {
                        bio: true,
                        avatarUrl: true,
                    },
                },
                wallet: {
                    select: {
                        bitcoinAddress: true
                    }
                }
            },
        });

        if (!profile) {
            throw new HttpError(404,"Profile not found");
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