import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'

interface Props { }

const Cart: React.FC<Props> = props => {
    const isEmpty = true

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart :( Start adding some!
        </Typography>
    )

    const FilledCart = () => (
        <div>
            <Grid container spacing={3}>
                
            </Grid>
        </div>
    )

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">
                Your Shopping Cart
            </Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart