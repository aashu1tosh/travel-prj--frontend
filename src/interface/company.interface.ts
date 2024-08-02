import { IBase } from '@interface/base.interface';
import { IMedia } from './media.interface';

export interface ICompany extends IBase {
    description: string;
    slogan: string;
    media: IMedia;
}

export interface ICompanyInfo extends IBase {
    location: string;
    lat: string;
    long: string;
    email: string;
    availableDays: string;
    availableTime: string;
    phoneNumber: string;
    secondaryPhoneNumber: string;
    facebookLink: string;
    instagramLink: string;
    twitterLink: string;
}
