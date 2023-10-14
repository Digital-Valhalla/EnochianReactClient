import { EnochianWordType } from "../../types/enochianWordType"
import "./enochianWord.css"

const EnochianWord = (props: {word: EnochianWordType, showEnglish: boolean}) => {

    const { word, showEnglish } = props

    return(
        <div className="child-span">
        <span className='enochian-font'>{word.Enochian}</span><br/>
        {showEnglish ? <span className='english-font'>{word.ModernEnglish}</span> : null}
        </div>  
    )
}

export default EnochianWord