import data from "./resources/italian.json";

export interface WordGetter{
    nextWord: () => string[];
}

export class ItalianWordGetter implements WordGetter{

    nextWord(): string[]{
        let randInt:number = Math.round(Math.random() * 1000);
        return [data[randInt].Italian, data[randInt]["in English"]];
    }
}

export class EmptyWordGetter implements WordGetter{

    nextWord(): string[]{
        return ['', ''];
    }
}

