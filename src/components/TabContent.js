// src/components/TabContent.js
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TaskList from './TaskList';

const TabContent = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="New" />
                <Tab label="Completed" />
                <Tab label="Unfulfilled" />
            </Tabs>
            {value === 0 && <TaskList type="new" />}
            {value === 1 && <TaskList type="completed" />}
            {value === 2 && <TaskList type="unfulfilled" />}
        </Box>
    );
};

export default TabContent;
