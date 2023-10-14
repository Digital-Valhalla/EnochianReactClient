import { ChangeEventHandler } from "react"
import "./enochianKeySelector.css"

const EnochianKeySelector = (props: {keyChange: ChangeEventHandler<HTMLSelectElement>}) => {
    
    return(
        <select className="select" onChange={props.keyChange}>
            <option value={1}>First</option>
            <option value={2}>Second</option>
            <option value={3}>Third</option>
            <option value={4}>Fourth</option>
            <option value={5}>Fifth</option>
            <option value={6}>Sixth</option>
            <option value={7}>Seventh</option>
            <option value={8}>Eighth</option>
            <option value={9}>Ninth</option>
            <option value={10}>Tenth</option>
            <option value={11}>Eleventh</option>
            <option value={12}>Twelfth</option>
            <option value={13}>Thirteenth</option>
            <option value={14}>Fourteenth</option>
            <option value={15}>Fifteenth</option>
            <option value={16}>Sixteenth</option>
            <option value={17}>Seventeenth</option>
            <option value={18}>Eighteenth</option>
            <option value={19}>Nineteenth</option>
      </select>
    )
}

export default EnochianKeySelector