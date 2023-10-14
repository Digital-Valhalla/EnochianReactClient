import './enochianWatchtowerSigilSquare.css'

export type EnochianWatchtowerSigilSquarePropsType = {
    displayLetter: string,
    drawSigil: boolean,
    drawSigilColor?: string,
    drawSigilOpacity?: number,
    letterClassName: string,
    drawDirection: {
        GovernorSigilNorth?: boolean,
        GovernorSigilNorthEast?: boolean,
        GovernorSigilEast?: boolean,
        GovernorSigilSouthEast?: boolean,
        GovernorSigilSouth?: boolean,
        GovernorSigilSouthWest?: boolean,
        GovernorSigilWest?: boolean
        GovernorSigilNorthWest?: boolean
    }
}
const EnochianWatchtowerSigilSquare = (props: EnochianWatchtowerSigilSquarePropsType) => {

   
    return(
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    
                    <text x="25" y="80" className={props.letterClassName}>{props.displayLetter as string}</text>

                    <line x1="50" y1="50" x2="50" y2="0"    strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilNorth ? (props.drawSigilColor ?? "black") : "none"} />       {/* north */}
                    <line x1="50" y1="50" x2="100" y2="0"   strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilNorthEast ? (props.drawSigilColor ?? "black") : "none"} />   {/* north east */}
                    <line x1="50" y1="50" x2="100" y2="50"  strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilEast? (props.drawSigilColor ?? "black") : "none"} />         {/* east */}
                    <line x1="50" y1="50" x2="100" y2="100" strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilSouthEast ? (props.drawSigilColor ?? "black") : "none"} />   {/* south east */}
                    <line x1="50" y1="50" x2="50" y2="100"  strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilSouth? (props.drawSigilColor ?? "black") : "none"} />        {/* south */}
                    <line x1="50" y1="50" x2="0" y2="100"   strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilSouthWest ? (props.drawSigilColor ?? "black") : "none"} />   {/* south west*/}
                    <line x1="50" y1="50" x2="0" y2="50"    strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilWest? (props.drawSigilColor ?? "black") : "none"} />         {/* west*/}
                    <line x1="50" y1="50" x2="0" y2="0"     strokeWidth="10" opacity={props.drawSigilOpacity ?? 0.6} stroke={props.drawSigil && props.drawDirection.GovernorSigilNorthWest ? (props.drawSigilColor ?? "black") : "none"} />   {/* north west*/}
        </svg>  
    )
}

export default EnochianWatchtowerSigilSquare