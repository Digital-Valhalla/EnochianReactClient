import { EnochianLetterType } from "./enochianLetterType"

export type EnochianWatchtowerSquareType = {
    "WatchTowerReferenceNumber": number,
    "RowNumber": number,
    "ColumnNumber": number,
    "Letter": string | EnochianLetterType
    "IsUpper": boolean
    "OriginalTableLetter": string | EnochianLetterType
    "OriginalTableIsUpper": boolean
    "ReformedTableLetter": string | EnochianLetterType
    "ReformedTableIsUpper": boolean
    "GovernorAlignedTableLetter": string | EnochianLetterType
    "GovernorAlignedTableIsUpper": boolean
    "AethyrNumber"?: number,
    "SubOrder"?: number,
    "CharNumber"?: number,
    "NameType"?: number,
    "NameReferenceNumber"?: number,
    "PartOfEarthImposedByGod"?: string
    "GovernorSigilNorth"?: boolean,
    "GovernorSigilNorthEast"?: boolean
    "GovernorSigilEast"?: boolean
    "GovernorSigilSouthEast"?: boolean
    "GovernorSigilSouth"?: boolean
    "GovernorSigilSouthWest"?: boolean
    "GovernorSigilWest"?: boolean
    "GovernorSigilNorthWest"?: boolean
    "GovernorSigilStart"?: boolean
    "GovernorSigilEnd"?: boolean
}