import data from "./resources/italian.json";

export class WordGetter{

    constructor(){
        WordGetter.nextWord();
    }

    static nextWord(): string[]{
        let randInt:number = Math.round(Math.random() * 1000);
        return [data[randInt].Italian, data[randInt]["in English"]]
    }
}