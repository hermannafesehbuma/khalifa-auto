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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Car,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Upload,
  Image as ImageIcon,
  Star,
  X,
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';

interface CarData {
  id: number;
  category_id: number | null;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  is_available: boolean;
  exterior_color: string;
  interior_color: string;
  drive_train: string;
  engine: string;
  horsepower: number;
  torque: number;
  transmission: string;
  style: string;
  accident_history: boolean;
  previous_owners: number;
  service_record_number: number;
  created_at: string;
  updated_at: string;
  images: any;
  vin: string;
  categories?: { name: string };
}

interface Category {
  id: number;
  name: string;
}

export default function CarsManagement() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteCarId, setDeleteCarId] = useState<number | null>(null);
  const [carImages, setCarImages] = useState<any[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [newCarImages, setNewCarImages] = useState<File[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    description: '',
    is_available: true,
    exterior_color: '',
    interior_color: '',
    drive_train: '',
    engine: '',
    horsepower: 0,
    torque: 0,
    transmission: '',
    style: '',
    accident_history: false,
    previous_owners: 0,
    service_record_number: 0,
    vin: '',
    category_id: 'none',
  });

  useEffect(() => {
    fetchCars();
    fetchCategories();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('cars')
        .select(
          `
          *,
          categories (name)
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
      const { data, error } = await supabaseAdmin
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

  const fetchCarImages = async (carId: number) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('car_images')
        .select('*')
        .eq('car_id', carId)
        .order('sort_order');

      if (error) throw error;
      setCarImages(data || []);
    } catch (error) {
      console.error(
        'Error fetching car images:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const handleImageUpload = async (files: FileList, carId: number) => {
    setUploadingImages(true);
    try {
      // First, let's check what buckets are available
      const { data: buckets, error: bucketsError } =
        await supabaseAdmin.storage.listBuckets();
      console.log('Available buckets:', buckets);

      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError);
        throw bucketsError;
      }

      const uploadPromises = Array.from(files).map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${carId}-${Date.now()}-${index}.${fileExt}`;
        const filePath = `cars/${fileName}`;

        console.log('Attempting to upload to bucket: car-storage');
        console.log('File path:', filePath);

        const { error: uploadError } = await supabaseAdmin.storage
          .from('car-storage')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabaseAdmin.storage.from('car-storage').getPublicUrl(filePath);

        const { error: insertError } = await supabaseAdmin
          .from('car_images')
          .insert({
            car_id: carId,
            image_url: publicUrl,
            sort_order: carImages.length + index,
          });

        if (insertError) throw insertError;

        return { image_url: publicUrl, sort_order: carImages.length + index };
      });

      await Promise.all(uploadPromises);
      await fetchCarImages(carId);
    } catch (error) {
      console.error(
        'Error uploading images:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      alert(
        `Error uploading images: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setUploadingImages(false);
    }
  };

  const setMainImage = async (imageId: number, carId: number) => {
    try {
      // Get current images
      const { data: images } = await supabaseAdmin
        .from('car_images')
        .select('*')
        .eq('car_id', carId)
        .order('sort_order');

      if (!images) return;

      // Update sort orders - main image gets 0, others get incrementing numbers
      const updates = images.map((img, index) => ({
        id: img.id,
        sort_order: img.id === imageId ? 0 : index + 1,
      }));

      for (const update of updates) {
        await supabaseAdmin
          .from('car_images')
          .update({ sort_order: update.sort_order })
          .eq('id', update.id);
      }

      await fetchCarImages(carId);
    } catch (error) {
      console.error(
        'Error setting main image:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const deleteImage = async (imageId: number, carId: number) => {
    try {
      const { error } = await supabaseAdmin
        .from('car_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      await fetchCarImages(carId);
    } catch (error) {
      console.error(
        'Error deleting image:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const carData = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        horsepower: Number(formData.horsepower),
        torque: Number(formData.torque),
        previous_owners: Number(formData.previous_owners),
        service_record_number: Number(formData.service_record_number),
        category_id:
          formData.category_id === 'none' ? null : Number(formData.category_id),
      };

      console.log('Car data being saved:', carData);

      let carId: number;

      if (selectedCar) {
        // Update existing car
        const { error } = await supabaseAdmin
          .from('cars')
          .update(carData)
          .eq('id', selectedCar.id);

        if (error) throw error;
        carId = selectedCar.id;
      } else {
        // Create new car
        const { data, error } = await supabaseAdmin
          .from('cars')
          .insert([carData])
          .select();

        if (error) throw error;
        carId = data[0].id;

        // Upload images for new car
        if (newCarImages.length > 0) {
          setUploadingImages(true);
          try {
            const uploadPromises = newCarImages.map(async (file, index) => {
              const fileExt = file.name.split('.').pop();
              const fileName = `${carId}-${Date.now()}-${index}.${fileExt}`;
              const filePath = `cars/${fileName}`;

              const { error: uploadError } = await supabaseAdmin.storage
                .from('car-storage')
                .upload(filePath, file);

              if (uploadError) throw uploadError;

              const {
                data: { publicUrl },
              } = supabaseAdmin.storage
                .from('car-storage')
                .getPublicUrl(filePath);

              const { error: insertError } = await supabaseAdmin
                .from('car_images')
                .insert({
                  car_id: carId,
                  image_url: publicUrl,
                  sort_order: index,
                });

              if (insertError) throw insertError;
            });

            await Promise.all(uploadPromises);
          } catch (error) {
            console.error(
              'Error uploading images for new car:',
              error instanceof Error ? error.message : 'Unknown error'
            );
            alert(
              `Error uploading images: ${
                error instanceof Error ? error.message : 'Unknown error'
              }`
            );
          } finally {
            setUploadingImages(false);
          }
        }
      }

      setIsEditDialogOpen(false);
      setSelectedCar(null);
      setNewCarImages([]);
      resetForm();
      fetchCars();
    } catch (error) {
      console.error(
        'Error saving car:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        details: (error as any)?.details,
        hint: (error as any)?.hint,
        code: (error as any)?.code,
      });
      alert(
        `Error saving car: ${
          error instanceof Error ? error.message : 'Unknown error occurred'
        }`
      );
    }
  };

  const handleEdit = (car: CarData) => {
    setSelectedCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage || 0,
      description: car.description || '',
      is_available: car.is_available,
      exterior_color: car.exterior_color || '',
      interior_color: car.interior_color || '',
      drive_train: car.drive_train || '',
      engine: car.engine || '',
      horsepower: car.horsepower || 0,
      torque: car.torque || 0,
      transmission: car.transmission || '',
      style: car.style || '',
      accident_history: car.accident_history,
      previous_owners: car.previous_owners || 0,
      service_record_number: car.service_record_number || 0,
      vin: car.vin,
      category_id: car.category_id ? car.category_id.toString() : 'none',
    });
    fetchCarImages(car.id);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteCarId) return;

    try {
      const { error } = await supabaseAdmin
        .from('cars')
        .delete()
        .eq('id', deleteCarId);

      if (error) throw error;

      setIsDeleteDialogOpen(false);
      setDeleteCarId(null);
      fetchCars();
    } catch (error) {
      console.error(
        'Error deleting car:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      description: '',
      is_available: true,
      exterior_color: '',
      interior_color: '',
      drive_train: '',
      engine: '',
      horsepower: 0,
      torque: 0,
      transmission: '',
      style: '',
      accident_history: false,
      previous_owners: 0,
      service_record_number: 0,
      vin: '',
      category_id: 'none',
    });
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' ||
      !filterCategory ||
      car.categories?.name === filterCategory;
    const matchesCondition =
      filterCondition === 'all' ||
      !filterCondition ||
      car.is_available === (filterCondition === 'available');

    return matchesSearch && matchesCategory && matchesCondition;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading cars...</p>
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
            Cars Management
          </h1>
          <p className="text-muted-foreground">Manage your vehicle inventory</p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setSelectedCar(null);
                resetForm();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedCar ? 'Edit Car' : 'Add New Car'}
              </DialogTitle>
              <DialogDescription>
                {selectedCar
                  ? 'Update car information'
                  : 'Add a new vehicle to your inventory'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: Number(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    min="0"
                    value={formData.mileage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mileage: Number(e.target.value),
                      })
                    }
                    placeholder="Enter mileage in miles"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previous_owners">Previous Owners</Label>
                  <Input
                    id="previous_owners"
                    type="number"
                    min="0"
                    value={formData.previous_owners}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        previous_owners: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vin">VIN *</Label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) =>
                    setFormData({ ...formData, vin: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exterior_color">Exterior Color</Label>
                  <Input
                    id="exterior_color"
                    value={formData.exterior_color}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        exterior_color: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interior_color">Interior Color</Label>
                  <Input
                    id="interior_color"
                    value={formData.interior_color}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interior_color: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="drive_train">Drive Train</Label>
                  <Select
                    value={formData.drive_train}
                    onValueChange={(value) =>
                      setFormData({ ...formData, drive_train: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select drive train" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FWD">FWD</SelectItem>
                      <SelectItem value="RWD">RWD</SelectItem>
                      <SelectItem value="AWD">AWD</SelectItem>
                      <SelectItem value="4WD">4WD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) =>
                      setFormData({ ...formData, transmission: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="engine">Engine</Label>
                  <Input
                    id="engine"
                    value={formData.engine}
                    onChange={(e) =>
                      setFormData({ ...formData, engine: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horsepower">Horsepower</Label>
                  <Input
                    id="horsepower"
                    type="number"
                    value={formData.horsepower}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        horsepower: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="torque">Torque</Label>
                  <Input
                    id="torque"
                    type="number"
                    value={formData.torque}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        torque: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="style">Style/Trim</Label>
                  <Input
                    id="style"
                    value={formData.style}
                    onChange={(e) =>
                      setFormData({ ...formData, style: e.target.value })
                    }
                    placeholder="e.g., 430i xDrive Convertible, Limited, Sport"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accident_history">Accident History</Label>
                  <Select
                    value={formData.accident_history.toString()}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        accident_history: value === 'true',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select accident history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">No Accidents</SelectItem>
                      <SelectItem value="true">Has Accidents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service_record_number">
                    Service Record Number
                  </Label>
                  <Input
                    id="service_record_number"
                    type="number"
                    min="0"
                    value={formData.service_record_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_record_number: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="is_available">Availability</Label>
                  <Select
                    value={formData.is_available.toString()}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        is_available: value === 'true',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              {/* Image Management Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Car Images</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          if (selectedCar) {
                            // Editing existing car
                            handleImageUpload(e.target.files, selectedCar.id);
                          } else {
                            // Adding new car - store files for later upload
                            setNewCarImages(Array.from(e.target.files));
                          }
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                      disabled={uploadingImages}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById('image-upload')?.click()
                      }
                      disabled={uploadingImages}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingImages ? 'Uploading...' : 'Upload Images'}
                    </Button>
                  </div>
                </div>

                {/* Show existing images for editing */}
                {selectedCar && carImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {carImages.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
                          <img
                            src={image.image_url}
                            alt={`Car image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Main Image Indicator */}
                        {image.sort_order === 0 && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-yellow-500 text-yellow-900">
                              <Star className="h-3 w-3 mr-1" />
                              Main
                            </Badge>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-1">
                            {image.sort_order !== 0 && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() =>
                                  setMainImage(image.id, selectedCar.id)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Star className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                deleteImage(image.id, selectedCar.id)
                              }
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Show new images for adding */}
                {!selectedCar && newCarImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {newCarImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New car image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Main Image Indicator */}
                        {index === 0 && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-yellow-500 text-yellow-900">
                              <Star className="h-3 w-3 mr-1" />
                              Main
                            </Badge>
                          </div>
                        )}

                        {/* Remove Button */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              const updatedImages = newCarImages.filter(
                                (_, i) => i !== index
                              );
                              setNewCarImages(updatedImages);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {((selectedCar && carImages.length === 0) ||
                  (!selectedCar && newCarImages.length === 0)) && (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground mb-2">
                      No images uploaded yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Upload images to showcase this vehicle
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedCar ? 'Update Car' : 'Add Car'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
                  placeholder="Search by make, model, or VIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select
                value={filterCondition}
                onValueChange={setFilterCondition}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All availability</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="not_available">Not Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('');
                  setFilterCondition('');
                }}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cars Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cars Inventory ({filteredCars.length})</CardTitle>
          <CardDescription>Manage your vehicle inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand/Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Previous Owners</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>VIN</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {car.brand} {car.model}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {car.style}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(car.price)}
                    </TableCell>
                    <TableCell>
                      {car.mileage
                        ? `${car.mileage.toLocaleString()} mi`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{car.previous_owners || 0}</TableCell>
                    <TableCell>
                      <Badge
                        variant={car.is_available ? 'default' : 'secondary'}
                      >
                        {car.is_available ? 'Available' : 'Not Available'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {car.categories?.name || 'Uncategorized'}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {car.vin}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/cars/${car.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(car)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setDeleteCarId(car.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Car</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this car? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
