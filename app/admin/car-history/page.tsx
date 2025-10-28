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
import {
  History,
  Plus,
  Edit,
  Trash2,
  Search,
  Car,
  AlertTriangle,
  Users,
  Wrench,
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';

interface CarHistory {
  id: number;
  car_id: number;
  accidents: boolean;
  previous_owners: number;
  service_records: number;
  cars?: {
    make: string;
    model: string;
    year: number;
    vin: string;
  };
}

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  vin: string;
}

export default function CarHistoryManagement() {
  const [carHistories, setCarHistories] = useState<CarHistory[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCar, setFilterCar] = useState('');
  const [selectedHistory, setSelectedHistory] = useState<CarHistory | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteHistoryId, setDeleteHistoryId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    car_id: '',
    accidents: false,
    previous_owners: 0,
    service_records: 0,
  });

  useEffect(() => {
    fetchCarHistories();
    fetchCars();
  }, []);

  const fetchCarHistories = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('car_history')
        .select(
          `
          *,
          cars (make, model, year, vin)
        `
        )
        .order('id', { ascending: false });

      if (error) throw error;
      setCarHistories(data || []);
    } catch (error) {
      console.error('Error fetching car histories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('cars')
        .select('id, make, model, year, vin')
        .order('make');

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const historyData = {
        car_id: Number(formData.car_id),
        accidents: formData.accidents,
        previous_owners: Number(formData.previous_owners),
        service_records: Number(formData.service_records),
      };

      if (selectedHistory) {
        // Update existing history
        const { error } = await supabaseAdmin
          .from('car_history')
          .update(historyData)
          .eq('id', selectedHistory.id);

        if (error) throw error;
      } else {
        // Create new history
        const { error } = await supabaseAdmin
          .from('car_history')
          .insert([historyData]);

        if (error) throw error;
      }

      setIsEditDialogOpen(false);
      setSelectedHistory(null);
      resetForm();
      fetchCarHistories();
    } catch (error) {
      console.error('Error saving car history:', error);
    }
  };

  const handleEdit = (history: CarHistory) => {
    setSelectedHistory(history);
    setFormData({
      car_id: history.car_id.toString(),
      accidents: history.accidents,
      previous_owners: history.previous_owners,
      service_records: history.service_records,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteHistoryId) return;

    try {
      const { error } = await supabaseAdmin
        .from('car_history')
        .delete()
        .eq('id', deleteHistoryId);

      if (error) throw error;

      setIsDeleteDialogOpen(false);
      setDeleteHistoryId(null);
      fetchCarHistories();
    } catch (error) {
      console.error('Error deleting car history:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      car_id: '',
      accidents: false,
      previous_owners: 0,
      service_records: 0,
    });
  };

  const filteredHistories = carHistories.filter((history) => {
    const matchesSearch =
      history.cars?.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.cars?.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.cars?.vin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCar = !filterCar || history.car_id.toString() === filterCar;

    return matchesSearch && matchesCar;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading car history...</p>
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
            Car History Management
          </h1>
          <p className="text-muted-foreground">
            Manage vehicle history including accidents, previous owners, and
            service records
          </p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setSelectedHistory(null);
                resetForm();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add History Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedHistory ? 'Edit History Record' : 'Add History Record'}
              </DialogTitle>
              <DialogDescription>
                {selectedHistory
                  ? 'Update vehicle history information'
                  : 'Add history information for a vehicle'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="car_id">Vehicle *</Label>
                <Select
                  value={formData.car_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, car_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={car.id.toString()}>
                        {car.year} {car.make} {car.model} - {car.vin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accidents">Accidents</Label>
                <Select
                  value={formData.accidents.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, accidents: value === 'true' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accident status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">No Accidents</SelectItem>
                    <SelectItem value="true">Has Accidents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_records">Service Records</Label>
                  <Input
                    id="service_records"
                    type="number"
                    min="0"
                    value={formData.service_records}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_records: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>
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
                  {selectedHistory ? 'Update Record' : 'Add Record'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search History Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="car">Vehicle</Label>
              <Select value={filterCar} onValueChange={setFilterCar}>
                <SelectTrigger>
                  <SelectValue placeholder="All vehicles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All vehicles</SelectItem>
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.id.toString()}>
                      {car.year} {car.make} {car.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCar('');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Car History Records ({filteredHistories.length})
          </CardTitle>
          <CardDescription>
            Vehicle history including accidents, previous owners, and service
            records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Accidents</TableHead>
                  <TableHead>Previous Owners</TableHead>
                  <TableHead>Service Records</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistories.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {history.cars?.year} {history.cars?.make}{' '}
                          {history.cars?.model}
                        </div>
                        <div className="text-sm text-muted-foreground font-mono">
                          {history.cars?.vin}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {history.accidents ? (
                          <Badge
                            variant="destructive"
                            className="flex items-center space-x-1"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            <span>Yes</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="default"
                            className="flex items-center space-x-1"
                          >
                            <Car className="h-3 w-3" />
                            <span>No</span>
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{history.previous_owners}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                        <span>{history.service_records}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(history)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setDeleteHistoryId(history.id);
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
            <DialogTitle>Delete History Record</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this history record? This action
              cannot be undone.
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
