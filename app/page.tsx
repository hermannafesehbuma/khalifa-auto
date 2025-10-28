'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  Shield,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  Users,
  Award,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Wrench,
  Zap,
  Heart,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface CarData {
  id: number;
  category_id: number | null;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  is_available: boolean;
  exterior_color: string;
  interior_color: string;
  drivetrain: string;
  engine: string;
  horsepower: number;
  torque: number;
  transmission: string;
  style: string;
  condition: string;
  vin: string;
  created_at: string;
  categories?: { name: string };
  car_images?: { image_url: string; sort_order: number }[];
}

export default function Home() {
  const [premiumCars, setPremiumCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPremiumCars();
  }, []);

  const fetchPremiumCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select(
          `
          *,
          categories (name),
          car_images (image_url, sort_order)
        `
        )
        .eq('is_available', true)
        .order('price', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPremiumCars(data || []);
    } catch (error) {
      console.error('Error fetching premium cars:', error);
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

  const formatMileage = (mileage: number) => {
    return mileage ? `${mileage.toLocaleString()} mi` : 'N/A';
  };
  return (
    <div className="min-h-screen">
      {/* Hero Video Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white space-y-8 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Find Your Perfect
              <span className="text-accent block">Vehicle Today</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Discover premium used cars, certified pre-owned vehicles, and
              exceptional financing options at Khalifa Auto. Your journey to the
              perfect car starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
                asChild
              >
                <Link href="/inventory">
                  <Car className="h-5 w-5 mr-2" />
                  Browse Inventory
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Phone className="h-5 w-5 mr-2" />
                Call +9715083633902
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Quick Search
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Find Your Perfect Vehicle
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our extensive inventory by category or price range. Start
              your search today and find the vehicle that fits your needs and
              budget.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent className="space-y-8">
                {/* Vehicle Categories */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-primary text-center">
                    Vehicle Categories
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href="/inventory?category=Sedan">
                        <Car className="h-6 w-6" />
                        <span className="font-semibold">Sedans</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href="/inventory?category=SUV">
                        <Car className="h-6 w-6" />
                        <span className="font-semibold">SUVs</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href="/inventory?category=Truck">
                        <Car className="h-6 w-6" />
                        <span className="font-semibold">Trucks</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href="/inventory?category=Convertible">
                        <Car className="h-6 w-6" />
                        <span className="font-semibold">Luxury</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Ranges */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-primary text-center">
                    Price Ranges
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-16 flex items-center justify-center space-x-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                      asChild
                    >
                      <Link href="/inventory?price=under-25k">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-semibold">Under $25,000</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex items-center justify-center space-x-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                      asChild
                    >
                      <Link href="/inventory?price=25k-50k">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-semibold">$25,000 - $50,000</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex items-center justify-center space-x-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                      asChild
                    >
                      <Link href="/inventory?price=over-50k">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-semibold">$50,000+</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">
                      Cars in Stock
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">15+</div>
                    <div className="text-sm text-muted-foreground">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">
                      Customer Satisfaction
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href="/inventory">
                      <Car className="h-5 w-5 mr-2" />
                      Browse All Inventory
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-accent hover:text-accent-foreground"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Get Trade-In Value
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Featured Vehicles
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Premium Selection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hand-picked vehicles that combine quality, value, and reliability.
              Each car undergoes our rigorous 150-point inspection process.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse"></div>
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="h-6 bg-muted animate-pulse rounded"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-muted animate-pulse rounded w-24"></div>
                      <div className="h-10 bg-muted animate-pulse rounded w-32"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumCars.map((car) => (
                <Card
                  key={car.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={
                        car.car_images?.[0]?.image_url || '/placeholder-car.svg'
                      }
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover"
                      quality={90}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-accent text-accent-foreground">
                        Premium
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {car.year} {car.make} {car.model}
                        </CardTitle>
                        <CardDescription>
                          {car.style} • {formatMileage(car.mileage)}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={car.is_available ? 'default' : 'secondary'}
                      >
                        {car.is_available ? 'Available' : 'Sold'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        {car.transmission || 'N/A'}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {car.drivetrain || 'N/A'} Drive
                      </span>
                      <span className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        {car.categories?.name || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(car.price)}
                      </div>
                      {car.is_available ? (
                        <Button
                          asChild
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Link href={`/cars/${car.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          className="bg-muted text-muted-foreground"
                          disabled
                        >
                          Sold
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link href="/inventory">View All Inventory</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Why Choose Khalifa Auto
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Your Trusted Auto Partner
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've been serving our community for over 15 years with integrity,
              quality, and exceptional customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  Every vehicle undergoes our comprehensive 150-point inspection
                  and comes with our quality guarantee.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Best Prices</h3>
                <p className="text-muted-foreground">
                  Competitive pricing with flexible financing options to fit
                  every budget and credit situation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Service Center</h3>
                <p className="text-muted-foreground">
                  Full-service automotive center with certified technicians and
                  genuine parts for all makes and models.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Customer Care</h3>
                <p className="text-muted-foreground">
                  Dedicated customer service team committed to your satisfaction
                  throughout the entire car buying experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-accent border-accent">
              Limited Time Offers
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Special Promotions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take advantage of these exclusive offers and save thousands on
              your next vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-accent">
                      0% APR Financing
                    </CardTitle>
                    <CardDescription>Qualified buyers only</CardDescription>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    Limited Time
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get 0% APR financing for up to 60 months on select certified
                  pre-owned vehicles. Terms and conditions apply.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link href="/financing">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-primary">
                      Trade-In Bonus
                    </CardTitle>
                    <CardDescription>Up to $2,000 extra</CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    This Month
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get up to $2,000 extra on your trade-in when you purchase any
                  vehicle from our inventory this month.
                </p>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/trade-in">Get Trade Value</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-accent">
                      Extended Warranty
                    </CardTitle>
                    <CardDescription>Free 2-year extension</CardDescription>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    New
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Receive a free 2-year extended warranty on all certified
                  pre-owned vehicles purchased this quarter.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="text-primary border-primary">
              Customer Reviews
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied
              customers have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Excellent service from start to finish! The team was
                  professional, knowledgeable, and helped me find the perfect
                  car within my budget. Highly recommend Khalifa Auto!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Verified Buyer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The financing process was smooth and transparent. No hidden
                  fees, no surprises. They worked with my credit situation and
                  got me approved quickly. Great experience!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">
                      Verified Buyer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "I've been coming to Khalifa Auto for years. They always treat
                  me fairly and have quality vehicles. The service department is
                  also top-notch. Trustworthy dealership!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Robert Martinez</div>
                    <div className="text-sm text-muted-foreground">
                      Returning Customer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Find Your Perfect Car?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Visit our showroom today or browse our online inventory. Our
              friendly sales team is ready to help you find the vehicle that's
              perfect for your lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
                asChild
              >
                <Link href="tel:+9715083633902">
                  <Phone className="h-5 w-5 mr-2" />
                  Call +9715083633902
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
