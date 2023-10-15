import { ChangeEvent, MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { EnochianWatchtowerSquareType } from "../../types/enochianWatchtowerSquareType";
import { EnochianDataContext } from "../../contexts/enochianData.context";
import "./editGovenorSigil.css"
import { EnochianAnalysisActionType, EnochianAnalysisContext, IEnochianAnalysisAction } from "../../contexts/enochianWatchtowerAnalysis.context";

interface ModalProps {
    isOpen: MutableRefObject<boolean>
    hasCloseBtn?: boolean
    onClose?: () => void
    children: React.ReactNode
    square?: EnochianWatchtowerSquareType
}

interface SigilStatus {
    [index: string]: boolean | number | string| undefined,
    watchTowerReferenceNumber?: number,
    rowNumber?: number,
    columnNumber?: number,
    start?: boolean,
    north?: boolean,
    northeast?: boolean,
    east?: boolean,
    southeast?: boolean,
    south?: boolean,
    southwest?: boolean,
    west?: boolean,
    northwest?: boolean,
    end?: boolean,
    originalTableLetter?: string,
    originalTableIsUpper?: boolean,
    reformedTableLetter?: string,
    reformedTableIsUpper?: boolean,
    governorAlignedTableLetter?: string,
    governorAlignedTableIsUpper?: boolean,
}

const EditSquareGovenorSigil = ({ isOpen, hasCloseBtn, onClose, children, square }: ModalProps) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(isOpen.current);
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [status, setStatus] = useState<SigilStatus>()
    const enochianData = useContext(EnochianDataContext)
    const { enochianAnalysisState, enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)

    const aethryRef = useRef<HTMLInputElement>(null)
    const subOrderRef = useRef<HTMLInputElement>(null)
    const charNumberRef = useRef<HTMLInputElement>(null)

    const originalTableLetterRef = useRef<HTMLInputElement>(null)
    const reformedTableLetterRef = useRef<HTMLInputElement>(null)
    const governorAlignedTableLetterRef = useRef<HTMLInputElement>(null)

    const originalTableIsUpperRef = useRef<HTMLInputElement>(null)
    const reformedTableIsUpperRef = useRef<HTMLInputElement>(null)
    const governorAlignedTableIsUpperRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setModalOpen(isOpen.current);
    }, [isOpen.current])

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
          if (isModalOpen) {
            modalElement.showModal()
          } else {
            modalElement.close()
          }
        }

    }, [isModalOpen])
      
    useEffect(()=>{
        console.log(`EditGovenorSigilSquare changed: ${JSON.stringify(square)}`)

        setStatus({
            watchTowerReferenceNumber: square?.WatchTowerReferenceNumber,
            rowNumber: square?.RowNumber,
            columnNumber: square?.ColumnNumber,
            start: square?.GovernorSigilStart ?? false,
            north: square?.GovernorSigilNorth ?? false,
            northeast: square?.GovernorSigilNorthEast ?? false,
            east: square?.GovernorSigilEast ?? false,
            southeast: square?.GovernorSigilSouthEast ?? false,
            south: square?.GovernorSigilSouth ?? false,
            southwest: square?.GovernorSigilSouthWest ?? false,
            west: square?.GovernorSigilWest ?? false,
            northwest: square?.GovernorSigilNorthWest ?? false,
            end: square?.GovernorSigilEnd ?? false,
            originalTableLetter: square?.OriginalTableLetter as string ?? '',
            originalTableIsUpper: square?.OriginalTableIsUpper as boolean ?? '',
            reformedTableLetter: square?.ReformedTableLetter as string ?? '',
            reformedTableIsUpper: square?.ReformedTableIsUpper as boolean ?? '',
            governorAlignedTableLetter: square?.GovernorAlignedTableLetter as string ?? '',
            governorAlignedTableIsUpper: square?.GovernorAlignedTableIsUpper as boolean ?? '',
            aethry: square?.AethyrNumber,
            subOrder: square?.SubOrder,
            charNumber: square?.CharNumber,
        })

        if(originalTableLetterRef.current)
            originalTableLetterRef.current.value = square?.OriginalTableLetter as string ?? ''
       
        if(reformedTableLetterRef.current)
            reformedTableLetterRef.current.value = square?.ReformedTableLetter as string ?? ''

        if(governorAlignedTableLetterRef.current)
            governorAlignedTableLetterRef.current.value = square?.GovernorAlignedTableLetter as string ?? ''

        if(originalTableIsUpperRef.current)
            originalTableIsUpperRef.current.checked = square?.OriginalTableIsUpper as boolean ?? false

        if(reformedTableIsUpperRef.current)
            reformedTableIsUpperRef.current.checked = square?.ReformedTableIsUpper as boolean ?? false

        if(governorAlignedTableIsUpperRef.current)
            governorAlignedTableIsUpperRef.current.checked = square?.GovernorAlignedTableIsUpper as boolean ?? false
    
        if(aethryRef.current)
            aethryRef.current.value = `${square?.AethyrNumber ?? ''}` 

        if(subOrderRef.current)
            subOrderRef.current.value = `${square?.SubOrder ?? ''}` 

        if(charNumberRef.current)
            charNumberRef.current.value = `${square?.CharNumber ?? ''}` 

    },[square])

    const handleCloseModal = () => {

    
        let action: IEnochianAnalysisAction = {
            type: EnochianAnalysisActionType.SET_WATCHTOWER_EDIT_OPEN,
            watchtowerEditOpen: false
        }
       
        enochianAnalysisDispatch(action)
        if (onClose) {
            onClose()
        }

        isOpen.current = false
        setModalOpen(isOpen.current)
    }

    const handleSigilEditClick = (sigilPortion: string) => {
        console.warn(`sigilPortion ${sigilPortion} status: ${status && status[sigilPortion.toLowerCase()]}`)
        setStatus({...status, [sigilPortion.toLowerCase() as keyof typeof status] : !(status && status[sigilPortion.toLowerCase()])})
    }

    const handleEdit = (editItem: string, value: ChangeEvent<HTMLInputElement>) => {
        
        let editValue = value.target.type.toLowerCase() == "checkbox" ? (value.target.checked == true ? 1 : 0) : value.target.value
        setStatus({...status, [editItem as keyof typeof status] : editValue})

        return
    }

    const saveSquare = (square?: SigilStatus) => {

        const uri = `http://localhost:3000/UpdateSquare?Square=${JSON.stringify(square)}`
        console.log(JSON.stringify(square))
    
        const result = fetch(uri)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
    
        console.warn(`res: ${result}`)
        
        enochianData?.refresh()

        handleCloseModal()
    }

    return (

      <dialog id="edit-dialog" ref={modalRef} style={{position: "absolute", margin: "0"}}>
            {hasCloseBtn && (
      <button className="modal-close-btn" onClick={handleCloseModal}>
        Close
      </button>
      
    )}
        {children}
        <button onClick={ ()=> saveSquare(status)}>Save</button>
        <table className="editSigilTable">
            <tr>
                <td><svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("NorthWest")}>
                <line x1="0" y1="0" x2="100" y2="100"     strokeWidth="3" stroke={status && status.northwest ? "black" : "none"} />
                    </svg>
                </td>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("North")}>
                        <line x1="50" y1="100" x2="50" y2="0"    strokeWidth="3" stroke={status && status.north ? "black" : "none"} />  
                    </svg>
                </td>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("NorthEast")}>
                        <line x1="0" y1="100" x2="100" y2="0"  strokeWidth="3" stroke={status && status.northeast ? "black" : "none"} /> 
                    </svg>
                </td>
            </tr>
            <tr>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("West")}>
                        <line x1="0" y1="50" x2="100" y2="50"    strokeWidth="3" stroke={status && status.west ? "black" : "none"} />  
                    </svg>
                </td>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <text x="25" y="80" className="enochian-font-svg">{square && square.Letter as string}</text>
                    </svg>
                </td>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("East")}>
                        <line x1="0" y1="50" x2="100" y2="50"  strokeWidth="3" stroke={status && status.east ? "black" : "none"} /> 
                    </svg>
                </td>
            </tr>
            <tr>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("SouthWest")}>
                        <line x1="0" y1="100" x2="100" y2="0"   strokeWidth="3" stroke={status && status.southwest ? "black" : "none"} />
                    </svg>
                </td>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("South")}>
                        <line x1="50" y1="100" x2="50" y2="0"  strokeWidth="3" stroke={status && status.south ? "black" : "none"} /> 
                    </svg>
                </td>
                <td>
                    <svg className="sigil-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={()=>handleSigilEditClick("SouthEast")}>
                        <line x1="0" y1="0" x2="100" y2="100"  strokeWidth="3" stroke={status && status.southeast ? "black" : "none"} /> 
                    </svg>
                </td>
            </tr>
            
        </table>
        <div>Aethry:  <input maxLength={2} ref={aethryRef} size={2} onChange={(e)=>handleEdit('aethyr', e)}/><br/>
             SubOrder:<input maxLength={2} ref={subOrderRef} size={2} onChange={(e)=>handleEdit('subOrder', e)}/><br/>
             Char#:   <input maxLength={1} ref={charNumberRef} size={1} onChange={(e)=>handleEdit('charNumber', e)}/><br/>
        </div>
        <div>Org Table Letter: <input maxLength={1} ref={originalTableLetterRef} size={1} onChange={(e)=>handleEdit('originalTableLetter', e)}/>
            <input type="checkbox" ref={originalTableIsUpperRef} onChange={(e)=>handleEdit('originalTableIsUpper', e)}/>
        </div>

        <div>Ref Table Letter: <input maxLength={1} ref={reformedTableLetterRef} size={1} onChange={(e)=>handleEdit('reformedTableLetter', e)}/>
            <input type="checkbox" ref={reformedTableIsUpperRef} onChange={(e)=>handleEdit('reformedTableIsUpper', e)}/>
        </div>
        <div>Gov Table Letter: <input maxLength={1} ref={governorAlignedTableLetterRef} size={1} onChange={(e)=>handleEdit('governorAlignedTableLetter', e)}/>
            <input type="checkbox" ref={governorAlignedTableIsUpperRef} onChange={(e)=>handleEdit('governorAlignedTableIsUpper', e)}/>
        </div>
        <div>
            {square && square.PartOfEarthImposedByGod} <br></br>
            {square && square.AethyrNumber} <br></br>
        </div>
      </dialog>
    )
  }

export default EditSquareGovenorSigil