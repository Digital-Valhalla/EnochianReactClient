import { useContext, useEffect, useState } from 'react'
import { EnochianDataContext } from "../../contexts/enochianData.context"
import { EnochianWordType } from '../../types/enochianWordType';

import "./enochianKey.css"
import EnochianWord from '../enochianWord/enochianWord';

const EnochianKey = (props: {keyNumber: number, showEnglish: boolean}) => {

    const enochianJSONData = useContext(EnochianDataContext)
    const [key, setKey] = useState<EnochianWordType[]>()
    const [showEnglish, setShowEnglish] = useState<boolean>(true)

    useEffect(()=>{
        let key = enochianJSONData && enochianJSONData.enochianKeys?.filter((m)=>m.KeyNumber == props.keyNumber)
        setKey(key)
    },[props.keyNumber])
    
    useEffect(()=>{
        setShowEnglish(props.showEnglish)
    },[props.showEnglish])

    return(
        <div className="parent">
        {
            key && key.map((m)=>
                <EnochianWord key={`${m.KeyNumber}:${m.WordNumber}`} word={m} showEnglish={true}/>
            )
        }
    </div>
    )
}

export default EnochianKey