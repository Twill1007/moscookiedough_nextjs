"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState(null);

  return (
    <CartContext.Provider
      value={{ cart, setCart, checkoutInfo, setCheckoutInfo }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
