/* eslint-disable array-callback-return */
import React, { useState, createContext } from "react";

export const CartContext = createContext();

const CartContextProvider = props => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(true);

  const restoreDefault = () => {
    setCart([]);
    setPrice(0);
    localStorage.setItem("cart", []);
    localStorage.setItem("price", 0);
  };

  const restoreCart = () => {
    const cartData = localStorage.getItem("cart");
    const priceData = localStorage.getItem("price");
    if (cartData) {
      setCart(JSON.parse(cartData));
      setPrice(priceData);
    }
  };

  const calculateTotal = list => {
    if (list.length > 0) {
      const sum = item => item.reduce((x, y) => x + y);
      const total = sum(list.map(product => Number(product.totalPrice)));
      setPrice(total);

      localStorage.setItem("price", total);
      setCartUpdated(!cartUpdated);
    } else {
      setPrice(0);
      localStorage.setItem("price", 0);
      setCartUpdated(!cartUpdated);
    }
  };

  const addCart = item => {
    const cartData = [
      ...cart,
      { ...item, total: item.minimumOrderQuantity, totalPrice: item.price }
    ];
    setCart(cartData);
    calculateTotal(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const addCartAddon = (item, addon, note) => {
    const newAddonString = [
      ...addon
        .map(option => option.id)
        .sort((a, b) => {
          return ("" + a).localeCompare(b);
        }),
      item.id
    ].join("");

    const itemIndex = cart.findIndex(
      item => item.addonString === newAddonString
    );
    if (itemIndex !== -1) {
      let newCartAddon = cart;
      newCartAddon[itemIndex].total =
        newCartAddon[itemIndex].total + (item.total || 1);
      setCart(newCartAddon);
      calculateTotal(newCartAddon);
      localStorage.setItem("cart", JSON.stringify(newCartAddon));
      return;
    }

    const cartAddon = [
      ...cart,
      {
        ...item,
        total: item.minimumOrderQuantity,
        totalPrice:
          addon.length > 0
            ? item.price +
              addon.map(total => total.price)?.reduce((x, y) => x + y)
            : item.price,
        selectedAddon: addon,
        note: note,
        addonString:
          addon.length > 0
            ? [
                ...addon
                  ?.map(option => option.id)
                  ?.sort((a, b) => {
                    return ("" + a).localeCompare(b);
                  }),
                item.id
              ].join("")
            : item.id
      }
    ];
    setCart(cartAddon);
    calculateTotal(cartAddon);
    localStorage.setItem("cart", JSON.stringify(cartAddon));
  };

  const increaseCart = item => {
    const objIndex = cart.findIndex(select => select.id === item.id);
    const cartData = cart;
    cartData[objIndex].total += 1;
    cartData[objIndex].totalPrice =
      cartData[objIndex].total * cartData[objIndex].price;
    setCart(cartData);
    calculateTotal(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const decreaseCart = item => {
    const objIndex = cart.findIndex(select => select.id === item.id);
    const cartData = cart;
    if (cartData[objIndex].total > item.minimumOrderQuantity) {
      cartData[objIndex].total -= 1;
      cartData[objIndex].totalPrice =
        cartData[objIndex].total * cartData[objIndex].price;
      setCart(cartData);
      calculateTotal(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
      const newCart = cart.filter(obj => obj.id !== item.id);
      setCart(newCart);
      calculateTotal(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const increaseCartAddon = item => {
    const objIndex = cart.findIndex(
      select => select.addonString === item.addonString
    );
    const cartData = cart;
    cartData[objIndex].total += 1;
    cartData[objIndex].totalPrice =
      item.selectedAddon.length > 0
        ? cartData[objIndex].total *
          (cartData[objIndex].price +
            cartData[objIndex].selectedAddon
              .map(total => total.price)
              .reduce((x, y) => x + y))
        : cartData[objIndex].total * cartData[objIndex].price;
    setCart(cartData);
    calculateTotal(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const decreaseCartAddon = item => {
    const objIndex = cart.findIndex(
      select => select.addonString === item.addonString
    );
    const cartData = cart;
    if (cartData[objIndex]?.total > item.minimumOrderQuantity) {
      cartData[objIndex].total -= 1;
      cartData[objIndex].totalPrice =
        item.selectedAddon.length > 0
          ? cartData[objIndex].total *
            (cartData[objIndex].price +
              cartData[objIndex].selectedAddon
                .map(total => total.price)
                .reduce((x, y) => x + y))
          : cartData[objIndex].total * cartData[objIndex].price;
      setCart(cartData);
      calculateTotal(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
      const newCart = cart.filter(obj => obj.addonString !== item.addonString);
      setCart(newCart);
      calculateTotal(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const updateCartAddon = (item, addon, note, currenAddonString) => {
    const currentCart = cart;
    const newAddonString = [
      ...addon
        .map(option => option.id)
        .sort((a, b) => {
          return ("" + a).localeCompare(b);
        }),
      item.id
    ].join("");
    const itemIndex = cart.findIndex(
      item => item.addonString === newAddonString
    );

    if (newAddonString === currenAddonString) {
      let newCartAddon = cart;
      newCartAddon[itemIndex].note = note;
      setCart(newCartAddon);
      calculateTotal(newCartAddon);
      localStorage.setItem("cart", JSON.stringify(newCartAddon));
      return;
    }

    if (itemIndex !== -1) {
      let newCartAddon = cart;
      newCartAddon[itemIndex].total =
        newCartAddon[itemIndex].total + (item.total || 1);
      setCart(
        newCartAddon.filter(item => item.addonString !== currenAddonString)
      );
      calculateTotal(
        newCartAddon.filter(item => item.addonString !== currenAddonString)
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          newCartAddon.filter(item => item.addonString !== currenAddonString)
        )
      );
      return;
    }

    const currectAddonIndex = cart.findIndex(
      cartItem => cartItem.addonString === currenAddonString
    );

    const cartAddon = [
      ...cart,
      {
        ...item,
        total: currentCart[currectAddonIndex].total || 1,
        totalPrice:
          addon.length > 0
            ? item.price +
              addon.map(total => total.price)?.reduce((x, y) => x + y)
            : item.price,
        selectedAddon: addon,
        note: note,
        addonString:
          addon.length > 0
            ? [
                ...addon
                  ?.map(option => option.id)
                  ?.sort((a, b) => {
                    return ("" + a).localeCompare(b);
                  }),
                item.id
              ].join("")
            : item.id
      }
    ];
    setCart(cartAddon.filter(item => item.addonString !== currenAddonString));
    calculateTotal(
      cartAddon.filter(item => item.addonString !== currenAddonString)
    );
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartAddon.filter(item => item.addonString !== currenAddonString)
      )
    );
  };

  const addNote = (id, note) => {
    const cartData = [];
    cart.map(item => {
      if (item.id === id) {
        item.note = note;
      }
      cartData.push(item);
    });
    setCart(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        price,
        restoreDefault,
        restoreCart,
        calculateTotal,
        addCart,
        addCartAddon,
        increaseCart,
        decreaseCart,
        increaseCartAddon,
        decreaseCartAddon,
        addNote,
        cartUpdated,
        updateCartAddon
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
