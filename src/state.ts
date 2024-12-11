import { atom } from "recoil";
import { UserWithoutIdDto, defaultLoginUser } from "./dtos/user.dto";

export const userState = atom<UserWithoutIdDto>({
    key: 'userState',
    default: defaultLoginUser
})

export const dropDownHeaderState = atom<boolean>({
    key: 'dropDownHeaderState',
    default: false
})