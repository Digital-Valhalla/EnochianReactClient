
import { ReactNode, useContext } from "react"
import { EnochianDataContext } from "../../../contexts/enochianData.context"

import "./enochianSenior.css"
import { EnochianWatchtowerSquareType } from "../../../types/enochianWatchtowerSquareType"
import EnochianWatchtowerSquare from "../enochianWatchtowerSquare/enochianWatchtowerSquare"

const EnochianSenior = (props: {watchtowerReferenceNumber: number, startRow: number, startColumn: number}) => {
    const enochianData = useContext(EnochianDataContext)

    return(
       
        <>
            <div className="enochian-senior-parent">
            {
               // rows
               [...Array(6).keys()].map((y)=> {

                        let square: ReactNode
                        let letter: EnochianWatchtowerSquareType

                        if(enochianData && enochianData.enochianWatchtowers && enochianData.enochianWatchtowers.length > 0){
                            letter = enochianData.enochianWatchtowers.filter((m)=>
                                m.ColumnNumber == props.startColumn &&
                                m.RowNumber == y + props.startRow &&
                                m.WatchTowerReferenceNumber == props.watchtowerReferenceNumber)[0] as EnochianWatchtowerSquareType
                            
                            square = <div key={`watchtowerSenior${props.watchtowerReferenceNumber}-row${y + props.startRow}-col${props.startColumn}`} className="enochian-senior-child">
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

export default EnochianSenior