import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"

import EnochianAethyrSelector from "../../components/analysisControls/enochianAethyrSelector/enochianAethyrSelector"
import EnochianAethyrInfoPanel from "../../components/infoPanels/enochianAethryInfoPanel/enochianAethyrInfoPanel"
import EditSquareGovenorSigil from "../../components/edit/editGovenorSigil"
import EnochianSubQuadrantInfoPanel from "../../components/infoPanels/enochianSubQuadrantInfoPanel/enochianSubQuadrantInfoPanel"
import { EnochianAnalysisContext, EnochianAnalysisWatchTowerLayoutType } from "../../contexts/enochianWatchtowerAnalysis.context"
import EnochianGreatTable from "../../components/enochianGreatTable/enochianGreatTable"
import EnochianKeySelector from "../../components/analysisControls/enochianKeySelector/enochianKeySelector"
import EnochianKey from "../../components/enochianKey/enochianKey"

import "./enochianGreatTableWithKeys.css"
import EnochianSubOrderInfoPanel from "../../components/infoPanels/enochianSubOrderInfoPanel/enochianSubOrderInfoPanel"
import EnochianWatchTowerLayoutSelector from "../../components/analysisControls/enochianWatchTowerLayoutSelector/enochianWatchTowerLayoutSelector"
const EnochianGreatTableWithKeysScreen = () => {
    const isEditSigilDialogOpen = useRef<boolean>(false)
    const [selectedKey, setSelectedKey] = useState(0)

    const { enochianAnalysisState, enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)
    
    const keySelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = Number.parseInt(e.target.value)
        setSelectedKey(value)
    }

    useEffect(()=>{
        isEditSigilDialogOpen.current = enochianAnalysisState.watchtowerEditOpen ?? false
    },[enochianAnalysisState])
    
    return(
        <>
        <EnochianWatchTowerLayoutSelector/>
        <EditSquareGovenorSigil isOpen={isEditSigilDialogOpen} children={undefined} hasCloseBtn={true} square={enochianAnalysisState.selectedWatchtowerSquare}></EditSquareGovenorSigil>
        
        <div className="enochian-great-table-with-keys-parent">

            {/* row 1*/}

            <div className="enochian-great-table-with-keys-two-rows" style={{border: "solid", borderWidth: "1px"}}>
                <EnochianAethyrInfoPanel/>
            </div>

            <div className="enochian-great-table-with-keys-child" style={{border: "solid", borderWidth: "1px"}}>
                <EnochianGreatTable/>
            </div>

            <div className="enochian-great-table-with-keys-two-rows">
                <EnochianAethyrSelector/>
            </div>
 
            <div className="enochian-great-table-with-keys-two-rows" style={{border: "solid", borderWidth: "1px"}}>
                <EnochianSubOrderInfoPanel/>
            </div>

            <div className="enochian-great-table-with-keys-child" style={{border: "solid", borderWidth: "1px"}}>
                <EnochianSubQuadrantInfoPanel/>
            </div>

            <div className="enochian-great-table-with-keys-full-row">
                <EnochianKeySelector keyChange={keySelectorChange}/>
            </div>
            <div className="enochian-great-table-with-keys-full-row">
                <EnochianKey keyNumber={selectedKey} showEnglish={true}/>
            </div>
        </div>

        </>
    )
}

export default EnochianGreatTableWithKeysScreen