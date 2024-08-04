import { IBase } from './base.interface';
import { PaginationInterface } from './global.interface';
import { IMedia } from './media.interface';

export interface ITestimonial extends IBase {
    fullName: string;
    testimonial: string;
    rating: number;
    reviewerLocation: string;
    media: IMedia | null;
}

export interface ITestimonialResponse extends IBase {
    data: ITestimonial[];
    total: PaginationInterface;
}

export interface ITestimonialReq extends IBase {
    fullName: string;
    testimonial: string;
    rating: string;
    reviewerLocation: string;
    media?: string;
}

export interface ITestimonialPayload extends IBase {
    fullName: string;
    testimonial: string;
    rating: number;
    reviewerLocation: string;
    media: string;
}
