import { useContext, useEffect, useState } from 'react'

import "./enochianSubQuadrantInfoPanel.css"

import { EnochianDataContext } from "../../../contexts/enochianData.context"
import { EnochianAnalysisContext } from "../../../contexts/enochianWatchtowerAnalysis.context"
import { EnochianNameLocatorType } from '../../../types/enochianNameLocatorType'
import { EnochianEntitiesType } from '../../../types/enochianEntitiesType'

const EnochianSubQuadrantInfoPanel = () => {

    const enochianData = useContext(EnochianDataContext)
    const { enochianAnalysisState } = useContext(EnochianAnalysisContext)
    
    const [locatorInfo, setLocatorInfo] = useState<EnochianNameLocatorType[]>()
    const [entityInfo, setEntityInfo] = useState<EnochianEntitiesType[]>()

    useEffect(() => {
        if(enochianAnalysisState.selectedWatchtowerSquare){
            const locatorInfo: EnochianNameLocatorType[] | undefined = enochianData && enochianData.enochianEnochianNameLocator?.filter((m)=> 
            m.ColumnNumber == enochianAnalysisState.selectedWatchtowerSquare?.ColumnNumber &&
            m.RowNumber == enochianAnalysisState.selectedWatchtowerSquare?.RowNumber &&
            m.WatchTowerReferenceNumber == enochianAnalysisState.selectedWatchtowerSquare?.WatchTowerReferenceNumber)

            setLocatorInfo(locatorInfo)

            const selectedEntites = enochianData?.enochianEntities?.filter((el) => {
                return locatorInfo?.some((f) => {
                  return f.NameType === el.NameType && f.NameReferenceNumber === el.NameReferenceNumber;
                });
              });

            setEntityInfo(selectedEntites)
        }
    },[enochianAnalysisState.selectedWatchtowerSquare])


    return(
        <>
            <div className="enochian-subquadrant-info-panel">
                {
                    entityInfo?.map((m) => {return <div>
                        <span className="enochian-font">{m.Name}</span><br/>
                        <span className="english-font" style={{color: "yellowgreen"}}>{m.Meaning}</span><br/>
                        <span className="english-font" style={{color: "yellowgreen"}}>{m.Description}</span><br/>
                        <br/>
                    </div>})
                }
               
            </div>
        </>
    )
}

export default EnochianSubQuadrantInfoPanel