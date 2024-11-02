import React from "react";
import logoHeader from '../../resources/logoHeader.png';
import burgerHeader from '../../resources/burger.png';
import { Box, Typography, Link } from '@mui/material';
import bgHeader from '../../resources/bgHeader.png';

const AppHeader = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                padding: 2,
                backgroundImage: `url(${bgHeader})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                minHeight: '65vh',
                backgroundPosition: 'center',

            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                width="100%"
            >
                <Link href='/'>
                    <img src={logoHeader} alt="logo" style={{ maxWidth: '100%', height: 'auto' }} />
                </Link>

            </Box>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: 2, paddingTop: '20px' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        order: { xs: 1, md: 0 },
                    }}
                >
                    <img src={burgerHeader} alt="burger" style={{ maxWidth: '100%', height: 'auto', paddingRight: '20px' }} />
                </Box>
                <Box
                    textAlign={{ xs: 'center', md: 'left' }}
                    sx={{ marginLeft: { md: 2 }, order: { xs: 0, md: 1 } }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '30px', md: '50px' } }}
                    >
                        Только самые
                        <br /> <span style={{ color: '#FF5C00' }}>сочные бургеры!</span>
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1, color: 'white', paddingTop: '50px' }}>
                        Бесплатная доставка от 2000₽
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AppHeader;

