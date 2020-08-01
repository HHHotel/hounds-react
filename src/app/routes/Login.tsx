import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
    Container,
    CssBaseline,
    Avatar,
    Typography,
    OutlinedInput,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link as Anchor,
    IconButton,
    CircularProgress,
    // eslint-disable-next-line
    Theme,
    InputAdornment,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@material-ui/core";
import { Settings, LockOutlined, Visibility } from "@material-ui/icons";
import * as api from "@happyhoundhotel/hounds-ts";
import { ApiConfigContext, SettingsContext } from "../contexts";

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

export interface LoginInfo {
    username: string;
    password: string;
}

interface LoginProps {
    onLogin?: (auth: LoginInfo, saveSettings?: boolean) => void;
}

/**
 * @param {LoginProps} props element props
 * @return {ReactElement} react element to render
 */
function HoundsLogin(props: LoginProps) {
    const classes = useStyles();
    const { settings } = React.useContext(SettingsContext);
    const { updateApiAuth } = React.useContext(ApiConfigContext);

    const [user, setUser] = React.useState({} as any);
    const [loading, setLoading] = React.useState(false);
    const [passHidden, setPassHidden] = React.useState(true);
    const [loginFailed, setFailed] = React.useState(false);

    const showPass = () => setPassHidden(false);
    const hidePass = () => setPassHidden(true);

    const updateUsername = (ev: any) => {
        setUser({ ...user, username: ev.target.value });
    };
    const updatePassword = (ev: any) => {
        setUser({ ...user, password: ev.target.value });
    };
    const updateRemberMe = (ev: any) => {
        setUser({ ...user, remember: ev.target.value });
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFailed(false);
        setLoading(true);
        try {
            const auth = await api.login(
                user.username,
                user.password,
                settings.apiUrl
            );

            return updateApiAuth(auth, user.remember);
        } catch (err) {
            setLoading(false);
            setFailed(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={onSubmit} noValidate>
                    <TextField
                        onChange={updateUsername}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="hounds-username"
                        autoFocus
                        error={loginFailed}
                    />
                    <FormControl required variant="outlined" fullWidth>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            onChange={updatePassword}
                            name="password"
                            label="Password"
                            type={passHidden ? "password" : "text"}
                            error={loginFailed}
                            id="password"
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onMouseDown={showPass}
                                        onMouseUp={hidePass}
                                    >
                                        <Visibility />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={loginFailed}>
                            {loginFailed && "Login Failed"}
                        </FormHelperText>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={updateRemberMe}
                                value="remember"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {!loading && "Sign In"}
                        {loading && <CircularProgress color="inherit" />}
                    </Button>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Anchor href="#">Forgot password?</Anchor>
                        </Grid>

                        <Grid item>
                            <Link to="/app/settings">
                                <IconButton>
                                    <Settings />
                                </IconButton>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default HoundsLogin;
