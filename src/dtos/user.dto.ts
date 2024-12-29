export interface UserWithoutIdDto{
    name: string,
    phoneNumber: string,
    role: string
}


export interface UserDto{
    id: string,
    name: string,
    phoneNumber: string,
    role: string
}

export interface UserPaidDto{
    id: string,
    name: string,
    phoneNumber: string,
    paid: string
}

export const defaultLoginUser : UserWithoutIdDto = {
    name: '',
    phoneNumber: '',
    role: '',
}