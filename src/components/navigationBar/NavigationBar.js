import { useState } from 'react';
import PropTypes from 'prop-types';
import CardMenu from '../cardMenu/CardMenu';
import BasketCard from '../basketCard/BasketCard';
import NavigationTabs from '../navigationTabs/NavigationTabs';
import { useMediaQuery, createTheme, Box, Typography, } from '@mui/material';
import { data } from '../../data';

const theme = createTheme();

function CustomTabPanel(props) {
    const { children, value, index, label, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3" sx={{ padding: '50px 20px 24px', alignSelf: 'flex-start' }}>{label}</Typography>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};

export default function BasicTabs() {
    const [value, setValue] = useState(0);
    const [basketItems, setBasketItems] = useState([]);
    const [count, setCount] = useState(0);

    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const incrementCount = (itemId) => {
        setBasketItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, count: item.count + 1 } : item
            )
        );
        setCount((prevCount) => prevCount + 1);
    };

    const decrementCount = (itemId) => {
        setBasketItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item => item.id === itemId);

            if (itemIndex !== -1 && prevItems[itemIndex].count > 0) {
                const newCount = prevItems[itemIndex].count - 1;

                if (newCount < 1) {
                    return prevItems.filter(item => item.id !== itemId);
                }

                return prevItems.map((item, index) =>
                    index === itemIndex ? { ...item, count: newCount } : item
                );
            }
            return prevItems;
        });
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };



    const addToBasket = (item) => {
        setBasketItems((prevItems) => {
            const existingItem = prevItems.find((basketItem) => basketItem.id === item.id);

            if (existingItem) {
                return prevItems.map((basketItem) =>
                    basketItem.id === item.id
                        ? { ...basketItem, count: basketItem.count + item.count }
                        : basketItem
                );
            } else {
                return [...prevItems, { ...item, count: item.count }];
            }
        });
    };

    const clearBasket = () => {
        setBasketItems([]);
    }

    const removeBasketItem = (id) => {
        setBasketItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: 'none',
            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',
            padding: isMobile ? '0 ' : '0 75px',
        }}>

            <NavigationTabs setValue={setValue} value={value} />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr ' : '300px 1fr',
                width: '100%',
                justifyContent: 'space-between',

            }}>
                <Box sx={{
                    justifySelf: 'center',
                    paddingTop: isMobile ? '50px' : '200px',
                }}>
                    <BasketCard
                        items={basketItems}
                        removeBasketItem={removeBasketItem}
                        clearBasket={clearBasket}
                        incrementCount={incrementCount}
                        decrementCount={decrementCount}
                        count={count}
                    />
                </Box>

                {data.tabData.map((tab, index) => (
                    <CustomTabPanel key={index} value={value} index={index}>
                        <Typography variant='h3' sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-start' }, marginLeft: '10px', }}>
                            {tab.label}
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', }}>
                            <CardMenu
                                items={data[tab.key]}
                                addToBasket={addToBasket}
                                incrementCount={incrementCount}
                                decrementCount={decrementCount}
                                count={count}
                            />
                        </Box>
                    </CustomTabPanel>
                ))}

            </Box>
        </Box >
    );
}
