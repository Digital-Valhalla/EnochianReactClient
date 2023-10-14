import { useContext } from 'react'

import "./enochianAethyrInfoPanel.css"

import { EnochianDataContext } from "../../../contexts/enochianData.context"
import { EnochianAnalysisContext } from "../../../contexts/enochianWatchtowerAnalysis.context"

const EnochianAethyrInfoPanel = () => {

    const enochianData = useContext(EnochianDataContext)
    const { enochianAnalysisState } = useContext(EnochianAnalysisContext)

    return(
        <>
            <div className="enochian-aethyr-info-panel">
                {
                    enochianData && enochianData?.enochianAethyrs?.filter(m=>m.AethyrNumber == enochianAnalysisState.aethyr)
                    .map(m=>{return <div>
                                        <span className="english-font">{`${m.AethyrNumber} - ${m.AethyrName} - ${m.SchuelerAethyrName}`}</span><br></br>
                                        <span className="english-font">{`${m.SchuelerAethryLocation}`}</span><br></br>
                                        <span className="english-font">{`${m.SchuelerAethyrDescription}`}</span><br></br>
                                        <span className="english-font">{`${m.SchuelerAethyrComment}`}</span><br></br>
                                    </div>})
                }
               
            </div>
        </>
    )
}

export default EnochianAethyrInfoPanel