import React from "react";
import {
    makeStyles,
    Container,
    CssBaseline,
    Avatar,
    Typography,
    Grid,
    TextField,
    Link,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";
import {
    Settings,
    LockOutlined,
} from "@material-ui/icons";
import {
    // eslint-disable-next-line
    ReactElement,
    // eslint-disable-next-line
    FormEvent,
    // eslint-disable-next-line
    ChangeEvent,
} from "react";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
// eslint-disable-next-line
import {HoundsSettings} from "../util/settings/SettingsProvider";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface LoginProps {
    onLogin: (auth: api.IHoundAuth, saveSettings?: boolean) => void
    settings: HoundsSettings
}

/**
 * @param {LoginProps} props
 * @return {ReactElement} react element to render
 */
function HoundsLogin(props: LoginProps): ReactElement {
    // eslint-disable-next-line
    const classes = useStyles();

    const [user, updateUser] = React.useState({} as any);

    const updateUsername = (ev:any) => {
        updateUser({...user, username: ev.target.value});
    };

    const updatePassword = (ev:any) => {
        updateUser({...user, password: ev.target.value});
    };

    const updateRemberMe = (ev:any) => {
        updateUser({...user, remember: ev.target.value});
    };

    // eslint-disable-next-line
    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        const auth = await api.login(
            user.username,
            user.password,
            props.settings.apiUrl,
        );

        props.onLogin(auth, user.remember);
    }

    return <>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
          Sign in
                </Typography>
                <form className={classes.form}
                    onSubmit={onSubmit}
                    noValidate>
                    <TextField onChange={updateUsername}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="hounds-username"
                        autoFocus
                    />
                    <TextField onChange={updatePassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox onChange={updateRemberMe}
                                value="remember" color="primary"
                            />
                        }
                        label="Remember me"/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
            Sign In
                    </Button>
                    <Grid container
                        alignItems="center">
                        <Grid item>
                            <Link href="#" variant="body2">
                Forgot password?
                            </Link>
                        </Grid>

                        <Grid item>
                            <IconButton
                                onClick={() =>
                                    window.location.pathname = "/settings"}>
                                <Settings />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    </>;
}
export default HoundsLogin;
