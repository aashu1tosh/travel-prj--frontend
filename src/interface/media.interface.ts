import { IBase } from '@interface/base.interface';
import { MediaType } from 'constant/enum';

export interface IMedia extends IBase {
    name: string;
    mimeType: string;
    type: MediaType;
    path: string;
}
