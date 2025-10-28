'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Car,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';

interface DashboardStats {
  totalCars: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  recentOrders: any[];
  lowStockCars: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCars: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    recentOrders: [],
    lowStockCars: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch cars count
      const { count: carsCount } = await supabaseAdmin
        .from('cars')
        .select('*', { count: 'exact', head: true });

      // Fetch orders count and revenue
      const { data: ordersData } = await supabaseAdmin
        .from('orders')
        .select('total_amount, status');

      const totalOrders = ordersData?.length || 0;
      const totalRevenue =
        ordersData?.reduce(
          (sum, order) => sum + (order.total_amount || 0),
          0
        ) || 0;
      const pendingOrders =
        ordersData?.filter((order) => order.status === 'pending').length || 0;
      const completedOrders =
        ordersData?.filter((order) => order.status === 'completed').length || 0;

      // Fetch customers count
      const { count: customersCount } = await supabaseAdmin
        .from('customers')
        .select('*', { count: 'exact', head: true });

      // Fetch recent orders
      const { data: recentOrdersData } = await supabaseAdmin
        .from('orders')
        .select(
          `
          id,
          order_date,
          total_amount,
          status,
          customers (full_name, email)
        `
        )
        .order('order_date', { ascending: false })
        .limit(5);

      setStats({
        totalCars: carsCount || 0,
        totalOrders,
        totalCustomers: customersCount || 0,
        totalRevenue,
        pendingOrders,
        completedOrders,
        recentOrders: recentOrdersData || [],
        lowStockCars: 0, // This would need to be calculated based on your business logic
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, icon: Clock },
      completed: { variant: 'default' as const, icon: CheckCircle },
      cancelled: { variant: 'destructive' as const, icon: AlertCircle },
      paid: { variant: 'default' as const, icon: CheckCircle },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Khalifa Auto Admin Panel
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            System Online
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCars}</div>
            <p className="text-xs text-muted-foreground">
              Vehicles in inventory
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Registered customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">All time sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Status Overview</CardTitle>
            <CardDescription>Current order status distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Pending</span>
              </div>
              <Badge variant="secondary">{stats.pendingOrders}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Completed</span>
              </div>
              <Badge variant="default">{stats.completedOrders}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/cars">
                <Car className="h-4 w-4 mr-2" />
                Manage Cars
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/orders">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Orders
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/customers">
                <Users className="h-4 w-4 mr-2" />
                Manage Customers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">Order #{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customers?.full_name || 'Unknown Customer'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.order_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="font-medium">
                      {formatCurrency(order.total_amount)}
                    </div>
                    {getStatusBadge(order.status)}
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No recent orders found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
