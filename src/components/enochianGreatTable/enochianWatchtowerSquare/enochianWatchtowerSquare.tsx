import { MouseEventHandler, useContext, useEffect, useRef, useState } from "react"
import { EnochianWatchtowerSquareType } from "../../../types/enochianWatchtowerSquareType"
import { EnochianAnalysisActionType, EnochianAnalysisContext, EnochianAnalysisWatchTowerLayoutType, IEnochianAnalysisAction } from "../../../contexts/enochianWatchtowerAnalysis.context"
import { EnochianDataContext } from "../../../contexts/enochianData.context"
import { EnochianWatchtowerSquareInfoType } from "../../../types/enochianWatchtowerSquareInfoType"
import { EnochianNameLocatorType } from "../../../types/enochianNameLocatorType"

import * as _ from "lodash"

import "./enochianWatchtowerSquare.css"
import EnochianWatchtowerSigilSquare from "../enochianWatchtowerSigilSquare/enochianWatchtowerSigilSquare"
import EditSquareGovenorSigil from "../../edit/editGovenorSigil"

const EnochianWatchtowerSquare = (props:{square: EnochianWatchtowerSquareType, letterClassName?: string, backColor?: string} )=>{

    const { enochianAnalysisState, enochianAnalysisDispatch } = useContext(EnochianAnalysisContext)
    const enochianData = useContext(EnochianDataContext)
   
    const [governorLocation, setGovenorLocation] = useState<EnochianNameLocatorType>()
    const [govenor, setGovenor] = useState<EnochianNameLocatorType[]>()
    const [displayLetter, setDisplayLetter] = useState(props.square.Letter)
    const [displayLetterSequence, setDisplayLetterSequence] = useState(0)
    const [watchtowerSquareInfo, setWatchtowerSquareInfo] = useState<EnochianWatchtowerSquareInfoType | undefined>()

    const [visibility, setVisibility] = useState("visible-square")
    const [letterClassName, setLetterClassName] = useState(props.letterClassName)
    const [isSelected, setIsSelected] = useState(false)
    const [isCalvary, setIsSCalvary] = useState(false)
    const [isSenior, setIsSenior] = useState(false)
    const [isSelectedAethyr, setIsSelectedAethyr] = useState(false)

    const isEditOpen = useRef(false)

    const governorNameType = 11

    useEffect(()=>{

        setIsSelectedAethyr(false)
        switch(enochianAnalysisState.watchtowerLayoutType){
             case (EnochianAnalysisWatchTowerLayoutType.DEFAULT): {
                setDisplayLetter(props.square.Letter)
                break;
             }
             case (EnochianAnalysisWatchTowerLayoutType.REFORMED): {
                setDisplayLetter(props.square.ReformedTableLetter)
                break;
             }
             case (EnochianAnalysisWatchTowerLayoutType.ORIGINAL): {
                setDisplayLetter(props.square.OriginalTableLetter)
                break;
             }
             case (EnochianAnalysisWatchTowerLayoutType.GOVERNOR): {
                setDisplayLetter(props.square.GovernorAlignedTableLetter)
                break;
             }
             default:{
                setDisplayLetter(props.square.Letter)
             }
        }
    },[enochianAnalysisState.watchtowerLayoutType])

    useEffect(()=>{

        if(governorLocation){
            let offset = enochianAnalysisState.nameShift + governorLocation.LetterSequenceNumber - 1 > 7 ? 
                enochianAnalysisState.nameShift + governorLocation!.LetterSequenceNumber - 1 - 7 :
                enochianAnalysisState.nameShift + governorLocation!.LetterSequenceNumber - 1
                setDisplayLetterSequence(offset)
            if(govenor && govenor[offset]){
                setDisplayLetter(govenor[offset].GreatTableLetter)
            }
        }
    },[enochianAnalysisState.nameShift])


    useEffect(()=>{

       if(props.square.AethyrNumber == enochianAnalysisState.aethyr){
            //setVisibility("aethyr-highlite-square")
            //setLetterClassName(`enochian-font-svg-black`)
            setIsSelectedAethyr(true)
       }else{
            setVisibility("visible-square")
            setLetterClassName(props.letterClassName)
            setIsSelectedAethyr(false)
       }
    }, [enochianAnalysisState.aethyr])



    useEffect(()=>{

        const thisSqaureIsSelected = enochianAnalysisState.selectedWatchtowerSquare?.ColumnNumber == props.square.ColumnNumber && 
            enochianAnalysisState.selectedWatchtowerSquare?.RowNumber == props.square.RowNumber &&
            enochianAnalysisState.selectedWatchtowerSquare?.WatchTowerReferenceNumber == props.square.WatchTowerReferenceNumber

        setIsSelected(thisSqaureIsSelected)

        
     }, [enochianAnalysisState.selectedWatchtowerSquare])

    useEffect(()=> {
        if(props.square.AethyrNumber != enochianAnalysisState.aethyr){
            
            if(watchtowerSquareInfo && watchtowerSquareInfo?.nameLocatorInfo.filter(m=>m.NameType==3).length > 0){
                setVisibility("entity-type-calvarycross")
                setIsSCalvary(true)
            }else

            if(watchtowerSquareInfo && watchtowerSquareInfo?.nameLocatorInfo.filter(m=>m.NameType==4).length > 0){
                setVisibility("entity-type-senior")
                setIsSenior(true)
            }
        }
    },[props])


    useEffect(()=>{
        if(enochianData?.enochianEnochianNameLocator != null){

            let locatorInfo: EnochianNameLocatorType[] = enochianData.enochianEnochianNameLocator.filter((m)=> 
                m.ColumnNumber == props.square.ColumnNumber &&
                m.RowNumber == props.square.RowNumber &&
                m.WatchTowerReferenceNumber == props.square.WatchTowerReferenceNumber
            )
            setWatchtowerSquareInfo({...watchtowerSquareInfo, nameLocatorInfo: locatorInfo})

            let locateGovenor: EnochianNameLocatorType = locatorInfo.filter((m)=> 
                m.NameType == governorNameType
            )[0]
           
            if(locateGovenor){
                let governor: EnochianNameLocatorType[] = enochianData.enochianEnochianNameLocator.filter((m)=> 
                    m.NameType == governorNameType &&
                    m.NameReferenceNumber == locateGovenor.NameReferenceNumber
                )

            setGovenor(_.sortBy(governor, 'LetterSequenceNumber'))
            setGovenorLocation(locateGovenor)
            }else{
                setVisibility("error-square")
            }
        }

    },[enochianData?.enochianEnochianNameLocator, props])

    const squareClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    
        isEditOpen.current = !isEditOpen.current
        const buttons = {
            left: 0,
            middle: 1,
            right: 2,
        }

        let action: IEnochianAnalysisAction = {
            type: EnochianAnalysisActionType.SET_WATCHTOWER_SQUARE,
            selectedWatchtowerSquare: props.square
        }
       
        enochianAnalysisDispatch(action)
       
        let selectedValue = props.square.AethyrNumber

        action = {
            type: EnochianAnalysisActionType.SET_AETHYR, 
            aethyr: selectedValue
        }
       
        enochianAnalysisDispatch(action)

        action = {
            type: EnochianAnalysisActionType.SET_WATCHTOWER_EDIT_OPEN, 
            watchtowerEditOpen: true
        }
       
        enochianAnalysisDispatch(action)
    }

    const setFocus = () =>{
        setVisibility("selected-square")
    }

    const setBlur = () => {
        setVisibility("visible-square")
    }

    const selectAethyr = props.square.AethyrNumber == enochianAnalysisState.aethyr
    return(
        <>
            <div onFocus={setFocus} onBlur={setBlur} onClick={squareClicked} className={`${visibility} square`} style={{backgroundColor: props.backColor ?? ''}}>

                <EnochianWatchtowerSigilSquare displayLetter={displayLetter as string} letterClassName={letterClassName ?? `enochian-font-svg-white`} drawSigilColor="red" drawSigilOpacity={.6} drawSigil={selectAethyr} drawDirection={{
                    GovernorSigilNorth: props.square.GovernorSigilNorth,
                    GovernorSigilNorthEast: props.square.GovernorSigilNorthEast,
                    GovernorSigilEast: props.square.GovernorSigilEast,
                    GovernorSigilSouthEast: props.square.GovernorSigilSouthEast,
                    GovernorSigilSouth: props.square.GovernorSigilSouth,
                    GovernorSigilSouthWest: props.square.GovernorSigilSouthWest,
                    GovernorSigilWest: props.square.GovernorSigilWest,
                    GovernorSigilNorthWest: props.square.GovernorSigilNorthWest
                }}/>
            </div>
            
        </>
    )
}

export default EnochianWatchtowerSquare