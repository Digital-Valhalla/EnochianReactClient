
import { ReactNode, useContext } from "react"
import { EnochianDataContext } from "../../../contexts/enochianData.context"

import "./enochianWatchtowerGodName.css"
import { EnochianWatchtowerSquareType } from "../../../types/enochianWatchtowerSquareType"
import EnochianWatchtowerSquare from "../enochianWatchtowerSquare/enochianWatchtowerSquare"

const EnochianWatchtowerGodname = (props: {watchtowerReferenceNumber: number, startRow: number, startColumn: number}) => {
    const enochianData = useContext(EnochianDataContext)

    return(
        <>
            <div className="enochian-watchtower-godname-parent">
            {
               // columns
               [...Array(12).keys()].map((y)=> {

                        let square: ReactNode
                        let letter: EnochianWatchtowerSquareType

                        if(enochianData?.enochianWatchtowers && enochianData.enochianWatchtowers.length > 0){
                            letter = enochianData.enochianWatchtowers.filter((m)=>
                                m.ColumnNumber == y + props.startColumn &&
                                m.RowNumber == props.startRow &&
                                m.WatchTowerReferenceNumber == props.watchtowerReferenceNumber)[0] as EnochianWatchtowerSquareType
                            
                            square = <div key={`watchtowerGodname${props.watchtowerReferenceNumber}-row${y + props.startRow}-col${props.startColumn}`} className="enochian-watchtower-godname-child">
                                        <EnochianWatchtowerSquare square={letter} letterClassName="enochian-font-svg" backColor="antiquewhite"/>
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

export default EnochianWatchtowerGodname