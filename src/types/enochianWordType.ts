import { EnochianLetterType } from "./enochianLetterType"

export type EnochianWordType = {
    "KeyNumber": number,
    "WordNumber": number,
    "Layout3191RowNum": number,
    "Layout3191ColNum": number,
    "Occurances": number,
    "Length": number,
    "IsNumeric": boolean,
    "IsUpper": boolean
    "Enochian": string,
    "Phonetic": string,
    "OriginalEnglish": string,
    "ModernEnglish": string,
    "Char01": string | EnochianLetterType
    "Char02": string | EnochianLetterType
    "Char03": string | EnochianLetterType
    "Char04": string | EnochianLetterType
    "Char05": string | EnochianLetterType
    "Char06": string | EnochianLetterType
    "Char07": string | EnochianLetterType
    "Char08": string | EnochianLetterType
    "Char09": string | EnochianLetterType
    "Char10": string | EnochianLetterType
    "Char11": string | EnochianLetterType
    "Char12": string | EnochianLetterType
    "Gematria": number
}