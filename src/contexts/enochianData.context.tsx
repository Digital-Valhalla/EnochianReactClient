import { PropsWithChildren, createContext, useEffect, useState } from "react"
import useFetchStaticJson from "../hooks/useFetchStaticJson"

import * as _ from "lodash"
import { EnochianGovernorType } from "../types/enochianGovenorType"
import { EnochianAethyrExtendedType, EnochianAethyrType } from "../types/enochianAethyrType"
import { EnochianNameLocatorType } from "../types/enochianNameLocatorType"
import { EnochianWatchtowerSquareType } from "../types/enochianWatchtowerSquareType"
import { EnochianLetterType } from "../types/enochianLetterType"
import { EnochianWordType } from "../types/enochianWordType"
import { EnochianEntitiesType } from "../types/enochianEntitiesType"


const EnochianDataContext = createContext<EnochianJSONDataContextType | undefined>(undefined)

export type EnochianJSONDataContextType = {
    enochianGovenors?: EnochianGovernorType[]
    enochianAethyrs?: EnochianAethyrType[],
    enochianEntities?: EnochianEntitiesType[],
    refreshEnochianAethyrs?: EnochianAethyrType[], 
    enochianAethyrsExtended?: EnochianAethyrExtendedType[],
    enochianEnochianNameLocator?: EnochianNameLocatorType[], 
    enochianWatchtowers?: EnochianWatchtowerSquareType[],
    refreshEnochianWatchtowers?: EnochianWatchtowerSquareType[],
    enochianAlphabet?: EnochianLetterType[],
    enochianKeys?: EnochianWordType[],
    refresh: Function
}

const EnochianDataContextProvider = ({children}: PropsWithChildren) => {

    const nodeServer = "http://localhost:3000"
    const dataSourceType = "MSSql"

    const dataSources = [
      { type: "JSON", 
        dataSource: {
          enochianGovenors: "/enochiana/tables/govenors.json", 
          enochianAethyrs: "/enochiana/tables/aethrys.json",
          enochianAethyrsExtended: "/enochiana/tables/extendedAethrys.json",
          enochianEntities: "",
          enochianEnochianNameLocator: "/enochiana/hierarchy/nameLocator.json",
          enochianWatchtowers: "/enochiana/tables/watchTowerLayoutWAethyrs.json",
          enochianAlphabet: "/enochiana/keys/alphabet.json",
          enochianKeys: "/enochiana/keys/keys.json"
        }
      },
      { type: "MSSql", 
        dataSource: {
          enochianGovenors: `${nodeServer}/uv_Govenors`, 
          enochianAethyrs: `${nodeServer}/TAethyrs`, 
          enochianAethyrsExtended: `${nodeServer}/uv_Aethyrs`,
          enochianEntities: `${nodeServer}/uv_AllEntities`,
          enochianEnochianNameLocator: `${nodeServer}/TWatchTowerNameLocator`,
          enochianWatchtowers: `${nodeServer}/uv_TableLayoutWAethrys`,
          enochianAlphabet: `${nodeServer}/TAlphabet`,
          enochianKeys: `${nodeServer}/TEnochianKeys`
        }
      }
    ]

    const ds = dataSources.filter((m)=>m.type == dataSourceType)[0].dataSource

    const [enochianGovenors, refreshEnochianGovenors] = useFetchStaticJson<EnochianGovernorType[]>(ds.enochianGovenors)
    const [enochianAethyrs, refreshEnochianAethyrs] = useFetchStaticJson<EnochianAethyrType[]>(ds.enochianAethyrs)
    const [enochianAethyrsExtended, refreshEnochianAethyrsExtended] = useFetchStaticJson<EnochianAethyrExtendedType[]>(ds.enochianAethyrsExtended)
    const [enochianEntities, refreshEnochianEntities] = useFetchStaticJson<EnochianEntitiesType[]>(ds.enochianEntities)
    const [enochianEnochianNameLocator, refreshEnochianEnochianNameLocator] = useFetchStaticJson<EnochianNameLocatorType[]>(ds.enochianEnochianNameLocator)
    const [enochianWatchtowers, refreshEnochianWatchtowers] = useFetchStaticJson<EnochianWatchtowerSquareType[]>(ds.enochianWatchtowers)
    const [enochianAlphabet, refreshEnochianAlphabet] = useFetchStaticJson<EnochianLetterType[]>(ds.enochianAlphabet)
    const [enochianKeys, refreshEnochianKeys] = useFetchStaticJson<EnochianWordType[]>(ds.enochianKeys)
    
    const [sortedEnochianKeys, setSortedEnochianKeys] = useState<EnochianWordType[]>([])
    const [sortedEnochianWatchtowers, setSortedEnochianWatchtowers] = useState<EnochianWatchtowerSquareType[]>([])

    const [refreshCount, setRefreshCount] = useState(0)
    const refresh = () => {
      refreshEnochianWatchtowers()
      refreshEnochianEnochianNameLocator()
      refreshEnochianAethyrs()
      refreshEnochianGovenors()
      refreshEnochianAethyrsExtended()
      refreshEnochianEntities()
      const refCount = refreshCount + 1
      setRefreshCount(refCount)
    }

    useEffect(()=>{
        const sortedKey = _.sortBy(enochianWatchtowers, ['WatchTowerReferenceNumber','RowNumber', 'ColumnNumber'])
        setSortedEnochianWatchtowers(sortedKey)
    },[enochianWatchtowers, refreshCount])
    
    useEffect(()=>{
        const sortedKey = _.sortBy(enochianKeys, ['KeyNumber','WordNumber'])
        setSortedEnochianKeys(sortedKey)
    },[enochianKeys, refreshCount])

    return (
        <EnochianDataContext.Provider value={
            { 
              enochianGovenors: enochianGovenors, 
              enochianAethyrs: enochianAethyrs,
              enochianAethyrsExtended: enochianAethyrsExtended,
              enochianEntities: enochianEntities,
              enochianEnochianNameLocator: enochianEnochianNameLocator,
              enochianWatchtowers: sortedEnochianWatchtowers,
              enochianAlphabet: enochianAlphabet,
              enochianKeys: sortedEnochianKeys,
              refresh: refresh
            }
          }>
          {children}
        </EnochianDataContext.Provider>
      )
}

export {EnochianDataContextProvider, EnochianDataContext}