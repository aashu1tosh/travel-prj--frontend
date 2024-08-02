// {
//     "user": {
//         "id": "3440f2ac-64b2-4c19-f01f-02f39c9bd147",
//         "createdAt": "2024-07-25T08:33:54.101Z",
//         "email": "admin@infocare.com",
//         "role": "ADMIN",
//         "details": {
//             "id": "5d5a739f-aeac-4a1b-832c-d6c66ee8aeb4",
//             "createdAt": "2024-07-25T08:33:54.077Z",
//             "firstName": "Information",
//             "middleName": "Care",
//             "lastName": "Pvt. Ltd.",
//             "phoneNumber": "9843818516"
//         }
//     },
//     "tokens": {
//         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NDBmMmFjLTY0YjItNGMxOS1mMDFmLTAyZjM5YzliZDE0NyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMjU3NzE0MCwiZXhwIjoxNzIyODM2MzQwfQ.QBkLgynn8gGntheAilzeV8R5Dh4p0IUm0X3xfZMvZRs",
//         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NDBmMmFjLTY0YjItNGMxOS1mMDFmLTAyZjM5YzliZDE0NyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMjU3NzE0MCwiZXhwIjoxNzIyOTIyNzQwfQ.2H243exJRys9DZNHX4PrUoAEWLVibzG8roZYK7Ugl8g"
//     }

import { ROLE } from "@constant/enum";
import { IBase } from "./base.interface";

export interface IUserDetails extends IBase {
    firstName: string,
    middleName: string,
    lastName: string,
    phoneNumber: string
}

export interface IUser extends IBase {
    email: string,
    role: ROLE
    details: IUserDetails,
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}