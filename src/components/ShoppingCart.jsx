import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import ButtonClose from "./ButtonClose";
import CartItem from "./CartItem";
import storeItems from "../data/storeItems.json";
import React from "react";

// eslint-disable-next-line react/prop-types
const ShoppingCart = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();

  const displayWappButton = cartItems.length > 0;

  const whatsappText = React.useMemo(() => {
    return cartItems
      .reduce(
        (message, item) =>
          message.concat(
            `\n * ${item.quantity} ${"unidades de"} ${item.name} \n *`
          ),
        ``
      )
      .concat(
        `\nTotal a pagar: ${formatCurrency(
          cartItems.reduce((total, cartItem) => {
            const item = storeItems.find((i) => i.id === cartItem.id);
            return total + (item?.price || 0) * cartItem.quantity;
          }, 0)
        )}`
      );
  }, [cartItems]);

  return (
    isOpen && (
      <div className="w-full md:w-[24rem] pb-[4rem] absolute top-0 right-0 bg-white shadow-md">
        <ButtonClose onClick={closeCart} />
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto font-bold text-2xl text-red-600">
            <p>
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </p>
          </div>
        </div>
        {displayWappButton && (
          <div className="flex items-center justify-center mt-10">
            <a
              href={`https://wa.me/543794892202?text= Hola Merceditas! Quiero pedirte:${encodeURIComponent(
                whatsappText
              )}`}
            >
              <button className="bg-[#884A39] py-2 px-5 text-white rounded-xl shadow-md flex gap-2">
                Realizar Pedido
                <div>
                  <picture>
                    <img
                      src="/wapp_logo.svg"
                      className="object-cover"
                      alt="whatsapp"
                    />
                  </picture>
                </div>
              </button>
            </a>
          </div>
        )}
      </div>
    )
  );
};

export default ShoppingCart;
