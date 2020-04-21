import React, { useEffect, useState } from "react";

export function SortResponse(props) {
    let [text, setText] = useState("");

    return <div className="Response"><b style = {{color:"white", fontSize:"25px"}}>{text}</b></div>;
}