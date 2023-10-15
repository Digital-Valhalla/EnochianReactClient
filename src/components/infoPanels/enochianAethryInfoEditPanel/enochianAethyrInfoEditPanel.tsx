import { useContext, useEffect, useRef, useState } from 'react'

import "./enochianAethyrInfoEditPanel.css"

import { EnochianDataContext } from "../../../contexts/enochianData.context"
import { EnochianAnalysisContext } from "../../../contexts/enochianWatchtowerAnalysis.context"

type EnochianAethryInfoPanelEditState = {
    aethyrNumber: number,
    schuelerAethyrLocation: string,
    schuelerAethyrDescription: string,
    schuelerAethyrComment: string
}

const EnochianAethyrInfoEditPanel = () => {

    const enochianData = useContext(EnochianDataContext)
    const { enochianAnalysisState } = useContext(EnochianAnalysisContext)

    const [editState, setEditState] = useState<EnochianAethryInfoPanelEditState>()

    const schuelerAethyrLocation = useRef<HTMLTextAreaElement>(null)
    const schuelerAethyrDescription = useRef<HTMLTextAreaElement>(null)
    const schuelerAethyrComment = useRef<HTMLTextAreaElement>(null)

    const paneldata = enochianData && enochianData?.enochianAethyrs?.filter(m=>m.AethyrNumber == enochianAnalysisState.aethyr)[0]
    
    if(schuelerAethyrLocation.current)
        schuelerAethyrLocation.current.value = paneldata?.SchuelerAethryLocation as string

    if(schuelerAethyrDescription.current)
        schuelerAethyrDescription.current.value = paneldata?.SchuelerAethyrDescription as string

    if(schuelerAethyrComment.current)
        schuelerAethyrComment.current.value = paneldata?.SchuelerAethyrComment as string

    useEffect(()=>{
        const initialState: EnochianAethryInfoPanelEditState = {
            aethyrNumber: paneldata?.AethyrNumber as number,
            schuelerAethyrLocation: paneldata?.SchuelerAethryLocation as string,
            schuelerAethyrDescription: paneldata?.SchuelerAethyrDescription as string,
            schuelerAethyrComment: paneldata?.SchuelerAethyrComment as string
        }
        setEditState(initialState)
    },[paneldata])
    
    const submitChanges = () => {
        const currentState: EnochianAethryInfoPanelEditState = {
            aethyrNumber: paneldata?.AethyrNumber as number,
            schuelerAethyrLocation: schuelerAethyrLocation.current?.value as string,
            schuelerAethyrDescription: schuelerAethyrDescription.current?.value as string,
            schuelerAethyrComment: schuelerAethyrComment.current?.value as string
        }
        setEditState(currentState)
        postChanges(currentState)
    }

    const postChanges = (currentState: EnochianAethryInfoPanelEditState) => {
        const uri = `http://localhost:3000/UpdateAethyr?Aethyr=${JSON.stringify(currentState)}`
        console.log(JSON.stringify(currentState))
    
        const result = fetch(uri)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
    
        console.warn(`res: ${result}`)
        
        enochianData?.refresh()
    }

    return(
        <>
            <div className="enochian-aethyr-info-edit-panel">
                 <div>
                    <span className="english-font">{`${paneldata?.AethyrNumber} - ${paneldata?.AethyrName} - ${paneldata?.SchuelerAethyrName}`}</span><br></br>
                    <textarea className="english-font" rows={4} cols={28} ref={schuelerAethyrLocation}></textarea><br></br>
                    <textarea className="english-font" rows={16} cols={28} ref={schuelerAethyrDescription}></textarea>
                    <textarea className="english-font" rows={12} cols={28} ref={schuelerAethyrComment}></textarea><br></br>
                    <button onClick={submitChanges}>Save</button>
                </div>
            </div>
        </>
    )
}

export default EnochianAethyrInfoEditPanel