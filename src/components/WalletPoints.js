// src/components/WalletPoints.js
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const WalletPoints = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Balances" />
                <Tab label="History" />
            </Tabs>
            {value === 0 && <div>Your balance is $0</div>}
            {value === 1 && <div>Point history will be shown here</div>}
        </Box>
    );
};

export default WalletPoints;
