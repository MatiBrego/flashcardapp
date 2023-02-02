import itData from "./resources/italian.json";
import spData from "./resources/spanish.json";
import poData from "./resources/portuguese.json";

export interface WordGetter{
    nextWord: () => string[];
}

export class ItalianWordGetter implements WordGetter{

    nextWord(): string[]{
        let randInt:number = Math.round(Math.random() * 1000);
        return [itData[randInt].Italian, itData[randInt]["in English"]];
    }
}

export class EmptyWordGetter implements WordGetter{

    nextWord(): string[]{
        return ['', ''];
    }
}

export class SpanishWordGetter implements WordGetter{
    nextWord(): string[]{
        let randInt:number = Math.round(Math.random() * 1000);
        return [spData[randInt].Spanish, spData[randInt]["in English"]];
    }
}

export class PortugueseWordGetter implements WordGetter{
    nextWord(): string[]{
        let randInt:number = Math.round(Math.random() * 1000);
        return [poData[randInt].Portuguese, poData[randInt]["in English"]];
    }
}

