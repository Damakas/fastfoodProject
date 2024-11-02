import { useState } from 'react';
import ModalCardMenu from '../modalCardMenu/ModalCardMenu';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Button, } from "@mui/material";




export default function CardMenu({ items, addToBasket, incrementCount, decrementCount, count }) {

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            {items.map((item) => (
                <Card
                    key={item.id}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifySelf: 'center',
                        width: 300,
                        boxShadow: 'none',
                        margin: '10px',
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'scale(0.98)',
                            boxShadow: '4px 4px 15px 0px rgba(232, 144, 0, 0.67)'
                        },
                    }}

                >
                    <CardActionArea sx={{

                    }} onClick={() => handleOpen(item)} >
                        <CardMedia
                            component="img"
                            height="220"
                            image={item.img}
                            alt={item.name}
                            sx={{
                                borderRadius: '20px',
                                minWidth: '275px',
                                padding: '12px',

                            }}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                sx={{ display: 'flex', fontWeight: '400' }}
                            >
                                {`${item.price}₽`}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'black', display: 'flex', fontSize: '16px' }}
                            >
                                {item.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', display: 'flex', fontSize: '16px', margin: '30px 0 0' }}
                            >
                                {`${item.weight}г`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Button
                        sx={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontSize: '16px',
                            color: 'black',
                            '&:hover': {
                                background: 'linear-gradient(135deg, rgb(238, 225, 123), rgb(255, 116, 7));',
                            },
                            '&:active': {
                                transform: 'scale(0.95)'
                            }
                        }}
                        onClick={() => addToBasket(item)}>
                        Добавить
                    </Button>
                </Card>

            ))}
            <ModalCardMenu
                open={open}
                count={count}
                handleClose={handleClose}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                decrementCount={decrementCount}
                incrementCount={incrementCount}
                addToBasket={addToBasket}
            />

        </>
    );
}
