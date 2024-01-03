import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import { useArray } from "@ttbs/lib";
import type { UseArrayActions } from "@ttbs/lib";

type CartContextType = {
  lineItems: Array<CartItem>;
  buyer: {
    name: string;
    identification: string;
    email: string;
    phone: string;
  };
  actions: UseArrayActions<CartItem> & {
    setBuyer: Dispatch<SetStateAction<CartContextType["buyer"]>>;
  };
};

const CartContext = createContext<CartContextType>({
  lineItems: [],
  buyer: {
    name: "",
    identification: "",
    email: "",
    phone: "",
  },
  actions: {
    setBuyer: () => {},
    setValue: () => {},
    add: () => {},
    push: () => {},
    pop: () => {},
    shift: () => {},
    unshift: () => {},
    clear: () => {},
    move: () => {},
    removeById: () => {},
    modifyById: () => {},
    removeIndex: () => {},
  },
});

interface CartProviderProps {
  children: ReactNode;
}

export const useCart = () => useContext(CartContext);

export type CartItem = {
  // meaning seatId
  id: number;
  fromStationId: number;
  toStationId: number;
  amount: number;
  userName: string;
  userIdentification: string;
};
export default function CartProvider({ children }: CartProviderProps) {
  const [lineItems, actions] = useArray<CartItem>([]);
  const [buyer, setBuyer] = useState<CartContextType["buyer"]>({
    email: "",
    identification: "",
    name: "",
    phone: "",
  });

  return (
    <CartContext.Provider
      value={{
        lineItems,
        buyer,
        actions: {
          ...actions,
          setBuyer,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
