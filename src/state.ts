import { atom } from "recoil";
import { UserWithoutIdDto, defaultLoginUser } from "./dtos/user.dto";

export const userState = atom<UserWithoutIdDto>({
    key: 'userState',
    default: defaultLoginUser
})