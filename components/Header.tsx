'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, Phone, Car, Search, ShoppingCart, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useCart } from '@/components/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { getCartItemCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/inventory?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>📞 Call us: +9715083633902</span>
              <span>✉️ contact@khalifaautotrading.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Mon-Fri: 9AM-7PM | Sat: 9AM-6PM | Sun: 11AM-5PM</span>
            </div>
          </div>
          <div className="md:hidden space-y-1 text-sm text-center">
            <div>📞 Call us: +9715083633902</div>
            <div>✉️ contact@khalifaautotrading.com</div>
            <div>Mon-Fri: 9AM-7PM | Sat: 9AM-6PM | Sun: 11AM-5PM</div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logok.png"
              alt="Khalifa Auto Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-primary">
              Khalifa Auto
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/inventory"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          All Vehicles
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Browse our complete inventory with filters
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/inventory?category=Sedan"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Sedans
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Luxury and economy sedans for every need
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/inventory?category=SUV"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          SUVs
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Family-friendly SUVs and crossovers
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/inventory?category=Truck"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Trucks
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Work trucks and pickup trucks
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/inventory?category=Convertible"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Luxury
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Premium luxury vehicles
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/financing"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Financing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/trade-in"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Trade-In Value
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            {isSearchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <Input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                  autoFocus
                />
                <Button type="submit" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            )}
            <Button size="sm" className="bg-accent hover:bg-accent/90" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {getCartItemCount() > 0 && (
                  <span className="ml-2 bg-white text-accent px-2 py-1 rounded-full text-xs font-bold">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center space-x-2 mb-6">
                  <Image
                    src="/logok.png"
                    alt="Khalifa Auto Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-bold text-primary">
                    Khalifa Auto
                  </span>
                </div>
                <div className="flex flex-col space-y-2 mt-8">
                  <Link
                    href="/inventory"
                    className="text-lg font-medium px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={handleMenuClose}
                  >
                    Inventory
                  </Link>
                  <Link
                    href="/financing"
                    className="text-lg font-medium px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={handleMenuClose}
                  >
                    Financing
                  </Link>
                  <Link
                    href="/trade-in"
                    className="text-lg font-medium px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={handleMenuClose}
                  >
                    Trade-In Value
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={handleMenuClose}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={handleMenuClose}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/cart"
                    className="text-lg font-medium flex items-center px-4 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={handleMenuClose}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart
                    {getCartItemCount() > 0 && (
                      <span className="ml-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                        {getCartItemCount()}
                      </span>
                    )}
                  </Link>
                  <div className="pt-4 border-t">
                    <form
                      onSubmit={(e) => {
                        handleSearch(e);
                        handleMenuClose();
                      }}
                      className="mb-2"
                    >
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          placeholder="Search vehicles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="sm">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
