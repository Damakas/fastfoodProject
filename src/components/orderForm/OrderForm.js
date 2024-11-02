import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Typography, TextField, Modal, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import * as Yup from "yup";
import closeCross from '../../resources/icons/closecross.png';
import donut from '../../resources/donut.png';

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Имя обязательно")
        .min(2, "Имя должно быть не менее 2 символов"),
    tel: Yup.string()
        .required("Телефон обязателен")
        .matches(
            /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?[\d-.\s]{7,10}$/,
            "Введите корректный номер телефона"
        ),
    address: Yup.string().when('deliveryMethod', {
        is: 'delivery',
        then: validationSchema => validationSchema.required('Адрес обязателен'),
        otherwise: validationSchema => validationSchema.optional(),
    }),
});

const OrderForm = ({ open, handleClose, getBasketData, clearBasket }) => {
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');

    const handleDeliveryChange = (event) => {
        setDeliveryMethod(event.target.value);
        formik.setFieldValue("deliveryMethod", event.target.value);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            tel: '',
            address: '',
            deliveryMethod: 'delivery',
            floor: '',
            intercome: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const basketData = getBasketData();

            const finalValues = {
                ...values,
                basket: basketData,
            }

            alert(JSON.stringify(finalValues, null, 2));
            handleClose();
            formik.resetForm();
            clearBasket();
        },
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Box component="div" sx={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: '685px',
                minHeight: '600px',
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'relative',
                '@media (max-width: 600px)': {

                },
            }}>
                <Box sx={{
                    minWidth: '340px',
                    backgroundColor: '#FFAB08',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    '@media (max-width: 600px)': {
                        display: 'none',
                    },
                }}>
                    <img src={donut} alt="Donut" style={{ maxWidth: '100%' }} />
                </Box>

                <form
                    onSubmit={formik.handleSubmit}
                    style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '345px',
                    }}>

                    <Typography
                        variant='h4'
                        sx={{
                            marginTop: '45px',
                            marginBottom: '16px',
                            '@media (max-width: 600px)': {
                                display: 'flex',
                                marginTop: '20px',
                                textAlign: 'center',
                            },
                        }}>
                        {deliveryMethod === 'delivery' ? 'Доставка' : "Самовывоз"}
                    </Typography>

                    <Button
                        onClick={handleClose}
                        sx={{
                            textTransform: 'none',
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            '@media (max-width: 600px)': {
                                top: '25px',
                                right: '0',

                            },
                        }}>
                        <img src={closeCross} alt="close cross" />
                    </Button>

                    <TextField
                        fullWidth
                        variant="standard"
                        id="name"
                        label="Ваше имя"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{
                            marginBottom: '8px',
                            '& .MuiInput-underline:before': { borderBottom: 'none' },
                        }}
                    />

                    <TextField
                        fullWidth
                        id="tel"
                        name="tel"
                        variant="standard"
                        label="Телефон"
                        type="tel"
                        value={formik.values.tel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.tel && Boolean(formik.errors.tel)}
                        helperText={formik.touched.tel && formik.errors.tel}
                        sx={{
                            marginBottom: '8px',
                            '& .MuiInput-underline:before': { borderBottom: 'none' },
                        }}
                    />

                    <RadioGroup
                        aria-labelledby="delivery method"
                        name="deliveryMethod"
                        value={deliveryMethod}
                        onChange={handleDeliveryChange}
                        row
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '15px',
                            justifyContent: 'center'
                        }}
                    >
                        <FormControlLabel value="pickup" control={<Radio />} label="Самовывоз" />
                        <FormControlLabel value="delivery" control={<Radio />} label="Доставка" />
                    </RadioGroup>

                    {deliveryMethod === 'delivery' && (
                        <>
                            <TextField
                                fullWidth
                                id="address"
                                name="address"
                                variant="standard"
                                label="Улица,дом,квартира"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                sx={{
                                    marginBottom: '8px',
                                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                                gap: '20px',
                                flexDirection: { xs: 'column', sm: 'row' },
                                position: 'relative'
                            }}>
                                <TextField
                                    fullWidth
                                    id="floor"
                                    name="floor"
                                    variant="standard"
                                    label="Этаж"
                                    value={formik.values.floor}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{
                                        marginBottom: '8px',
                                        '& .MuiInput-underline:before': { borderBottom: 'none' },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    id="intercome"
                                    name="intercome"
                                    variant="standard"
                                    label="Домофон"
                                    value={formik.values.intercome}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{
                                        marginBottom: '8px',
                                        '& .MuiInput-underline:before': { borderBottom: 'none' },
                                    }}
                                />

                            </Box>

                        </>
                    )}
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#FF7020',
                            minWidth: '295px',
                            height: '40px',
                            borderRadius: '12px',
                            position: 'absolute',
                            bottom: '25px'
                        }}>
                        Оформить
                    </Button>
                </form>

            </Box>
        </Modal>
    );
};

export default OrderForm;
