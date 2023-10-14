import { useContext } from 'react'

import "./enochianSubOrderInfoPanel.css"

import { EnochianDataContext } from "../../../contexts/enochianData.context"
import { EnochianAnalysisContext } from "../../../contexts/enochianWatchtowerAnalysis.context"
import EnochianGovenorSigil from '../../enochianGreatTable/enochianGovenorSigil/enochianGovenorSigil'
import { useOrdinalNumberSuffix } from '../../../hooks/useOrdinalNumberSuffix'

const EnochianSubOrderInfoPanel = () => {

    const enochianData = useContext(EnochianDataContext)
    const { enochianAnalysisState } = useContext(EnochianAnalysisContext)
    const ordinalSuffix = useOrdinalNumberSuffix()
    return(
        <>
            <div className="enochian-sub-order-info-panel">
                {
                    
                   enochianData && enochianData?.enochianAethyrsExtended?.filter(m=>m.AethyrNumber == enochianAnalysisState.aethyr)
                   .map(m=> {

                        const sigilData = enochianData?.enochianWatchtowers?.filter(s=>s.NameType == m.NameType && s.NameReferenceNumber== m.NameReferenceNumber )
                        return  <div className="enochian-info-panel-sub-order-parent">
                                    <div><span className="english-font">{m.NameReferenceNumber}.</span></div>
                                    <div className="enochian-info-panel-sub-order-child-two-column"><span className="enochian-font enochian-info-panel-partOfEarthImposedByGod">{m.PartOfEarthImposedByGod}</span></div>
                                    <div className="enochian-info-panel-sub-order-comments">
                                        <EnochianGovenorSigil governorData={sigilData} angelicKing={m.AngelicKing}></EnochianGovenorSigil>
                                    </div>
                                    
                                        <div><span className="english-font">{m.NumberOfMinisters}</span></div>
                                        <div><span className="english-font">{m.QuarterOfTheEarth}</span></div>
                                        <div><span className="english-font">{m.AngelicKing}</span></div>
                                        <div><span className="english-font"></span></div>
                                        <div><span className="english-font">{m.TribeOfIsreal}</span></div>
                                    <br></br>
                                        <div className="enochian-info-panel-sub-order-comments"><span className="english-font" style={{color:"yellowgreen"}}>{m.PartOfEarthImposedByMan}</span></div>
                                        <div className="enochian-info-panel-sub-order-comments english-font">
                                            <span className="enochian-font-normal" style={{color:"yellowgreen"}}>{`${m.PartOfEarthImposedByGod} `}</span> 
                                            <span>{` resides in the ${ordinalSuffix(m.AethyrNumber)} Aethry - ${m.SchuelerAethyrName}. He is the ${ordinalSuffix(m.NameReferenceNumber)} governor of the Empyreum whose name means '${m.SchuelerGovenorTitle}'. He ${m.SchuelerGovenorDescription} He reigns in the ${m.QuarterOfTheEarth}. ${m.NumberOfMinisters} is the number of his ministers - ${m.AurumSolisTitleOfMinisters}. He presides over ${m.PartOfEarthImposedByMan}`}</span>
                                            </div>
                                    <br></br>
                                </div>

                             
                    })
                }
               
            </div>
        </>
    )
}

export default EnochianSubOrderInfoPanel