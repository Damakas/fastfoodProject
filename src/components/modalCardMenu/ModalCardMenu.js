import { useState, useEffect } from 'react';
import { Box, Button, Typography, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import closeCross from '../../resources/icons/closecross.png';

const ModalCardMenu = ({ open, handleClose, selectedItem, addToBasket }) => {
    const [localCount, setLocalCount] = useState(1);

    useEffect(() => {
        if (open && selectedItem) {
            setLocalCount(1);
        }
    }, [open, selectedItem]);

    const handleAddToBasket = () => {
        if (selectedItem) {
            addToBasket({ ...selectedItem, count: localCount });
            handleClose();
        }
    };

    const incrementLocalCount = () => {
        setLocalCount((prevCount) => prevCount + 1);
    };

    const decrementLocalCount = () => {
        setLocalCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '24px',
                    maxWidth: '685px',
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <DialogTitle sx={{ fontSize: { xs: '24px', md: '40px' }, fontWeight: '600', paddingBottom: '0' }}>
                    {selectedItem?.name}
                </DialogTitle>
                <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
                    <img src={closeCross} alt="close cross" />
                </Button>
            </Box>

            <DialogContent sx={{
                display: 'flex',
                alignItems: 'center',
                '@media (max-width: 760px)': {
                    flexDirection: 'column'
                },
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingRight: '10px' }}>
                    <CardMedia
                        component="img"
                        height="220"
                        image={selectedItem?.img}
                        alt={selectedItem?.name}
                        sx={{ borderRadius: '16px', width: '275px', height: 'auto' }}
                    />
                </Box>
                <Box sx={{ flex: 1, paddingLeft: '10px' }}>
                    <Typography sx={{ margin: '10px 0', color: 'black', lineHeight: '21px' }}>
                        {selectedItem?.description}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'black' }}>
                        <Box marginBottom={0.5}>
                            <strong>Состав:</strong>
                        </Box>
                        {selectedItem?.composition?.split(/[s,;]+/).map((ingredient, index) => (
                            <div key={index}>{ingredient}</div>
                        ))}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: '4px', fontSize: '12px' }}>
                        {selectedItem?.weight}г, ккал {selectedItem?.kkal}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0 36px 20px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '@media (max-width : 760px)': {
                            flexDirection: 'column-reverse',
                        }
                    }}>
                    <Button
                        sx={{
                            textTransform: 'none',
                            color: 'white',
                            backgroundColor: '#FF7020',
                            padding: '11px 32px',
                            minWidth: '275px',
                            borderRadius: '12px',
                        }}
                        onClick={handleAddToBasket}
                    >
                        Добавить
                    </Button>
                    <Box sx={{
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                    }}>
                        <Button onClick={decrementLocalCount} disableRipple sx={{
                            color: 'black', '&:hover': {
                                transform: 'scale(1.3)',
                                '&:active': {
                                    transform: 'scale(0.98)'
                                }
                            }
                        }}>-</Button>
                        <span>{localCount}</span>
                        <Button onClick={incrementLocalCount} disableRipple sx={{
                            color: 'black', '&:hover': {
                                transform: 'scale(1.3)',
                                '&:active': {
                                    transform: 'scale(0.98)'
                                }
                            }
                        }}>+</Button>
                    </Box>
                    <Typography sx={{
                        fontSize: "24px",
                        fontWeight: '600',
                        paddingRight: '24px',
                        position: 'absolute',
                        right: '0'
                    }}>{selectedItem?.price}₽</Typography>
                </Box>

            </DialogActions>
        </Dialog>
    );
}

export default ModalCardMenu;