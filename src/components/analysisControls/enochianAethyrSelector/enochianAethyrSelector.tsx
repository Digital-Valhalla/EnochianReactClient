import { ChangeEvent, useContext } from "react"
import { EnochianAnalysisActionType, EnochianAnalysisContext, IEnochianAnalysisAction } from "../../../contexts/enochianWatchtowerAnalysis.context"
import { EnochianDataContext } from "../../../contexts/enochianData.context"

import "./enochianAethyrSelector.css"

const EnochianAethyrSelector = () => {
    const { enochianAnalysisState, enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)
    const enochianData = useContext(EnochianDataContext)

    const aethyrChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        
        let selectedValue = Number.parseInt(e.target.value)
    
        let action: IEnochianAnalysisAction = {
            type: EnochianAnalysisActionType.SET_AETHYR, 
            aethyr: selectedValue
        }
       
        enochianAnalysisDispatch(action)
    }

    return(
        <div style={{height: "100%", position: "absolute", top: "5%", paddingLeft: "15px"}}>
            <select onChange={(e)=>aethyrChange(e)} className="enochian-aethyr-selector" size={30}>
                {
                    enochianData?.enochianAethyrs && enochianData.enochianAethyrs.map(m=>{
                        return <option value={m.AethyrNumber}>{m.AethyrName}</option>
                    })
                }
            </select>
        </div>
    )
}

export default EnochianAethyrSelector