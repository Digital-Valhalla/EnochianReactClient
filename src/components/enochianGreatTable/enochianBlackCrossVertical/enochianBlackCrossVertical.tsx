
import { ReactNode, useContext } from "react"
import { EnochianDataContext } from "../../../contexts/enochianData.context"

import "./enochianBlackCrossVertical.css"
import { EnochianWatchtowerSquareType } from "../../../types/enochianWatchtowerSquareType"
import EnochianWatchtowerSquare from "../enochianWatchtowerSquare/enochianWatchtowerSquare"

const EnochianBlackCrossVertical = (props: {watchTowerReferenceNumber: number, startRow: number, startColumn: number}) => {
    const enochianData = useContext(EnochianDataContext)

    return(
       
        <>
            <div className="enochian-blackcross-vertical-parent">
            {
               // rows
               [...Array(13).keys()].map((y)=> {

                        let square: ReactNode
                        let letter: EnochianWatchtowerSquareType

                        if(enochianData && enochianData.enochianWatchtowers && enochianData.enochianWatchtowers.length > 0){
                            letter = enochianData.enochianWatchtowers.filter((m)=>
                                m.ColumnNumber == props.startColumn &&
                                m.RowNumber == y + props.startRow &&
                                m.WatchTowerReferenceNumber == props.watchTowerReferenceNumber)[0] as EnochianWatchtowerSquareType
                            
                            square = <div key={`blackcrossVertical${props.watchTowerReferenceNumber}-row${y + props.startRow}-col${props.startColumn}`} className="enochian-blackcross-vertical-child">
                                        <EnochianWatchtowerSquare square={letter} letterClassName="enochian-font-svg-white"/>
                                     </div>
                        }
                        return square
                    }
               )  
            }
            </div>
        </>
    )
}

export default EnochianBlackCrossVertical