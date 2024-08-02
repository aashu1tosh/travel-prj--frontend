import { IBase } from '@interface/base.interface';
import { IMedia } from './media.interface';

export interface IHeroData extends IBase {
    page: string;
    slogan: string;
    media: IMedia;
}
