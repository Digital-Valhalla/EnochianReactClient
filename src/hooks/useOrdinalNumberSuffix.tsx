export const useOrdinalNumberSuffix = () => {

    const english_ordinal_rules = new Intl.PluralRules("en", {type: "ordinal"})

    type suffixType = {
        [index: string]: string,
        one: string,
        two: string,
        few: string,
        other: string
    }
    const suffixes: suffixType = {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th"
    }

    const ordinal = (number: number): string => {
        const category = english_ordinal_rules.select(number);
        const suffix = suffixes[category];
        return (number + suffix);
    }

    return ordinal 
}