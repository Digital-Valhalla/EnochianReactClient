
import { ReactNode, useContext  } from "react"
import { EnochianDataContext } from "../../../contexts/enochianData.context"

import "./enochianBlackCrossTable.css"
import { EnochianWatchtowerSquareType } from "../../../types/enochianWatchtowerSquareType"
import EnochianWatchtowerSquare from "../enochianWatchtowerSquare/enochianWatchtowerSquare"

const EnochianBlackCrossTable = (props: {watchtowerReferenceNumber: number, startRow: number, startColumn: number}) => {
    const enochianData = useContext(EnochianDataContext)

    return(
        <>
            <div className="enochian-subquadrant-parent">
            {
               // rows
               [...Array(4).keys()].map((y)=> 
                    // columns
                    [...Array(5).keys()].map((x)=> {

                        let square: ReactNode
                        let letter: EnochianWatchtowerSquareType

                        if(enochianData?.enochianWatchtowers && enochianData.enochianWatchtowers.length > 0){
                            letter = enochianData.enochianWatchtowers.filter((m)=>
                                m.ColumnNumber == x + props.startColumn &&
                                m.RowNumber == y + props.startRow &&
                                m.WatchTowerReferenceNumber == props.watchtowerReferenceNumber)[0] as EnochianWatchtowerSquareType

                            let className = 'enochian-font-svg-white'
                            let borderColor = "antiquewhite"
         
                            square = <div key={`blackCrossTable${props.watchtowerReferenceNumber}-row${letter.RowNumber}-col${letter.ColumnNumber}`} className="enochian-subquadrant-child" style={{borderColor: borderColor}}>
                                        <EnochianWatchtowerSquare square={letter} letterClassName={className} backColor={""}/>
                                     </div>
                        }
                        return square
                    }) 
               )  
            }
            </div>
        </>
    )
}

export default EnochianBlackCrossTable