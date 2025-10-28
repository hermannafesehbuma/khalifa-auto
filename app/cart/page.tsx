'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  DollarSign,
  Truck,
  Shield,
  CheckCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/components/CartContext';

interface CartItem {
  id: number;
  car_id: number;
  quantity: number;
  car: {
    id: number;
    brand: string; // Keep brand for compatibility with existing cart data
    model: string;
    year: number;
    price: number;
    mileage: number;
    style: string;
    is_available: boolean;
    car_images: { image_url: string; sort_order: number }[];
  };
}

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const applyPromoCode = () => {
    // Simulate promo code validation
    const validPromos: { [key: string]: number } = {
      SAVE10: 0.1,
      WELCOME: 0.05,
      FIRST: 0.15,
    };

    if (validPromos[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoDiscount(validPromos[promoCode.toUpperCase()]);
    } else {
      alert('Invalid promo code');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const subtotal = getCartTotal();
  const discount = subtotal * promoDiscount;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + tax;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any vehicles to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/inventory">Browse Inventory</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'vehicle' : 'vehicles'}{' '}
            in your cart
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/inventory">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            // Debug logging for cart images
            console.log('🛒 Cart Item Debug:', {
              carId: item.car_id,
              carBrand: item.car.brand,
              carModel: item.car.model,
              carImages: item.car.car_images,
              hasImages: !!item.car.car_images,
              imageCount: item.car.car_images?.length || 0,
              mainImage: item.car.car_images?.find(
                (img) => img.sort_order === 0
              ),
              firstImage: item.car.car_images?.[0],
              finalImageSrc:
                item.car.car_images?.find((img) => img.sort_order === 0)
                  ?.image_url ||
                item.car.car_images?.[0]?.image_url ||
                '/placeholder-car.svg',
            });

            return (
              <Card key={item.car_id} className="overflow-hidden">
                <div className="flex">
                  {/* Car Image */}
                  <div className="w-48 h-32 relative flex-shrink-0">
                    <Image
                      src={
                        item.car.car_images?.find((img) => img.sort_order === 0)
                          ?.image_url ||
                        item.car.car_images?.[0]?.image_url ||
                        '/placeholder-car.svg'
                      }
                      alt={`${item.car.brand} ${item.car.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Car Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {item.car.year} {item.car.brand} {item.car.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.car.style}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.car_id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.car_id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.car_id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-primary">
                          {formatCurrency(item.car.price * item.quantity)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(item.car.price)} each
                        </div>
                      </div>
                    </div>

                    {!item.car.is_available && (
                      <Badge variant="destructive" className="mt-2">
                        Not Available
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Promo Code */}
              <div className="space-y-2">
                <Label htmlFor="promo">Promo Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="promo"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromoCode} disabled={!promoCode}>
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Promo code "{appliedPromo}" applied
                  </div>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Khalifa Auto?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Quality Guarantee</div>
                  <div className="text-sm text-muted-foreground">
                    All vehicles inspected and certified
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Free Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    Within 50 miles of our location
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Best Price Promise</div>
                  <div className="text-sm text-muted-foreground">
                    We'll match any competitor's price
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
