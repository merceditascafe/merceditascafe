/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Card from "./Card";
import { useRef } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const ProductCard = ({ id, name, description, price, img, stock }) => {
  const [readMore, setReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const { increaseCartQuantity } = useShoppingCart();

  const ref = useRef(null);

  const toggleReadMore = () => {
    setReadMore((prevState) => !prevState);
  };

  useEffect(() => {
    if (ref.current) {
      setShowReadMore(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);

  return (
    <Card>
      <div className="flex justify-around rounded border w-[300px] gap-5 shadow-xl p-5 relative">
        <div className="text-sm">
          <h3 className="font-semibold">{name}</h3>
          <p
            className="pt-2 w-[200px]"
            style={readMore ? null : paragraphStyles}
            ref={ref}
          >
            {description}
          </p>
          {showReadMore && (
            <button
              className="font-semibold underline pt-2"
              onClick={toggleReadMore}
            >
              {readMore ? "Leer Menos..." : "Leer Más..."}
            </button>
          )}
          {stock ? (
            <p className="font-semibold pt-2">{formatCurrency(price)}</p>
          ) : (
            <p className="font-semibold text-red-500">SIN STOCK</p>
          )}
        </div>

        <div className="flex flex-col">
          <img
            src={img}
            className={`w-[60px] h-[60px] object-cover ${
              stock ? "grayscale-0" : "grayscale"
            }`}
          />

          {stock && (
            <div className="mt-[5rem]">
              <button
                className="font-semibold text-xl absolute rounded right-8 bottom-8 border h-9 w-9 flex items-center justify-center"
                onClick={() => increaseCartQuantity(id, name, price)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
