import React, { FunctionComponent } from "react";

type HideButtonProps = {
    didClick: () => void
}

const HideButton: FunctionComponent<HideButtonProps> = (props) => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", cursor: "pointer", pointerEvents: "none", opacity: "0", backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)"}}>
            <div style={{color: "white", backgroundColor: "#007AFF", padding: "8px", borderRadius: "10px"}} onClick={props.didClick}>隱藏</div>
        </div>
    )
}

export default HideButton