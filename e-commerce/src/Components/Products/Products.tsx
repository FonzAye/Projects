import React from 'react'
import { Grid } from '@material-ui/core'

import Product from './Product/Product'
import useStyles from './styles'

interface Props {
    products: ProductsArr[]
    onAddToCart: (productId: number, quantity: number) => Promise<void>
}

export interface ProductsArr {
    id: number
    name: string
    description: string
    price: number,
    image: string
}

const Products: React.FC<Props> = (props) => {
    const classes = useStyles()
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify='center' spacing={4}>
                {
                    props.products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} onAddToCart={props.onAddToCart}/>
                        </Grid>
                    ))
                }
            </Grid>
        </main>
    )
};

export default Products