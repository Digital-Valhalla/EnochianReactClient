import { useContext } from "react"
import { EnochianAnalysisActionType, EnochianAnalysisContext, IEnochianAnalysisAction } from "../../../contexts/enochianWatchtowerAnalysis.context"

const EnochianGovenorRotator = () => {

    const { enochianAnalysisState, enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)
    
    const doClick = ()=>{
        let action: IEnochianAnalysisAction = {
          type: enochianAnalysisState.nameShift >= 6 ? EnochianAnalysisActionType.RESET_NAME_SHIFT : EnochianAnalysisActionType.SET_NAME_SHIFT,
          nameShift: enochianAnalysisState.nameShift + 1
        }
        enochianAnalysisDispatch (action)
      }
    return(
        <button onClick={doClick}>CLICK</button>
    )
}

export default EnochianGovenorRotator