// src/context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('goldenRoseCart');
      // Asegura que siempre sea un array
      const parsedCart = localCart ? JSON.parse(localCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : []; 
    } catch (error) {
      console.error("Error al parsear el carrito de localStorage", error);
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem('goldenRoseCart', JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item 
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };


  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };


  const updateQuantity = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10); 

    if (isNaN(quantity) || quantity <= 0) { 
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]); 
    console.log("Carrito limpiado"); // Log para confirmar
  };


  const totalItemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart, 
    itemCount: cartItems.length, 
    totalItems: totalItemsCount 
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}