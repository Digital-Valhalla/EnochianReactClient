
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

                            let className = [2, 11].includes(x) || [1].includes(y) ? 'enochian-font-svg-black' : 'enochian-font-svg-white'
                            
                            let borderColor = "yellowgreen"
                            switch(props.watchtowerReferenceNumber){
                                case(1): {
                                    borderColor = "maroon"
                                    break;
                                }

                                case(2): {
                                    borderColor = "green"
                                    break;
                                }

                                case(3): {
                                    borderColor = "antiquewhite"
                                    break;
                                }

                                case(4): {
                                    borderColor = "black"
                                    break;
                                }

                                default:{
                                    break;
                                }
                            }
                            
                            square = <div key={`watchtowerSubQuadrant${props.watchtowerReferenceNumber}-row${letter.RowNumber}-col${letter.ColumnNumber}`} className="enochian-subquadrant-child" style={{borderColor: borderColor}}>
                                        <EnochianWatchtowerSquare square={letter} letterClassName={className} backColor={[2,9].includes(letter.RowNumber) || [3, 10].includes(letter.ColumnNumber) ? "grey": ""}/>
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