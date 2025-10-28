'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import {
  LayoutDashboard,
  Car,
  FolderOpen,
  ShoppingCart,
  CreditCard,
  Menu,
  LogOut,
  Settings,
  X,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Cars', href: '/admin/cars', icon: Car },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-card">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/logok.png"
                    alt="Khalifa Auto Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-primary">
                      Khalifa Auto
                    </h1>
                    <p className="text-sm text-muted-foreground">Admin Panel</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="border-t p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/logok.png"
                alt="Khalifa Auto Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">Khalifa Auto</h1>
                <p className="text-sm text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </div>
          <Separator />
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <Separator />
          <div className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <h2 className="text-xl font-semibold">
                {navigation.find((item) => isActive(item.href))?.name ||
                  'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
