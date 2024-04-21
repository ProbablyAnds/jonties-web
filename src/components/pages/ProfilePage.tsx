import { Box, Button, FormControl, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductList from '../elements/BasketList';
import { useGlobalContext } from '../../general/globalContext';
import { useNavigate } from 'react-router-dom';
import { Account } from '../../@types/account';
import { getAccountById, updateAccountUsername } from '../../general/apiHandler';
import { Save } from '@mui/icons-material';

const ProfilePage = () => {
    const [currentAccount, setCurrentAccount] = useState<Account>({} as Account);
    const { dispatch, state } = useGlobalContext();
    const navigate = useNavigate();

    const handleUsernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAccount({ ...currentAccount, username: event.target.value });
    }

    useEffect(() => {
        const tryFetchAccount = async () => {
            if (!Boolean(state.userId)) {
                navigate('/')
            }
            else {
                await setCurrentAccount(await getAccountById(state.userId, state.sessionToken));
                console.log(currentAccount);
            }
        };

        tryFetchAccount();
    }, []);

    const handleFormSubmit = async () => {
        await updateAccountUsername(state.userId, currentAccount.username, state.sessionToken);
    }

    return (
        <Box
            sx={{
                //height: '100vh', // 100% of the viewport height
                width: '70%', // 70% of the viewport width
                marginX: 'auto', // Center horizontally
                backgroundColor: 'whitesmoke', // Use theme's primary color, customizable
                display: 'grid',
                //alignItems: 'normal', // Center content vertically inside the box
                //justifyContent: 'center', // Center content horizontally inside the box
                boxSizing: 'border-box', // Includes padding and border in the element's total width and height
                padding: '3%',
                borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'
            }}
        >
            <h1>Profile</h1>
            <FormControl sx={{ m: 1 }} >
                <TextField
                    variant="filled"
                    size="small"
                    id="outlined-adornment-email"
                    aria-describedby="outlined-email-helper-text"
                    label="Email"
                    value={currentAccount?.email}
                    name='email'
                    defaultValue={' '}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined" onChange={handleUsernameChanged}>
                <TextField
                    id="outlined-adornment-username"
                    aria-describedby="outlined-username-helper-text"
                    label="Username"
                    value={currentAccount?.username}
                    defaultValue={' '}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <TextField
                    id="outlined-adornment-role"
                    aria-describedby="outlined-role-helper-text"
                    label="Role"
                    value={currentAccount?.role}
                    variant="filled"
                    defaultValue={' '}
                />
            </FormControl>
            <Button
                sx={{ backgroundColor: "orange", color: "white" }}
                onClick={handleFormSubmit}>
                <Save fontSize='large' />
            </Button>
        </Box>
    );
};

export default ProfilePage;