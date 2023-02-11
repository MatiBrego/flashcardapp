import itData from "../resources/italian.json";
import spData from "../resources/spanish.json";
import poData from "../resources/portuguese.json";

/**
 * Objects meant for obtaining words in other languages should implement 
 * this interface.
 */
export interface WordGetter{

    /**
     * Gets a word (usually random) to be used, and its equivalent in another language. 
     * The correct format is [prompt, answer].
     * 
     * @returns A list of 2 strings, the prompt and the answer.
     */
    nextWord: () => string[];
}

/**
 * This class always returns a list of two empty strings. 
 * Can be useful when nothing should be displayed
 */
export class EmptyWordGetter implements WordGetter{

    nextWord(): string[]{
        return ['', ''];
    }
}

export class ItalianWordGetter implements WordGetter{

    nextWord(): string[]{
        let randInt:number = Math.round(Math.random() * 1000);
        return [itData[randInt].Italian, itData[randInt]["in English"]];
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

