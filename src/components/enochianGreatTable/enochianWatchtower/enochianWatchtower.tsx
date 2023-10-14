import { useEffect, useState } from "react"
import EnochianSenior from "../enochianSenior/enochianSenior"
import EnochianSubquadrant from "../enochianSubquadrant/enochianSubquadrant"
import EnochianWatchtowerGodname from "../enochianWatchtowerGodName/enochianWatchtowerGodName"

import "./enochianWatchtower.css"
const EnochianWatchtower = (props: {watchTowerReferenceNumber: number}) => {
    const [watchtowerReferenceNumber, setWatchtowerReferenceNumber] = useState(props.watchTowerReferenceNumber)
    useEffect(()=>{
        setWatchtowerReferenceNumber(props.watchTowerReferenceNumber)
    },[props.watchTowerReferenceNumber])

    
    return(
        <>
            <div className="enochian-watchtower-parent">
                <div key={``} className="enochian-watchtower-subquadrant-child-span">
                    <EnochianSubquadrant watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={1} startColumn={1}/>
                </div>
                <div className="enochian-watchtower-senior-child-span">
                    <EnochianSenior watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={1} startColumn={6}/>
                </div>
                <div className="enochian-watchtower-senior-child-span">
                    <EnochianSenior watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={1} startColumn={7}/>
                </div>
                <div className="enochian-watchtower-subquadrant-child-span">
                    <EnochianSubquadrant watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={1} startColumn={8}/>
                </div>

                <div className="enochian-watchtower-godname-child-span">
                    <EnochianWatchtowerGodname watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={7} startColumn={1}></EnochianWatchtowerGodname>
                </div>

                <div className="enochian-watchtower-subquadrant-child-span">
                    <EnochianSubquadrant watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={8} startColumn={1}/>
                </div>

                <div className="enochian-watchtower-senior-child-span">
                    <EnochianSenior watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={8} startColumn={6}/>
                </div>
                <div className="enochian-watchtower-senior-child-span">
                    <EnochianSenior watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={8} startColumn={7}/>
                </div>

                <div className="enochian-watchtower-subquadrant-child-span">
                    <EnochianSubquadrant watchtowerReferenceNumber={watchtowerReferenceNumber} startRow={8} startColumn={8}/>
                </div>
            </div>
        </>
    )
}

export default EnochianWatchtower