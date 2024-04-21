import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, ButtonGroup, ClickAwayListener, FormControl, Grow, IconButton, Input, InputAdornment, InputLabel, MenuItem, MenuList, OutlinedInput, Paper, Popper } from "@mui/material";
import React from "react";
import { login, register } from "../../general/apiHandler";
import { useGlobalContext } from "../../general/globalContext";

type LoginModalProps = {
    onSuccess: () => void;
}

const LoginModal = (props: LoginModalProps) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(true);
    const [isButtonMenuOpen, setIsButtonMenuOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const { state, dispatch } = useGlobalContext();

    const handleSuccessfulLogin = (data: any) => {
        dispatch({ type: 'POST_LOGIN', payload: { userId: data._id, sessionToken: data.authentication.sessionToken } });
        console.log(state);
    }

    const anchorRef = React.useRef<HTMLDivElement>(null);

    const handleEmailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleUsernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleButtonMenuItemClick = () => {
        setIsLogin(!isLogin);
        setIsButtonMenuOpen(false);
    }

    const handleButtonMenuToggle = () => {
        setIsButtonMenuOpen(!isButtonMenuOpen);
    }

    const handleCloseButtonMenu = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setIsButtonMenuOpen(false);
    }

    const handleFormSubmit = async () => {
        console.log(username);

        const result = isLogin ? await login(email, password) : await register(email, username, password);
        console.log(result);
        if (result.status === 200) {
            handleSuccessfulLogin(result.data);
            props.onSuccess();
        }
        else {
            handleSuccessfulLogin("");
        }
    }

    const getButtonMenu = () => {
        return (
            <>
                <ButtonGroup
                    variant="contained"
                    ref={anchorRef}
                    sx={{ m: 1 }}>
                    <Button
                        onClick={handleFormSubmit}
                        sx={{ backgroundColor: 'white', color: 'black'}}>
                        {isLogin ? "Login" : "Register"}
                    </Button>
                    <Button
                        size="small"
                        aria-controls={isButtonMenuOpen ? 'split-button-menu' : undefined}
                        aria-expanded={isButtonMenuOpen ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleButtonMenuToggle}
                        sx={{ backgroundColor: 'white', color: 'black'}}>
                        {" ↓ "}
                    </Button>
                </ButtonGroup>
                <Popper
                    sx={{
                        zIndex: 11,
                    }}
                    open={isButtonMenuOpen}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseButtonMenu}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        <MenuItem
                                            disabled={isLogin}
                                            onClick={(event) => handleButtonMenuItemClick()}
                                        >
                                            {"Login"}
                                        </MenuItem>
                                        <MenuItem
                                            disabled={!isLogin}
                                            onClick={(event) => handleButtonMenuItemClick()}
                                        >
                                            {"Register"}
                                        </MenuItem>

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    paddingTop: '2%',
                    backgroundColor: 'palevioletred',
                    zIndex: '10', position: 'fixed', 
                    marginLeft: '75%', 
                    borderBottomLeftRadius: '10px', 
                    borderBottomRightRadius: '10px'
                }}
                component={'form'}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" onChange={handleEmailChanged}>
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        aria-describedby="outlined-email-helper-text"
                        label="Email"
                        value={email}
                    />
                </FormControl>

                {!isLogin &&
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" onChange={handleUsernameChanged}>
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            aria-describedby="outlined-username-helper-text"
                            label="Username"
                            value={username}
                            sx={{backgroundColor: 'white'}}
                        />
                    </FormControl>
                }

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" onChange={handlePasswordChanged}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        value={password}
                    />
                </FormControl>

                {getButtonMenu()}

            </Box>
        </>
    );
}

export default LoginModal;