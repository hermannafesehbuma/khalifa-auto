'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
import {
  Car,
  Calendar,
  DollarSign,
  Gauge,
  Settings,
  Zap,
  Users,
  Wrench,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  Share2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/components/CartContext';

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

interface CarImage {
  id: number;
  car_id: number;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params.id as string;
  const { addToCart, isInCart } = useCart();

  const [car, setCar] = useState<CarData | null>(null);
  const [images, setImages] = useState<CarImage[]>([]);
  const [relatedCars, setRelatedCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  const fetchCarDetails = async () => {
    try {
      // Fetch car details
      const { data: carData, error: carError } = await supabase
        .from('cars')
        .select(
          `
          *,
          categories (name)
        `
        )
        .eq('id', carId)
        .single();

      if (carError) throw carError;

      // Fetch car images
      const { data: imagesData, error: imagesError } = await supabase
        .from('car_images')
        .select('*')
        .eq('car_id', carId)
        .order('sort_order');

      if (imagesError) throw imagesError;

      // Fetch related cars
      const { data: relatedData, error: relatedError } = await supabase
        .from('cars')
        .select(
          `
          *,
          categories (name),
          car_images (image_url, sort_order)
        `
        )
        .eq('category_id', carData.category_id)
        .neq('id', carId)
        .eq('is_available', true)
        .limit(4);

      if (relatedError) throw relatedError;

      setCar(carData);
      setImages(imagesData || []);
      setRelatedCars(relatedData || []);
    } catch (error) {
      console.error('Error fetching car details:', error);
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

  const handleAddToCart = () => {
    if (car) {
      // Include images when adding to cart
      const carWithImages = {
        ...car,
        car_images: images.map((img) => ({
          image_url: img.image_url,
          sort_order: img.sort_order,
        })),
      };
      addToCart(carWithImages);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Car Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The car you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/inventory" className="hover:text-primary">
          Inventory
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {car.make} {car.model}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {images.length > 0 ? (
            <>
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={
                    images[currentImageIndex]?.image_url ||
                    '/placeholder-car.svg'
                  }
                  alt={`${car.make} ${car.model} - Image ${
                    currentImageIndex + 1
                  }`}
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Grid */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Image
                        src={image.image_url}
                        alt={`Thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                        quality={90}
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
              <div className="text-center">
                <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No images available</p>
              </div>
            </div>
          )}
        </div>

        {/* Car Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {car.year} {car.make} {car.model}
                </h1>
                <p className="text-lg text-muted-foreground">{car.style}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <Badge variant={car.is_available ? 'default' : 'secondary'}>
                {car.is_available ? 'Available' : 'Not Available'}
              </Badge>
              {car.categories && (
                <Badge variant="outline">{car.categories.name}</Badge>
              )}
            </div>

            <div className="text-4xl font-bold text-primary mb-6">
              {formatCurrency(car.price)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {car.is_available ? (
              <>
                <Button
                  size="lg"
                  className="flex-1 bg-accent hover:bg-accent/90"
                  onClick={handleAddToCart}
                  disabled={isInCart(car.id)} // Disable if already in cart
                >
                  {isInCart(car.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Inquire Now
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="flex-1 bg-muted text-muted-foreground"
                disabled
              >
                Sold
              </Button>
            )}
          </div>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Year: <strong>{car.year}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Mileage:{' '}
                    <strong>
                      {car.mileage
                        ? `${car.mileage.toLocaleString()} mi`
                        : 'N/A'}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Engine: <strong>{car.engine || 'N/A'}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Transmission: <strong>{car.transmission || 'N/A'}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Horsepower: <strong>{car.horsepower || 'N/A'}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                     Drive Train: <strong>{car.drivetrain || 'N/A'}</strong>
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Exterior Color:</span>
                  <span className="text-sm">{car.exterior_color || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Interior Color:</span>
                  <span className="text-sm">{car.interior_color || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">VIN:</span>
                  <span className="text-sm font-mono">{car.vin}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {car.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {car.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+9715083633902</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">info@khalifaauto.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  123 Auto Drive, City, State 12345
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Related Vehicles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCars.map((relatedCar) => (
              <Card
                key={relatedCar.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative">
                  <Image
                    src={
                      relatedCar.car_images?.[0]?.image_url ||
                      '/placeholder-car.svg'
                    }
                    alt={`${relatedCar.make} ${relatedCar.model}`}
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {relatedCar.year} {relatedCar.make} {relatedCar.model}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {relatedCar.style}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(relatedCar.price)}
                    </span>
                    <Button size="sm" asChild>
                      <Link href={`/cars/${relatedCar.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
