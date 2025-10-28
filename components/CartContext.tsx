'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  car_id: number;
  quantity: number;
  car: {
    id: number;
    brand: string; // This will be mapped from make or brand
    model: string;
    year: number;
    price: number;
    mileage: number;
    style: string;
    is_available: boolean;
    car_images: { image_url: string; sort_order: number }[];
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (car: any) => void;
  removeFromCart: (carId: number) => void;
  updateQuantity: (carId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (carId: number) => boolean;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (car: any) => {
    // Debug logging for addToCart
    console.log('🛒 Adding to Cart Debug:', {
      carId: car.id,
      carMake: car.make,
      carBrand: car.brand,
      carModel: car.model,
      carImages: car.car_images,
      hasImages: !!car.car_images,
      imageCount: car.car_images?.length || 0,
      carImagesData: car.car_images,
    });

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.car_id === car.id);

      if (existingItem) {
        // If car already in cart, increase quantity
        return prevItems.map((item) =>
          item.car_id === car.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new car to cart
        const newCartItem = {
          car_id: car.id,
          quantity: 1,
          car: {
            id: car.id,
            brand: car.make || car.brand, // Support both make and brand for compatibility
            model: car.model,
            year: car.year,
            price: car.price,
            mileage: car.mileage,
            style: car.style,
            is_available: car.is_available,
            car_images: car.car_images || [],
          },
        };

        console.log('🛒 New Cart Item Created:', {
          cartItem: newCartItem,
          carImagesInCartItem: newCartItem.car.car_images,
        });

        return [...prevItems, newCartItem];
      }
    });
  };

  const removeFromCart = (carId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.car_id !== carId)
    );
  };

  const updateQuantity = (carId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(carId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.car_id === carId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (carId: number) => {
    return cartItems.some((item) => item.car_id === carId);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.car.price * item.quantity,
      0
    );
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
