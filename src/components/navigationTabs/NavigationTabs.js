import React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import { data } from '../../data';

const NavigationTabs = ({ value, setValue, ...props }) => {
    const theme = useTheme();

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            sx={{
                paddingTop: "50px",
                borderBottom: 'none',
                width: '100%',
                overflowX: 'auto',
                '& .MuiTabs-indicator': {
                    display: 'none',
                },

            }}
        >
            {data.tabData.map((tab, index) => (
                <Tab
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexGrow: '1',
                        textTransform: 'none',
                        fontSize: '16px',
                        color: 'black',
                        backgroundColor: value === index ? '#FFAB08' : 'none',
                        minHeight: '40px',
                        borderRadius: '50px',
                        margin: { lg: '0 25px', md: '0 10px' },
                        boxSizing: 'border-box',
                        transition: theme.transitions.create(['background-color', 'transform'], {
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            transform: value === index ? 'none' : 'scale(0.95)'
                        },
                        '&.Mui-selected': {
                            color: 'black',
                        },
                    }}
                    icon={<img style={{ marginRight: '8px' }} src={tab.icon} alt="icon" />}
                    label={tab.label}
                    key={index}
                    {...a11yProps(index)}
                    {...props}
                    onClick={(e) => handleChange(e, index)}
                />
            ))}
        </Tabs>


    );
};

export default NavigationTabs;

