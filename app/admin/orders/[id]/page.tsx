'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Car,
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';

interface Order {
  id: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: number;
  order_id: number;
  car_id: number;
  quantity: number;
  price: number;
  cars: {
    id: number;
    brand: string;
    model: string;
    year: number;
    style: string;
    car_images: { image_url: string; sort_order: number }[];
  };
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      console.log('Fetching order details for ID:', orderId);

      // Fetch order details
      const { data: orderData, error: orderError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderError) {
        console.error('Order fetch error:', orderError);
        throw orderError;
      }

      console.log('Order data:', orderData);

      // Fetch order items with car details
      const { data: itemsData, error: itemsError } = await supabaseAdmin
        .from('order_items')
        .select(
          `
          *,
          cars (
            id,
            brand,
            model,
            year,
            style,
            car_images (image_url, sort_order)
          )
        `
        )
        .eq('order_id', orderId);

      if (itemsError) {
        console.error('Order items fetch error:', itemsError);
        throw itemsError;
      }

      console.log('Order items data:', itemsData);

      setOrder(orderData);
      setOrderItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    try {
      const { error } = await supabaseAdmin
        .from('orders')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        variant: 'secondary' as const,
        icon: Clock,
        color: 'text-yellow-600',
      },
      paid: {
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-green-600',
      },
      completed: {
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-green-600',
      },
      cancelled: {
        variant: 'destructive' as const,
        icon: XCircle,
        color: 'text-red-600',
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The order you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Order #{order.id}
            </h1>
            <p className="text-muted-foreground">
              Order placed on {formatDate(order.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(order.status)}
          <Select value={order.status} onValueChange={updateOrderStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Guest Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <p className="text-lg font-semibold">{order.guest_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </label>
                  <p className="text-lg">{order.guest_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </label>
                  <p className="text-lg">{order.guest_phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Order Date</span>
                  </label>
                  <p className="text-lg">{formatDate(order.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5" />
                <span>Order Items ({orderItems.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={
                          item.cars.car_images?.find(
                            (img) => img.sort_order === 0
                          )?.image_url ||
                          item.cars.car_images?.[0]?.image_url ||
                          '/placeholder-car.jpg'
                        }
                        alt={`${item.cars.brand} ${item.cars.model}`}
                        fill
                        className="object-cover rounded"
                        quality={90}
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {item.cars.year} {item.cars.brand} {item.cars.model}
                      </h3>
                      <p className="text-muted-foreground">{item.cars.style}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Price: {formatCurrency(item.price)}
                        </span>
                        <span className="font-semibold">
                          Total: {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>{formatCurrency(order.total_amount * 0.08)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>
                  {order.total_amount > 50000 ? 'Free' : formatCurrency(500)}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>
                    {formatCurrency(
                      order.total_amount +
                        order.total_amount * 0.08 +
                        (order.total_amount > 50000 ? 0 : 500)
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Order Created</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>
              {order.updated_at !== order.created_at && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.updated_at)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
