import React, { createContext, useState, useContext } from 'react';

const CartStateContext = createContext();

export const useCartState = () => useContext(CartStateContext);

export const CartStateProvider = ({ children }) => {
  const [cartState, setCartState] = useState(null);

  return (
    <CartStateContext.Provider value={{ cartState, setCartState }}>
      {children}
    </CartStateContext.Provider>
  );
};
