import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import type { Ticket } from "@ttbs/prisma";

type CartContextType = { lineItems: Array<Ticket>; setLineItems: Dispatch<SetStateAction<Array<Ticket>>> };

const CartContext = createContext<CartContextType>({ lineItems: [], setLineItems: () => undefined });

interface CartProviderProps {
  children: ReactNode;
}

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: CartProviderProps) {
  const [lineItems, setLineItems] = useState<Ticket[]>([]);

  return <CartContext.Provider value={{ lineItems, setLineItems }}>{children}</CartContext.Provider>;
}
