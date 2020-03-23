import React from "react";
import {
    makeStyles,
} from "@material-ui/styles";
import {
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Toolbar,
    Divider,
    IconButton,
    Container,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";
import {
    Person,
    Settings,
} from "@material-ui/icons";
import {
    Calendar,
} from "@material-ui/pickers";
import {
    useHistory,
    Link,
} from "react-router-dom";

import { HoundsSearch } from "../../components/HoundsSearch";
import { ApiConfigContext } from "../../contexts";

const useStyles = makeStyles((theme: Theme) => ({
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
    fullWidth: {
        width: "100%",
    },
}));

interface SidebarProps {
    onDateChange?: (date: Date) => void
    initDate?: Date
}

/**
 * @param {SidebarProps} props object to determine render
 * @return {React.ReactElement} React element to render
 */
function HoundsSidebar(props: SidebarProps) {
    // eslint-disable-next-line
    const {apiConfig, setAuth} = React.useContext(ApiConfigContext);
    const history = useHistory();
    const classes = useStyles();
    const [date, updateDate] = React.useState(props.initDate || new Date());

    const logout = () => {
        history.replace("/login");
        setAuth(null);
    };

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
            { /* TODO User Profiles */}
            <ProfileMenu logout={logout} openProfile={() => { }} />
            <Typography className={classes.avatarLabel} variant="h6">
                {apiConfig.apiAuth.username}
            </Typography>
            <div className={classes.fullWidth} />
            <Link to="/app/settings">
                <IconButton edge="end" className={classes.settingsButton}>
                    <Settings />
                </IconButton>
            </Link>
        </Toolbar>
        <Container className={classes.sidebarCalender}>
            <Calendar
                date={date}
                onChange={onDateChange} />
        </Container>
        <Divider />
        <HoundsSearch onSelect={(item: any) => {
            if (!item.name) {
                return;
            }
            history.push(`/app/profile/${item.id}`);
        }}/>
    </>;
}

// eslint-disable-next-line
function ProfileMenu({ logout, openProfile }: any) {
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
