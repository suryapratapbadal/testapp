import React, { Fragment, useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Grid
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';

import Box from "./Box";

const Layout = React.memo(props => {

    const [grid, setGrid] = useState([]);
    const [n, setN] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);
    const [player, setplayer] = useState(["T"]);
    const [comp, setComp] = useState(["F"]);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const [alert, setAlert] = useState("")

    const handleClose = () => {
        setOpen(false)
    }

    const startTimer = (arr) => {

        let random = Math.floor(Math.random() * ((n * n) - 0))

        let tempComp = [
            ...arr.slice(0, random),
            "T",
            ...arr.slice(random + 1, arr.length + 1)
        ];

        setActive(random);
        setComp(tempComp);
        setplayer(tempComp);

        setTimeout(() => startTimer(tempComp), z * 1000);
    }
    const handlePlayerClick = (plArr) => {
        setplayer(plArr);
        setComp(plArr);
    }

    const handleBtnClick = () => {
        let tempArr = [];
        let winArr = [];
        for (let i = 0; i < n * n; i++) {

            tempArr = [
                ...tempArr,
                {
                    id: i,
                    color: i < y ? true : false
                }
            ]
            winArr.push(i < y ? "T" : "F");
        }
        setGrid(tempArr);
        setplayer(winArr);
        setComp(winArr);
        setTimeout(() => startTimer(winArr), z * 1000);
        handleClose();
    }


    useEffect(() => {
        setOpen(true);
    }, [])

    useEffect(() => {
        if (comp.length > 0 && comp.indexOf("F") === -1) {
            setAlert("Computer")
            console.log("Comp Wins");
        }

    }, [comp])

    useEffect(() => {
        if (player.length > 0 && player.indexOf("T") === -1) {
            setAlert("Player")
            console.log("Player Wins");
        }

    }, [player])

    return (
        <Fragment>
            {
                alert.length > 0 ?
                    <Alert severity="success">{alert + " Wins"}</Alert>
                    :
                    <Fragment>
                        <Dialog aria-labelledby="simple-dialog-title" open={open}>
                            <DialogTitle id="simple-dialog-title">Please Provide the following Inputs</DialogTitle>
                            <DialogContent>

                                <TextField
                                    error={n < 0 || n > 2000}
                                    required
                                    type="number"
                                    id="n"
                                    label="n"
                                    placeholder="0"
                                    helperText="Please enter value between 0 and 2000"
                                    onChange={(e) => setN(e.currentTarget.value)}
                                    style={{ width: "100%" }}
                                />
                                <TextField
                                    error={y < 0 || y > (n * n)}
                                    required
                                    type="number"
                                    id="y"
                                    label="y"
                                    placeholder="0"
                                    helperText={"Please enter value between 0 and " + n * n}
                                    onChange={(e) => setY(e.currentTarget.value)}
                                    style={{ width: "100%" }}
                                />
                                <TextField
                                    error={z < 0 || z > 5}
                                    required
                                    type="number"
                                    id="z"
                                    label="z"
                                    placeholder="0"
                                    helperText="Please enter value between 0 and 5"
                                    onChange={(e) => setZ(e.currentTarget.value)}
                                    style={{ width: "100%" }}
                                />
                                <DialogActions>
                                    <Button disabled={n <= 0 || n > 2000 || y <= 0 || y >= (n * n) || z <= 0 || z > 5} onClick={handleBtnClick}>Submit</Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                        <Grid id="container" container xs={12}>
                            {
                                grid.length > 0 && grid.map((g, i) => <Box details={g} key={i} active={active} gridNo={n} handlePlayerClick={handlePlayerClick} player={player} />)
                            }
                        </Grid>
                    </Fragment>
            }

        </Fragment>
    )
})

export default Layout;