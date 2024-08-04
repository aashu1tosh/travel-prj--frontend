import { IBase } from './base.interface';
import { PaginationInterface } from './global.interface';
import { IMedia } from './media.interface';

export interface ITestimonial extends IBase {
    fullName: string;
    testimonial: string;
    rating: 1 | 2 | 3 | 4 | 5 | null;
    reviewerLocation: string;
    media: IMedia | null;
}

export interface ITestimonialResponse extends IBase {
    data: ITestimonial[];
    total: PaginationInterface;
}
