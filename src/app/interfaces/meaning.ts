export interface IMeaning {
    partOfSpeech?: string;
    definitions: Partial<{
        definition?: string;
        synonyms?: string[];
        antonyms?: string[];
        example?: string[];
    }[]> | undefined;
    synonyms?: string[];
    antonyms?: string[];
}