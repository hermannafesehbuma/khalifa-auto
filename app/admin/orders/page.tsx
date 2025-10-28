'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Label } from '@/components/ui/label';
import {
  ShoppingCart,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
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

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.guest_email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Orders Management
          </h1>
          <p className="text-muted-foreground">
            Manage guest orders and their status
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by order ID, guest name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>
            Manage guest orders and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">#{order.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {order.guest_name || 'Unknown Guest'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.guest_email || 'No email'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.guest_phone || 'No phone'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(order.total_amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(order.status)}
                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            updateOrderStatus(order.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
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
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        Order details available
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/orders/${order.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Orders
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                orders.reduce((sum, order) => sum + order.total_amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">All time sales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
