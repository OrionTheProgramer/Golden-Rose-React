// src/context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import apiBase from "../data/apiConfig";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const storageKey = "goldenRoseCart";

async function fetchCart(userId) {
  const res = await fetch(`${apiBase.carrito}/api/carritos/${userId}`);
  if (!res.ok) throw new Error("No se pudo cargar el carrito");
  return res.json();
}

async function syncAddItem(userId, product) {
  const res = await fetch(`${apiBase.carrito}/api/carritos/${userId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: product.quantity || 1,
    }),
  });
  if (!res.ok) throw new Error("No se pudo agregar el item");
  return res.json();
}

async function syncUpdateQuantity(userId, productId, quantity) {
  const res = await fetch(`${apiBase.carrito}/api/carritos/${userId}/items/${productId}?quantity=${quantity}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("No se pudo actualizar el item");
  return res.json();
}

async function syncRemove(userId, productId) {
  const res = await fetch(`${apiBase.carrito}/api/carritos/${userId}/items/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("No se pudo eliminar el item");
  return res.json();
}

async function syncClear(userId) {
  await fetch(`${apiBase.carrito}/api/carritos/${userId}`, { method: "DELETE" });
}

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem(storageKey);
      const parsedCart = localCart ? JSON.parse(localCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Error al parsear el carrito de localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    if (!user?.id) {
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
      return;
    }
    // si hay usuario, no persistimos en localStorage
  }, [cartItems, user]);

  useEffect(() => {
    const load = async () => {
      if (user?.id) {
        try {
          const serverCart = await fetchCart(user.id);
          const mapped = (serverCart.items || []).map((i) => ({
            id: i.productId,
            name: i.productName,
            price: i.price,
            quantity: i.quantity,
          }));
          setCartItems(mapped);
        } catch (err) {
          console.error("No se pudo sincronizar carrito remoto", err);
        }
      }
    };
    load();
  }, [user]);

  const addToCart = async (product) => {
    if (user?.id) {
      try {
        const serverCart = await syncAddItem(user.id, product);
        const mapped = (serverCart.items || []).map((i) => ({
          id: i.productId,
          name: i.productName,
          price: i.price,
          quantity: i.quantity,
        }));
        setCartItems(mapped);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (productId) => {
    if (user?.id) {
      try {
        const serverCart = await syncRemove(user.id, productId);
        const mapped = (serverCart.items || []).map((i) => ({
          id: i.productId,
          name: i.productName,
          price: i.price,
          quantity: i.quantity,
        }));
        setCartItems(mapped);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = async (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);

    if (isNaN(quantity) || quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (user?.id) {
      try {
        const serverCart = await syncUpdateQuantity(user.id, productId, quantity);
        const mapped = (serverCart.items || []).map((i) => ({
          id: i.productId,
          name: i.productName,
          price: i.price,
          quantity: i.quantity,
        }));
        setCartItems(mapped);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = async () => {
    if (user?.id) {
      try {
        await syncClear(user.id);
        setCartItems([]);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount: cartItems.length,
    totalItems: totalItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
