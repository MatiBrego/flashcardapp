import { WordGetter, ItalianWordGetter, EmptyWordGetter, SpanishWordGetter, PortugueseWordGetter } from "./WordGetter";

/**
 * Map used to get the correct WordGetter object for each language
 */
export const languageSelector: Map<String, WordGetter> = new Map();

languageSelector.set("Select Language", new EmptyWordGetter());
languageSelector.set("Italian", new ItalianWordGetter());
languageSelector.set("Spanish", new SpanishWordGetter());
languageSelector.set("Portuguese", new PortugueseWordGetter());