import { IMeaning } from "./meaning"
import { IPhonetic } from "./phonetic"

export interface IWord {
    word: string,
    phonetics: Partial<IPhonetic[]>
    meanings: Partial<IMeaning[]>
    license: {
        name: string,
        url: string
    }
    sourceUrls: string[],
}
