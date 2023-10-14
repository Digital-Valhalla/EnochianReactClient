import {ChangeEvent, ChangeEventHandler, useContext} from "react"
import { EnochianAnalysisWatchTowerLayoutType } from "../../../contexts/enochianWatchtowerAnalysis.context"
import "./enochianWatchTowerLayoutSelector.css"
import { EnochianAnalysisActionType, EnochianAnalysisContext, IEnochianAnalysisAction } from "../../../contexts/enochianWatchtowerAnalysis.context"

const EnochianWatchTowerLayoutSelector = () => {
    const { enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)

    const onSelectChange:ChangeEventHandler<HTMLSelectElement> = (e: ChangeEvent<HTMLSelectElement>) =>{
        let action: IEnochianAnalysisAction = {
            type: EnochianAnalysisActionType.SET_WATCHTOWER_LAYOUT,
            watchtowerLayoutType: e.target.value as EnochianAnalysisWatchTowerLayoutType
        }
        enochianAnalysisDispatch(action)
    }

    return(
        <>
        <select onChange={onSelectChange}>
            {Object.keys(EnochianAnalysisWatchTowerLayoutType).map(m=>
                <option key={m} value={m}>{m}</option>
            )}
        </select>
        </>
    )
}

export default EnochianWatchTowerLayoutSelector