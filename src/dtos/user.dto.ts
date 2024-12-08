export interface UserWithoutIdDto{
    name: string,
    phoneNumber: string
}

export interface UserDto{
    id: string,
    name: string,
    phoneNumber: string
}

export interface UserPaidDto{
    id: string,
    name: string,
    phoneNumber: string,
    paid: string
}