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
  CreditCard,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  DollarSign,
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';

interface Payment {
  id: number;
  order_id: number;
  amount: number;
  payment_method: string;
  payment_status: string;
  transaction_reference: string | null;
  created_at: string;
  orders?: {
    id: number;
    order_date: string;
    total_amount: number;
    customers?: {
      full_name: string;
      email: string;
    };
  };
}

export default function PaymentsManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('payments')
        .select(
          `
          *,
          orders (
            id,
            order_date,
            total_amount,
            customers (full_name, email)
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: number, newStatus: string) => {
    try {
      const { error } = await supabaseAdmin
        .from('payments')
        .update({ payment_status: newStatus })
        .eq('id', paymentId);

      if (error) throw error;

      // Update local state
      setPayments(
        payments.map((payment) =>
          payment.id === paymentId
            ? { ...payment, payment_status: newStatus }
            : payment
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        variant: 'secondary' as const,
        icon: Clock,
        color: 'text-yellow-600',
      },
      completed: {
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-green-600',
      },
      failed: {
        variant: 'destructive' as const,
        icon: XCircle,
        color: 'text-red-600',
      },
      refunded: {
        variant: 'outline' as const,
        icon: AlertCircle,
        color: 'text-blue-600',
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

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toString().includes(searchTerm) ||
      payment.transaction_reference
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.orders?.customers?.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.orders?.customers?.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      !statusFilter ||
      payment.payment_status === statusFilter;
    const matchesMethod =
      methodFilter === 'all' ||
      !methodFilter ||
      payment.payment_method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading payments...</p>
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
            Payments Management
          </h1>
          <p className="text-muted-foreground">
            Manage payment transactions and their status
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by ID, transaction ID, or customer..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setMethodFilter('');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments ({filteredPayments.length})</CardTitle>
          <CardDescription>
            Payment transactions and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="font-medium">#{payment.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          Order #{payment.order_id}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment.orders?.order_date
                            ? new Date(
                                payment.orders.order_date
                              ).toLocaleDateString()
                            : 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {payment.orders?.customers?.full_name ||
                            'Unknown Customer'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment.orders?.customers?.email || 'No email'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {payment.payment_method.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(payment.payment_status)}
                        <Select
                          value={payment.payment_status}
                          onValueChange={(value) =>
                            updatePaymentStatus(payment.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {payment.transaction_reference || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/payments/${payment.id}`}>
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

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">All time payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Payments
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                payments.filter(
                  (payment) => payment.payment_status === 'completed'
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                payments.filter(
                  (payment) => payment.payment_status === 'pending'
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                payments.reduce((sum, payment) => sum + payment.amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">All time revenue</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
