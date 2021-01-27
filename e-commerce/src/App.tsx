import React, { useState, useEffect } from 'react';
import Axios from 'axios'

//import Products from './Components/Products/Products'
//import Navbar from './Components/Navbar/Navbar'

import {Products, Navbar} from './Components'

function App() {
  const [products, serProducts] = useState([])
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    Axios.defaults.withCredentials = true
    Axios.get("http://localhost:4000/api/products/loadAll")
      .then((response) => {
        const { data } = response
        serProducts(data.result)
    })
  }

  const fetchCart = async () => {
    Axios.defaults.withCredentials = true
    Axios.get("http://localhost:4000/api/cart/loadAll")
      .then((response) => {
        const {data} = response
        setCart(data.result)
    })
  }

  const handleAddToCart = async (productId: number, quantity: number) => {
    Axios.defaults.withCredentials = true
    Axios.post("http://localhost:4000/api/cart/add", {
      newProduct: {
        id: productId,
        quantity: quantity
      }
    }).then((response) => {
      fetchCart()
    })
    console.log(cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log(cart)

  return (
    <div>
      <Navbar />
      <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  )
}

export default App;
