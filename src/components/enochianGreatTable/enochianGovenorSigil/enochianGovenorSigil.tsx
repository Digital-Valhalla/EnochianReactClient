import { EnochianWatchtowerSquareType } from "../../../types/enochianWatchtowerSquareType"
import * as _ from 'lodash'
import EnochianWatchtowerSigilSquare from "../enochianWatchtowerSigilSquare/enochianWatchtowerSigilSquare"

import "./enochianGovenorSigil.css"
const EnochianGovenorSigil = (props: {governorData?: EnochianWatchtowerSquareType[], angelicKing: string }) =>{

    const minRow = _.minBy(props.governorData, (m) => m.RowNumber )?.RowNumber ?? 0
    const maxRow = _.maxBy(props.governorData, (m) => m.RowNumber )?.RowNumber ?? 0
    const minCol = _.minBy(props.governorData, (m) => m.ColumnNumber )?.ColumnNumber ?? 0
    const maxCol = _.maxBy(props.governorData, (m) => m.ColumnNumber )?.ColumnNumber ?? 0

    const rows = 1 + maxRow - minRow
    const columns = 1 + maxCol - minCol

    return (
        <div style={{display: "table-cell", textAlign: "center"}}>
        <table cellPadding={0} cellSpacing={0} className="enochian-governor-sigil-table">
            <tbody style={{margin: "0px", padding: "0px"}}>
                {[...Array(rows).keys()].map((y)=>{
                    return(
                    <tr style={{margin: "0px", padding: "0px"}}>
                        {[...Array(columns).keys()].map((x)=>{
                            const squareData = props.governorData && props.governorData?.filter((m) => m.ColumnNumber == x + minCol && m.RowNumber == y + minRow)[0] 

                            return(
                                
                                <td className={`enochian-governor-sigil-td ${props.angelicKing}`}>{
                                    squareData && <div style={{maxHeight: "25px", maxWidth: "25px"}}><EnochianWatchtowerSigilSquare displayLetter={(squareData.Letter as string).toLowerCase()} drawSigil={true} drawSigilColor="yellow" letterClassName={`enochian-font-svg-red ${props.angelicKing}`} 
                                    drawDirection = {{
                                        GovernorSigilNorth: squareData.GovernorSigilNorth,
                                        GovernorSigilNorthEast: squareData.GovernorSigilNorthEast,
                                        GovernorSigilEast: squareData.GovernorSigilEast,
                                        GovernorSigilSouthEast: squareData.GovernorSigilSouthEast,
                                        GovernorSigilSouth: squareData.GovernorSigilSouth,
                                        GovernorSigilSouthWest: squareData.GovernorSigilSouthWest,
                                        GovernorSigilWest: squareData.GovernorSigilWest,
                                        GovernorSigilNorthWest: squareData.GovernorSigilNorthWest
                                    }}
                                    />
                                    </div>
                                    
                                }
                                </td>
                            )
                        })}
                    </tr>)
                })}
            </tbody>
        </table>    
        </div>
    )
}

export default EnochianGovenorSigil