import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import { ProductsArr } from '../Products'

import useStyles from './styles'

interface Props {
    product: ProductsArr
    onAddToCart: (productId: number, quantity: number) => Promise<void>
}

const Product: React.FC<Props> = (props: Props) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={props.product.image} title={props.product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {props.product.name}
                    </Typography>
                    <Typography variant="h5">
                        {props.product.price}$
                    </Typography>
                </div>
                    <Typography variant="body2" color="textSecondary">
                        {props.product.description}
                    </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={()=>{alert("ahaha")}}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default Product