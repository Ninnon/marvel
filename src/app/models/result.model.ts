import { ICharacter } from "./character.model";

export interface IResult {
    attributionHTML: string;
    attributionText: string;
    code: number;
    copyright: string;
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: ICharacter[];
    },
    etag: string;
    status: string;
}