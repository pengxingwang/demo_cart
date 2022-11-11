import React, { useContext } from "react";

export type ICartItem = {
  title: string;
  content: string;
  price: string;
  img: string;
  id: string;
  skuId: string;
  name: string;
  total: number;
};

const CartContext = React.createContext<
  | {
      cartList: ICartItem[];
      setCartList: (cartList: ICartItem[]) => void;
      addCart: (record: ICartItem) => void;
      removeCart: (record: ICartItem) => void;
      changeCartCount: (index: number, total: number) => void;
      totalMoney: number;
    }
  | undefined
>(undefined);
CartContext.displayName = "CartContext";

/**
 * 购物车所有业务逻辑抽离
 * @returns
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartList, setCartList] = React.useState<ICartItem[]>([]);

  //TODO 购物车每次初始数据从服务端请求

  // 加入购物车
  const addCart = (record: ICartItem) => {
    const index = cartList.findIndex((v) => v.skuId === record.skuId);
    if (index > -1) {
      // sku在购物车里
      const findRecord = cartList[index];
      findRecord.total = findRecord.total + record.total;
      cartList.splice(index, 1, findRecord);

      setCartList([...cartList]);
    } else {
      // sku没有在购物车里
      setCartList([...cartList, record]);
    }
  };

  // 删除购物车
  const removeCart = (record: ICartItem) => {
    const index = cartList.findIndex((v) => v.skuId === record.skuId);
    cartList.splice(index, 1);
    setCartList([...cartList]);
  };

  // 购物车页面改变数量
  const changeCartCount = (index: number, total: number) => {
    const findRecord = cartList[index];
    findRecord.total = total;
    cartList.splice(index, 1, findRecord);
    setCartList([...cartList]);
  };

  // 计算总价
  const totalMoney = React.useMemo(() => {
    let money = 0;
    cartList.map((item) => {
      money = money + Number(item.price) * item.total;
    });
    return money;
  }, [cartList]);

  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        totalMoney,
        addCart,
        removeCart,
        changeCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("必须在CartProvider中使用");
  }
  return context;
};
