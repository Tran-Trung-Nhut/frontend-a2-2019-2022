import { atom } from "recoil";
import { UserWithoutIdDto } from "./dtos/user.dto";

export const userState = atom<UserWithoutIdDto>({
    key: 'userState',
    default: {
        name: '',
        phoneNumber: ''
    }
})