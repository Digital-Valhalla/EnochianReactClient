import { useContext, useEffect, useRef } from "react"
import EditSquareGovenorSigil from "../edit/editGovenorSigil"
import { EnochianAnalysisContext } from "../../contexts/enochianWatchtowerAnalysis.context"


const PopUpWindows = () => {
    const isEditSigilDialogOpen = useRef<boolean>(false)
    const { enochianAnalysisState, enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)

    useEffect(()=>{
        
        if(enochianAnalysisState.selectedWatchtowerSquare != null){
            isEditSigilDialogOpen.current = true
        }
        
    },[enochianAnalysisState.selectedWatchtowerSquare])

    return(
        <EditSquareGovenorSigil isOpen={isEditSigilDialogOpen} children={undefined} hasCloseBtn={true} square={enochianAnalysisState.selectedWatchtowerSquare}></EditSquareGovenorSigil>
    )
}

export default PopUpWindows