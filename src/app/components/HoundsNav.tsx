import React from "react";
import {
    Link,
    useHistory,
} from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    IconButton,
} from "@material-ui/core";
// import {format, addDays} from "date-fns";
import {
    ArrowBack,
    Home,
} from "@material-ui/icons";

interface HoundsNavBarProps extends React.ComponentProps<"div"> {
    title?: string,
}

/**
 * Default nav bar for views in Hounds app
 * @param props props to pass to container
 * @return {React.ReactElement} el
 */
function HoundsNavBar(props: HoundsNavBarProps) {
    return <AppBar position="sticky">
        <Toolbar>
            <BackLink>
                <IconButton>
                    <ArrowBack />
                </IconButton>
            </BackLink>
            <Grid container
                alignContent="center"
                justify="flex-start"
                direction="row">
                <Typography variant="h4"
                    color="inherit">
                    {props.title || "Hounds"}
                </Typography>
            </Grid>
            <Link to="/app/main">
                <IconButton><Home /></IconButton>
            </Link>
        </Toolbar>
    </AppBar>;
}

/**
 * @param params params
 * @return {React.ReactElement} el
 */
function BackLink({children}: React.ComponentProps<"div">): React.ReactElement {
    const history = useHistory();
    return <div onClick={history.goBack}>
        {children}
    </div>;
}

export default HoundsNavBar;
