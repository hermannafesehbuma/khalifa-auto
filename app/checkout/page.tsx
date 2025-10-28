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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CreditCard,
  DollarSign,
  Truck,
  Shield,
  CheckCircle,
  ArrowLeft,
  Lock,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/components/CartContext';

interface CartItem {
  id: number;
  car_id: number;
  quantity: number;
  car: {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    style: string;
    is_available: boolean;
    car_images: { image_url: string; sort_order: number }[];
  };
}

interface CustomerData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [customerData, setCustomerData] = useState<CustomerData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'United States',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 50000 ? 0 : 500; // Free delivery over $50k
  const total = subtotal + tax + deliveryFee;

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const processOrder = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerData,
          paymentMethod,
          cartItems,
          totalAmount: total,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderId(result.orderId);
        setOrderComplete(true);
        clearCart();
      } else {
        const error = await response.json();
        console.error('Checkout API error:', error);
        alert(error.error || 'Failed to process order. Please try again.');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            No Items to Checkout
          </h1>
          <p className="text-muted-foreground mb-6">
            Your cart is empty. Add some vehicles to proceed with checkout.
          </p>
          <Button asChild size="lg">
            <Link href="/inventory">Browse Inventory</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been received.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm font-medium">Order ID: #{orderId}</p>
            <p className="text-sm text-muted-foreground">
              We'll contact you within 24 hours to arrange delivery.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/orders">View Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your purchase securely
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Please provide your contact details for delivery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={customerData.first_name}
                    onChange={(e) =>
                      handleInputChange('first_name', e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={customerData.last_name}
                    onChange={(e) =>
                      handleInputChange('last_name', e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
              <CardDescription>
                Where should we deliver your vehicle?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={customerData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={customerData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={customerData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zip_code">ZIP Code</Label>
                  <Input
                    id="zip_code"
                    value={customerData.zip_code}
                    onChange={(e) =>
                      handleInputChange('zip_code', e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant={
                    paymentMethod === 'BANK_TRANSFER' ? 'default' : 'outline'
                  }
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => setPaymentMethod('BANK_TRANSFER')}
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span>Bank Transfer</span>
                </Button>
                <Button
                  variant={paymentMethod === 'ZELLE' ? 'default' : 'outline'}
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => setPaymentMethod('ZELLE')}
                >
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span>Zelle</span>
                </Button>
                <Button
                  variant={
                    paymentMethod === 'APPLE_PAY' ? 'default' : 'outline'
                  }
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => setPaymentMethod('APPLE_PAY')}
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span>Apple Pay</span>
                </Button>
                <Button
                  variant={paymentMethod === 'CASH' ? 'default' : 'outline'}
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => setPaymentMethod('CASH')}
                >
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span>Cash</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.car_id}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-12 h-8 relative">
                      <Image
                        src={
                          item.car.car_images?.find(
                            (img) => img.sort_order === 0
                          )?.image_url ||
                          item.car.car_images?.[0]?.image_url ||
                          '/placeholder-car.svg'
                        }
                        alt={`${item.car.brand} ${item.car.model}`}
                        fill
                        className="object-cover rounded"
                        quality={90}
                        sizes="(max-width: 768px) 50vw, 12vw"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.car.year} {item.car.brand} {item.car.model}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(item.car.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={processOrder}
                disabled={processing || !paymentMethod}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Complete Order
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Security & Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Secure Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">SSL Encrypted</div>
                  <div className="text-sm text-muted-foreground">
                    Your information is secure
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Free Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    Orders over $50,000
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Quality Guarantee</div>
                  <div className="text-sm text-muted-foreground">
                    30-day satisfaction guarantee
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+9715083633902</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">support@khalifaauto.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">123 Auto Drive, City, State</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
