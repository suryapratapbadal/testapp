import React, { Fragment, useEffect, useState } from "react";

const Box = React.memo(props => {

    const { details, active, gridNo, handlePlayerClick, player } = props;
    const [color, setColor] = useState(details.color);

    const handleClick = () => {
        let tempArr = [
            ...player.slice(0, details.id),
            "F",
            ...player.slice(details.id + 1, player.length + 1)
        ];
        handlePlayerClick(tempArr)
        setColor(false);
    }

    useEffect(() => {
        if (active === details.id)
            setColor(true)
    }, [active])




    return (
        <Fragment>
            <div style={{ width: document.getElementById("container").offsetWidth / gridNo - 15, height: 100, backgroundColor: color ? "lightblue" : "lightgrey", border: "1px solid black", borderRadius: 5, display: "inline-block", float: "left", marginLeft: "auto", marginRight: "auto", marginBottom: 4 }} onClick={handleClick}>
                In Box
            </div>

        </Fragment>
    )
});

export default Box;