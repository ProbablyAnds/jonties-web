import React, { useState } from 'react';
import { InputAdornment, OutlinedInput, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleMouseHover = (newIsHovered: boolean) => setIsHovered(newIsHovered);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    const showTextField = isHovered || searchText.length > 0;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'grey',
                borderRadius: '5px'
            }}
            onMouseEnter={() => handleMouseHover(true)}
            onMouseLeave={() => handleMouseHover(false)}
        >
            <IconButton>
                <SearchIcon />
            </IconButton>
            {showTextField && (
                <TextField
                    style={{
                        visibility: showTextField ? 'visible' : 'hidden',
                        paddingTop: 'initial',
                    }}
                    value={searchText}
                    onChange={handleSearchChange}
                />
            )}
        </div>
    );
};

export default SearchBar;