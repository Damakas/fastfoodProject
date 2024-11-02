import React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, Card, CardMedia, Button, Collapse, IconButton } from "@mui/material";
import deliveryIcon from '../../resources/icons/deliveryicon.png';
import CloseIcon from '@mui/icons-material/Close';

import OrderForm from "../orderForm/OrderForm";

const BasketCard = ({ items, clearBasket, incrementCount, decrementCount, removeBasketItem }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [openBasket, setOpenBasket] = useState(true);

    const toggleBasket = () => setOpenBasket((prev) => !prev);

    const itemsContainerRef = useRef(null);

    const getBasketData = () => {
        return items.map(item => `${item.name} х${item.count}`);
    };

    useEffect(() => {
        if (itemsContainerRef.current) {
            itemsContainerRef.current.scrollTop = itemsContainerRef.current.scrollHeight;
        }
    }, [items]);

    const EmptyBasket = (
        <Typography sx={{ textAlign: 'left', paddingTop: '15px' }}>Тут пока пусто ;(</Typography>
    );

    const result = items.reduce((acc, current) => acc + (parseFloat(current.price) * current.count), 0);
    const totalItemsCount = items.reduce((total, item) => total + item.count, 0);

    const itemList = items.map((item, index) => (
        <Box key={index} sx={{
            display: 'flex',
            minWidth: '300px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '28px 0 15px',
            position: 'relative',
            overflowX: 'hidden',
        }}>

            <Box sx={{ display: 'flex', margin: '0 ', padding: '0', }}>
                <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.name}
                    sx={{ width: "65px", borderRadius: '8px' }}
                />
                <Box sx={{ textAlign: "left", fontSize: '12px', paddingLeft: "6px" }}>
                    <Typography sx={{ fontSize: "12px", }}>{item.name}</Typography>
                    <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>{item.weight}г</Typography>
                    <Typography sx={{ fontSize: "12px" }}>{item.price}₽</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Button onClick={() => decrementCount(item.id)} sx={{
                    padding: 0,
                    margin: 0,
                    color: 'black',
                    minWidth: 'auto',
                    fontWeight: '400',
                    '&:hover': {
                        transform: 'scale(1.3)'
                    },
                    '&:active': {
                        transform: 'scale(0.98)'
                    }
                }}>-</Button>

                <span style={{ fontWeight: '600' }}>{item.count}</span>
                <Button onClick={() => incrementCount(item.id)} sx={{
                    padding: 0,
                    margin: 0,
                    color: 'black',
                    minWidth: 'auto',
                    fontWeight: '400',
                    '&:hover': {
                        transform: 'scale(1.3)'
                    },
                    '&:active': {
                        transform: 'scale(0.98)'
                    }
                }}>+</Button>
            </Box>
            <Button
                disableRipple
                sx={{
                    position: 'absolute',
                    right: '-25px',
                    top: '0',
                }}
                onClick={() => removeBasketItem(item.id)}
            >
                <IconButton
                    aria-label="close"
                    sx={{
                        width: '20px',

                    }}
                >
                    <CloseIcon sx={{ fontSize: 15 }} />
                </IconButton>
            </Button>
        </Box>
    ));

    return (
        <>
            <Box component="div" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': {
                    transition: '0.5s',
                    boxShadow: '0px 5px 32px -3px rgba(255, 146, 0, 0.63) ',
                }
            }}
                onClick={toggleBasket}>
                <Typography variant="h5">Корзина</Typography>
                <Typography sx={{ fontSize: '12px', }}>{totalItemsCount}</Typography>
            </Box>
            <Card sx={{
                minWidth: '300px',
                boxShadow: "none",
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky ',
                top: '50px'
            }}>

                <Collapse in={openBasket}>
                    {items.length > 0 ? (
                        <>
                            <Box
                                ref={itemsContainerRef}
                                sx={{
                                    maxHeight: items.length > 4 ? '400px' : 'auto',
                                    overflowY: items.length > 4 ? 'auto' : 'visible',
                                    pr: 2,
                                    '&::-webkit-scrollbar': {
                                        width: '5px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#FF7020',
                                        borderRadius: '5px',
                                    },
                                }}
                            >
                                {itemList}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'black', margin: '15px 0 25px' }}>
                                <Typography >
                                    Итого:
                                </Typography>
                                {result < 2000 ? result + 500 : result}₽
                            </Box>

                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    textTransform: 'none',
                                    backgroundColor: '#FF7020',
                                    borderRadius: '12px',
                                    marginBottom: '8px'
                                }}
                                onClick={openModal}>
                                Оформить заказ
                            </Button>

                            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <img src={deliveryIcon} alt="delivery" />
                                <Typography sx={{ fontSize: '12px' }}>
                                    {result > 2000 ? 'Бесплатная доставка' : 'Стоимость доставки 500₽'}
                                </Typography>
                            </Box>
                        </>
                    ) : EmptyBasket}
                </Collapse>
                <OrderForm
                    open={isModalOpen}
                    handleClose={closeModal}
                    getBasketData={getBasketData}
                    clearBasket={clearBasket}
                />
            </Card>

        </>
    );
}

export default BasketCard;
