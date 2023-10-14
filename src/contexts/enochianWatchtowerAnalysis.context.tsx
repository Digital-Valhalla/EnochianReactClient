import * as React from 'react'
import { EnochianWatchtowerSquareType } from '../types/enochianWatchtowerSquareType'

export enum EnochianAnalysisWatchTowerLayoutType {
  DEFAULT = 'DEFAULT',
  ORIGINAL = 'ORIGINAL',
  REFORMED = 'REFORMED',
  GOVERNOR = 'GOVERNOR'
}

export interface IEnochianAnalysisState {
  nameType: number
  nameShift: number
  aethyr: number
  selectedWatchtowerSquare?: EnochianWatchtowerSquareType
  watchtowerEditOpen?: boolean
  watchtowerLayoutType?: EnochianAnalysisWatchTowerLayoutType
}

export const initialState: IEnochianAnalysisState = {
  nameType: 11,
  nameShift: 0,
  aethyr: 0,
}

export interface IEnochianAnalysisContext {
  enochianAnalysisState: IEnochianAnalysisState
  enochianAnalysisDispatch: React.Dispatch<IEnochianAnalysisAction>
}

const EnochianAnalysisContext = React.createContext<IEnochianAnalysisContext>({
  enochianAnalysisState: {
    nameType: 11,
    nameShift: 0,
    aethyr: 0,
  },
  enochianAnalysisDispatch: () => {}
})

export enum EnochianAnalysisActionType {
  SET_WATCHTOWER_EDIT_OPEN = 'SET_WATCHTOWER_EDIT_OPEN',
  SET_NAME_TYPE = 'SET_NAME_TYPE',
  SET_NAME_SHIFT = 'SET_NAME_SHIFT',
  SET_AETHYR = 'SET_AETHYR',
  SET_WATCHTOWER_SQUARE = 'SET_WATCHTOWER_SQUARE',
  SET_WATCHTOWER_LAYOUT = 'SET_WATCHTOWER_LAYOUT',
  RESET_NAME_SHIFT = 'RESET_NAME_SHIFT',
}

export type IEnochianAnalysisAction = {
  type: EnochianAnalysisActionType
  nameType?: number
  nameShift?: number
  aethyr?: number
  selectedWatchtowerSquare?: EnochianWatchtowerSquareType
  watchtowerEditOpen?: boolean
  watchtowerLayoutType?: EnochianAnalysisWatchTowerLayoutType
}

const analysisReducer = (
  state: IEnochianAnalysisState,
  action: IEnochianAnalysisAction
): typeof initialState => {
  console.log(`analysisReducer called: ${action.type}`)

  switch (action.type) {
    case 'SET_NAME_TYPE': {
      return {
        ...state,
        nameType: action.nameType ? action.nameType : state.nameType
      }
    }
    case 'SET_NAME_SHIFT': {
        return {
            ...state,
            nameShift: action.nameShift ? action.nameShift : state.nameShift
          }
    }
    case 'RESET_NAME_SHIFT': {
        return {
            ...state,
            nameShift: 0
          }
    }

    case 'SET_AETHYR': {
      return {
        ...state,
        aethyr: action.aethyr ? action.aethyr : state.aethyr
      }
    }

    case 'SET_WATCHTOWER_SQUARE': {
      return {
        ...state,
        selectedWatchtowerSquare: action.selectedWatchtowerSquare ? action.selectedWatchtowerSquare : state.selectedWatchtowerSquare
      }
    }

    case 'SET_WATCHTOWER_EDIT_OPEN':{

      return{
        ...state,
        watchtowerEditOpen: action.watchtowerEditOpen ?? state.watchtowerEditOpen
      }
    }

    case 'SET_WATCHTOWER_LAYOUT':{
      console.log(`watchtower layout changed`)
      return{
        ...state,
        watchtowerLayoutType: action.watchtowerLayoutType ?? state.watchtowerLayoutType
      }
    }

    default:
      throw new Error()
  }
}

const EnochianAnalysisContextProvider = ({children}: React.PropsWithChildren) => {
  const [enochianAnalysisState, enochianAnalysisDispatch] = React.useReducer(
    analysisReducer,
    initialState as IEnochianAnalysisState
  )
  const value = { enochianAnalysisState, enochianAnalysisDispatch }
  return <EnochianAnalysisContext.Provider value={value}>{children}</EnochianAnalysisContext.Provider>
}

export { EnochianAnalysisContext, EnochianAnalysisContextProvider }
