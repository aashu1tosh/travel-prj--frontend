import { IBase } from './base.interface';
import { PaginationInterface } from './global.interface';

export interface IContactFormData extends IBase {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
}

export interface IFetchContactForm {
    data: IContactFormData[];
    pagination: PaginationInterface;
}
