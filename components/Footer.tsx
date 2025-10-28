import Link from 'next/link';
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8" />
              <span className="text-2xl font-bold">Khalifa Auto</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner for premium used cars and certified pre-owned
              vehicles. We've been serving the community for over 15 years with
              integrity, quality, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="text-primary-foreground border-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-primary-foreground border-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-primary-foreground border-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-primary-foreground border-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/inventory"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Browse Inventory
              </Link>
              <Link
                href="/financing"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Financing Options
              </Link>
              <Link
                href="/trade-in"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Trade-In Value
              </Link>
              <Link
                href="/about"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Vehicle Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vehicle Categories</h3>
            <div className="space-y-2">
              <Link
                href="/inventory?style=Sedan"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Sedans
              </Link>
              <Link
                href="/inventory?style=SUV"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                SUVs & Crossovers
              </Link>
              <Link
                href="/inventory?style=Truck"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Trucks
              </Link>
              <Link
                href="/inventory?style=Luxury"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Luxury Vehicles
              </Link>
              <Link
                href="/inventory?style=Convertible"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Convertibles
              </Link>
              <Link
                href="/inventory?price=under-15k"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Under $15,000
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p>1-20-7 SHIMOUMA</p>
                  <p>SETAGAYA-KU, TOKYO JAPAN</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">+9715083633902</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">contact@khalifaautotrading.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p>Mon-Fri: 9AM-7PM</p>
                  <p>Sat: 9AM-6PM</p>
                  <p>Sun: 11AM-5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/80">
            <p>&copy; 2024 Khalifa Auto. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/return-refund-policy"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Return Policy
            </Link>
            <Link
              href="/shipping-policy"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
