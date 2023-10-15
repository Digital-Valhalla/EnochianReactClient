import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import EnochianWatchtower from "./enochianWatchtower/enochianWatchtower"


import { EnochianAnalysisActionType, EnochianAnalysisContext, EnochianAnalysisWatchTowerLayoutType, IEnochianAnalysisAction } from "../../contexts/enochianWatchtowerAnalysis.context"
import { EnochianDataContext } from "../../contexts/enochianData.context"
import EnochianBlackCrossVertical from "./enochianBlackCrossVertical/enochianBlackCrossVertical"
import EnochianBlackCrossHorizontal from "./enochianBlackCrossHorizontal/enochianBlackCrossHorizontal"

import "./enochianGreatTable.css"

import oro from "../../assets/enochianQuadrantSigils/oro.png"
import mph from "../../assets/enochianQuadrantSigils/mph.png"
import oip from "../../assets/enochianQuadrantSigils/oip.png"
import mor from "../../assets/enochianQuadrantSigils/mor.png"
import EnochianBlackCrossTable from "./enochianBlackCrossTable/enochianBlackCrossTable"

type watchTowerArrangement = {
    topLeft: number,
    topRight: number,
    bottomLeft: number,
    bottomRight: number
}

const defaultWatchTowerArrangement: watchTowerArrangement = {
    topLeft: 1,
    topRight: 2,
    bottomLeft: 3,
    bottomRight: 4
}
const EnochianGreatTable = () =>{
    const { enochianAnalysisState, enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)
    const [watchTowerArrangement, setWatchtowerArrangement] = useState<watchTowerArrangement>(defaultWatchTowerArrangement)

    useEffect(()=>{
        switch(enochianAnalysisState.watchtowerLayoutType){
            case(EnochianAnalysisWatchTowerLayoutType.ORIGINAL): {
                const watchTowerArrangement: watchTowerArrangement={
                    topLeft: 1,
                    topRight: 3,
                    bottomLeft: 4,
                    bottomRight: 2
                }
                setWatchtowerArrangement(watchTowerArrangement)
                break;
            }
            case(EnochianAnalysisWatchTowerLayoutType.REFORMED): {
                setWatchtowerArrangement(defaultWatchTowerArrangement)
                break;
            }
            case(EnochianAnalysisWatchTowerLayoutType.DEFAULT): {
                setWatchtowerArrangement(defaultWatchTowerArrangement)
                break;
            }
            case(EnochianAnalysisWatchTowerLayoutType.GOVERNOR): {
                setWatchtowerArrangement(defaultWatchTowerArrangement)
                break;
            }
            default: {
                console.log(`enochianAnalysisState.watchtowerLayoutType default case reached`)
                break
            }
        }
    },[enochianAnalysisState.watchtowerLayoutType])
    return(
        <>
    
        <div className="enochian-great-table-parent">

            {/* row 1*/}
            <div className="enochian-great-table-one-column">
               <img height="25px" width="25px" src={oro}/>
            </div>

            
            <div className="enochian-great-table-header-footer-row">
        
            </div>

            <div className="enochian-great-table-one-column">
                <img height="25px" width="25px" src={mph}/>
            </div>

            {/* row 2*/}
            <div className="enochian-great-table-child">
                
            </div>

            <div className="enochian-great-table-child">
                <EnochianWatchtower watchTowerReferenceNumber={watchTowerArrangement.topLeft} />
            </div>

            <div className="enochian-great-table-child">
                <EnochianBlackCrossVertical watchTowerReferenceNumber={5} startColumn={13} startRow={1} />
            </div>

            <div className="enochian-great-table-child">
                <EnochianWatchtower watchTowerReferenceNumber={watchTowerArrangement.topRight} />
            </div> 

            <div className="enochian-great-table-child">
                
            </div>  

            {/* row 3*/}
            <div className="enochian-great-table-child">
                
            </div>

            <div className="enochian-great-table-child">
                <EnochianBlackCrossHorizontal watchTowerReferenceNumber={5} startColumn={1} startRow={14} />
            </div>  
            
            <div className="enochian-great-table-child">
                <EnochianBlackCrossTable watchtowerReferenceNumber={6} startColumn={1} startRow={1}/>
            </div>

            <div className="enochian-great-table-child">
                <EnochianBlackCrossHorizontal watchTowerReferenceNumber={5} startColumn={14} startRow={14} />
            </div>

            <div className="enochian-great-table-child">
                
            </div>

            {/* row 4*/}

            <div className="enochian-great-table-child">
                
            </div>

            <div className="enochian-great-table-child">
                <EnochianWatchtower watchTowerReferenceNumber={watchTowerArrangement.bottomLeft} />
            </div>


            <div className="enochian-great-table-child">
                <EnochianBlackCrossVertical watchTowerReferenceNumber={5} startColumn={13} startRow={15} />
            </div>
 
            <div className="enochian-great-table-child">
                <EnochianWatchtower watchTowerReferenceNumber={watchTowerArrangement.bottomRight} />
            </div>

            <div className="enochian-great-table-child">
                
            </div>

            {/* row 5*/}
            <div className="enochian-great-table-one-column">
                <img height="25px" width="25px" src={mor}/>
            </div>

            
            <div className="enochian-great-table-header-footer-row">
        
            </div>

            <div className="enochian-great-table-one-column">
                <img height="25px" width="25px" src={oip}/>
            </div>
        </div>

        </>
    )
}

export default EnochianGreatTable