
import { create } from "zustand";



interface userInfoType {
    id: number;
    email: string;
    email_verified_at: string | null;
    first_name: string;
    last_name: string;
    username: string;
    profile_picture: string | null;
    is_vehicle_owner: boolean | null;
}


type userSaveInfoType = {
    userInfo: userInfoType | null,
    saveUserInfo: (userInfoObj: userInfoType) => void
}


export const useSaveUserInfo = create<userSaveInfoType>()((set) => ({
    userInfo: null,
    saveUserInfo: (userInfoObj: userInfoType) => {
        set(() => ({
            userInfo: userInfoObj,
        }));
    },
}));