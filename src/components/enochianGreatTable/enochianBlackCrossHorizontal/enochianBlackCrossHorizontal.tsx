
import { ReactNode, useContext } from "react"
import { EnochianDataContext } from "../../../contexts/enochianData.context"

import "./enochianBlackCrossHorizontal.css"
import { EnochianWatchtowerSquareType } from "../../../types/enochianWatchtowerSquareType"
import EnochianWatchtowerSquare from "../enochianWatchtowerSquare/enochianWatchtowerSquare"

const EnochianBlackCrossHorizontal = (props: {watchTowerReferenceNumber: number, startRow: number, startColumn: number}) => {
    const enochianData = useContext(EnochianDataContext)

    return(
       
        <>
            <div className="enochian-blackcross-horizontal-parent">
            {
               // columns
               [...Array(12).keys()].map((y)=> {

                        let square: ReactNode
                        let letter: EnochianWatchtowerSquareType

                        if(enochianData && enochianData.enochianWatchtowers && enochianData.enochianWatchtowers.length > 0){
                            letter = enochianData.enochianWatchtowers.filter((m)=>
                                m.ColumnNumber == y + props.startColumn &&
                                m.RowNumber == props.startRow &&
                                m.WatchTowerReferenceNumber == props.watchTowerReferenceNumber)[0] as EnochianWatchtowerSquareType
                            
                            square = <div key={`blackcrossHorizontal${props.watchTowerReferenceNumber}-row${props.startRow}-col${y + props.startColumn}`} className="enochian-blackcross-horizontal-child">
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

export default EnochianBlackCrossHorizontal