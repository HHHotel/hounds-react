import React from "react";

import {
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Toolbar,
    Divider,
    IconButton,
    Container,
    makeStyles,
    createStyles,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    Person,
    Settings,
} from "@material-ui/icons";

import {
    Calendar,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

import {HoundsSearch} from "../components";
import {ApiConfig} from "../..";

const useStyles = makeStyles((theme: Theme) => createStyles({
    sidebarCalender: {
        padding: theme.spacing(1),
    },
    settingsButton: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    avatarLabel: {
        marginLeft: theme.spacing(0),
        color: theme.palette.grey.A400,
    },
}));

interface SidebarProps {
    onDateChange?: (date: Date) => void
    logout: () => void
}

/**
 * @param {SidebarProps} props object to determine render
 * @return {React.ReactElement} React element to render
 */
function HoundsSidebar(props: SidebarProps) {
    // eslint-disable-next-line
    const apiConfig = React.useContext(ApiConfig);
    const classes = useStyles();
    const [date, updateDate] = React.useState(new Date());

    const onDateChange = (udate: Date | null) => {
        if (props.onDateChange) {
            const d = udate || date;
            props.onDateChange(d);
        }

        if (!udate) {
            return;
        }
        updateDate(udate);
    };

    return <>
        <Toolbar>
            { /* TODO User Profiles */ }
            <ProfileMenu logout={props.logout} openProfile={() => {}}/>
            <Typography className={classes.avatarLabel} variant="h6">
                {apiConfig.apiAuth.username}
            </Typography>
            <div style={{width: "100%"}}/>
            <IconButton edge="end"className={classes.settingsButton}>
                <Settings />
            </IconButton>
        </Toolbar>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container className={classes.sidebarCalender}>
                <Calendar
                    date={date}
                    onChange={onDateChange}/>
            </Container>
            <Divider />
            <HoundsSearch />
        </MuiPickersUtilsProvider>
    </>;
}

// eslint-disable-next-line
function ProfileMenu({logout, openProfile}: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutAndClose = () => {
        handleClose();
        logout();
    };

    const openProfileAndClose = () => {
        handleClose();
        openProfile();
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <Avatar>
                    <Person />
                </Avatar>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={openProfileAndClose}>My Account</MenuItem>
                <MenuItem onClick={logoutAndClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default HoundsSidebar;
