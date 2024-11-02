import React from "react";
import { Box, Typography, Link, IconButton, createTheme, useMediaQuery } from '@mui/material';
import footerLogo from '../../resources/footerLogo.png';
import phoneIcon from '../../resources/phone.png';
import odnoklassnikiIcon from '../../resources/odnoklassniki.png';
import telegramIcon from '../../resources/telegram.png';

const theme = createTheme();

const AppFooter = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isMobile ? 'center' : 'space-between',
                padding: isMobile ? '50px 20px' : '100px 130px',

            }}
        >
            <Box sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? '50px' : 0 }}>
                <Link href='/'>
                    <img src={footerLogo} alt="logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '60px' }} />
                </Link>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    © YouMeal, 2022 <br /> Design: Anastasia Ilina
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-start',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: isMobile ? '20px' : '125px',
            }}>
                <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <Typography variant="h6" sx={{ fontSize: '24px', marginBottom: '10px' }}>
                        Номер для заказов
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                    }}>
                        <img src={phoneIcon} alt="phone" style={{ width: '20px' }} />
                        <Link href="tel:+79308333811" underline="none" color="inherit">
                            +7 (930) 833-38-11
                        </Link>
                    </Box>
                </Box>

                <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <Typography variant="h6" sx={{ fontSize: '24px', marginBottom: '10px' }}>
                        Мы в соцсетях
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '16px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                        <IconButton component="a" href="#" aria-label="odnoklassniki">
                            <img src={odnoklassnikiIcon} alt="odnoklassniki" style={{ width: '36px' }} />
                        </IconButton>
                        <IconButton component="a" href="#" aria-label="telegram">
                            <img src={telegramIcon} alt="telegram" style={{ width: '36px' }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AppFooter;
