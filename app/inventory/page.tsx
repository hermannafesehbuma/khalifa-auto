'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Car,
  Search,
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Heart,
  Eye,
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

interface Category {
  id: number;
  name: string;
}

function InventoryPageContent() {
  const { addToCart, isInCart } = useCart();
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<CarData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [yearRange, setYearRange] = useState('');
  const [mileageRange, setMileageRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Initialize filters from URL parameters
    const category = searchParams.get('category');
    const style = searchParams.get('style');
    const price = searchParams.get('price');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');

    if (category) setSelectedCategory(category);
    if (style) setSelectedCategory(style); // Use style as category filter
    if (price) setPriceRange(price);
    if (brand) setSelectedBrand(brand);
    if (search) setSearchTerm(search);

    fetchCars();
    fetchCategories();
  }, [searchParams]);

  const fetchCars = async () => {
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error(
        'Error fetching cars:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error(
        'Error fetching categories:',
        error instanceof Error ? error.message : 'Unknown error'
      );
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

  const getUniqueMakes = () => {
    const makes = [...new Set(cars.map((car) => car.make).filter(Boolean))];
    return makes.sort();
  };

  const getUniqueStyles = () => {
    const styles = [...new Set(cars.map((car) => car.style).filter(Boolean))];
    return styles.sort();
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.style?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      car.categories?.name === selectedCategory ||
      car.style === selectedCategory;

    const matchesBrand = !selectedBrand || car.make === selectedBrand;

    const matchesAvailability = (() => {
      if (!selectedAvailability) return true;
      switch (selectedAvailability) {
        case 'available':
          return car.is_available === true;
        case 'sold':
          return car.is_available === false;
        default:
          return true;
      }
    })();

    const matchesPrice = (() => {
      if (!priceRange) return true;
      switch (priceRange) {
        case 'under-25k':
          return car.price < 25000;
        case '25k-50k':
          return car.price >= 25000 && car.price < 50000;
        case 'over-50k':
          return car.price >= 50000;
        case '50k-75k':
          return car.price >= 50000 && car.price < 75000;
        case '75k-100k':
          return car.price >= 75000 && car.price < 100000;
        case 'over-100k':
          return car.price >= 100000;
        default:
          return true;
      }
    })();

    const matchesYear = (() => {
      if (!yearRange) return true;
      const currentYear = new Date().getFullYear();
      switch (yearRange) {
        case '2020-newer':
          return car.year >= 2020;
        case '2015-2019':
          return car.year >= 2015 && car.year <= 2019;
        case '2010-2014':
          return car.year >= 2010 && car.year <= 2014;
        case 'older-2010':
          return car.year < 2010;
        default:
          return true;
      }
    })();

    const matchesMileage = (() => {
      if (!mileageRange) return true;
      switch (mileageRange) {
        case 'under-30k':
          return car.mileage < 30000;
        case '30k-60k':
          return car.mileage >= 30000 && car.mileage < 60000;
        case '60k-100k':
          return car.mileage >= 60000 && car.mileage < 100000;
        case 'over-100k':
          return car.mileage >= 100000;
        default:
          return true;
      }
    })();

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesYear &&
      matchesMileage
    );
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'mileage-low':
        return (a.mileage || 0) - (b.mileage || 0);
      case 'mileage-high':
        return (b.mileage || 0) - (a.mileage || 0);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange('');
    setYearRange('');
    setMileageRange('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Vehicle Inventory
        </h1>
        <p className="text-muted-foreground">
          Browse our selection of {cars.length} quality vehicles
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Search & Filters
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by make, model, or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                    {getUniqueStyles().map((style) => (
                      <SelectItem key={`style-${style}`} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Brand</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Brands</SelectItem>
                    {getUniqueMakes().map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Price</SelectItem>
                    <SelectItem value="under-25k">Under $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                    <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                    <SelectItem value="over-100k">Over $100,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Year Range</Label>
                <Select value={yearRange} onValueChange={setYearRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Year</SelectItem>
                    <SelectItem value="2020-newer">2020 & Newer</SelectItem>
                    <SelectItem value="2015-2019">2015 - 2019</SelectItem>
                    <SelectItem value="2010-2014">2010 - 2014</SelectItem>
                    <SelectItem value="older-2010">Older than 2010</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Mileage Range</Label>
                <Select value={mileageRange} onValueChange={setMileageRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Mileage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Mileage</SelectItem>
                    <SelectItem value="under-30k">Under 30,000 mi</SelectItem>
                    <SelectItem value="30k-60k">30,000 - 60,000 mi</SelectItem>
                    <SelectItem value="60k-100k">
                      60,000 - 100,000 mi
                    </SelectItem>
                    <SelectItem value="over-100k">Over 100,000 mi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="mileage-low">
                      Mileage: Low to High
                    </SelectItem>
                    <SelectItem value="mileage-high">
                      Mileage: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground">
            Showing {sortedCars.length} of {cars.length} vehicles
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cars Grid/List */}
      {sortedCars.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No vehicles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {sortedCars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className={
                  viewMode === 'grid'
                    ? 'aspect-video relative'
                    : 'h-48 relative'
                }
              >
                <Image
                  src={car.car_images?.[0]?.image_url || '/placeholder-car.svg'}
                  alt={`${car.make || 'Unknown'} ${car.model || 'Car'}`}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {car.year} {car.make || 'Unknown'} {car.model || 'Car'}
                    </h3>
                    <p className="text-sm text-muted-foreground">{car.style}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(car.price)}
                    </div>
                    <Badge variant={car.is_available ? 'default' : 'secondary'}>
                      {car.is_available ? 'Available' : 'Sold'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>Mileage: {formatMileage(car.mileage)}</div>
                    <div>Engine: {car.engine || 'N/A'}</div>
                    <div>Trans: {car.transmission || 'N/A'}</div>
                    <div>Drive: {car.drivetrain || 'N/A'}</div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/cars/${car.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    {car.is_available ? (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => addToCart(car)}
                        disabled={isInCart(car.id)}
                      >
                        {isInCart(car.id) ? 'Added to Cart' : 'Add to Cart'}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="flex-1 bg-muted text-muted-foreground"
                        disabled
                      >
                        Sold
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InventoryPageContent />
    </Suspense>
  );
}
