import { AccountBox } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../general/globalContext';

const AccountDropdown = () => {
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchor);
    const navigate = useNavigate();
    const { dispatch } = useGlobalContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setMenuAnchor(null);
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/");
        handleClose();
    }   

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ backgroundColor: 'white', color: 'black', margin: '2px'}}
            >
                <AccountBox sx={{ color: 'black' }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={menuAnchor}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
                <MenuItem onClick={() => navigate("/orders")}>Orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default AccountDropdown;