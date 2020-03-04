// Basically its a search -> newevent form so yeah memes -> repeat thing

export default "boo";

// import React from "react";
//
// import {
//     // eslint-disable-next-line
//     FormEvent,
// } from "react";
//
// import {
//     FormControl,
//     Grid,
//     Button,
//     TextField,
//     makeStyles,
//     Select,
//     // eslint-disable-next-line
//     Theme,
// } from "@material-ui/core";
//
// import {
//     DateTimePicker,
// } from "@material-ui/pickers";
//
// // eslint-disable-next-line
// import * as api from "@happyhoundhotel/hounds-ts";
//
// import {ApiConfig} from "../..";
//
// const useStyles = makeStyles((theme: Theme) => ({
//     formWrapper: {
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignContent: "center",
//     },
//     formItem: {
//         margin: theme.spacing(1, 0),
//     },
//     dateInputs: {
//         margin: theme.spacing(0, 1, 1, 1),
//         width: "45%",
//     },
// }));
//
// interface BookingFormProps {
//     onSubmit: () => void
// }
//
// /**
//  * @param {BookingFormProps} props
//  * @return {React.ReactElement} Element to render
//  * */
// function BookingForm(props: BookingFormProps) {
//     const classes = useStyles();
//
//     const [start, setStart] = React.useState(null as any);
//     const [end, setEnd] = React.useState(null as any);
//     const [type, setType] = React.useState("");
//     const apiAuth = React.useContext(ApiConfig);
//
//     const updateStart = (ustart: Date | null) => {
//         if (!ustart) {
//             return;
//         }
//         setStart(ustart as any as Date);
//     };
//     const updateEnd = (uend: Date | null) => {
//         if (!uend) {
//             return;
//         }
//         setEnd(uend as any as Date);
//     };
//
//     const onSubmit = (event: FormEvent) => {
//         event.preventDefault();
//
//         setStart(null);
//         setEnd(null);
//         setType("booking");
//         props.onSubmit();
//     };
//
//     return <>
//     </>;
// }
//
// export default BookingForm;
