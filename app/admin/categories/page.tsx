'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';

interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
      };

      if (selectedCategory) {
        // Update existing category
        const { error } = await supabaseAdmin
          .from('categories')
          .update(categoryData)
          .eq('id', selectedCategory.id);

        if (error) throw error;
      } else {
        // Create new category
        const { error } = await supabaseAdmin
          .from('categories')
          .insert([categoryData]);

        if (error) throw error;
      }

      setIsEditDialogOpen(false);
      setSelectedCategory(null);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteCategoryId) return;

    try {
      const { error } = await supabaseAdmin
        .from('categories')
        .delete()
        .eq('id', deleteCategoryId);

      if (error) throw error;

      setIsDeleteDialogOpen(false);
      setDeleteCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
    });
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories Management</h1>
          <p className="text-muted-foreground">
            Manage vehicle categories
          </p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setSelectedCategory(null); resetForm(); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
              <DialogDescription>
                {selectedCategory ? 'Update category information' : 'Add a new vehicle category'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Sedans, SUVs, Trucks"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description for this category"
                  rows={3}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedCategory ? 'Update Category' : 'Add Category'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({filteredCategories.length})</CardTitle>
          <CardDescription>
            Manage your vehicle categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FolderOpen className="h-4 w-4 text-primary" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {category.description ? (
                        <span className="text-muted-foreground">{category.description}</span>
                      ) : (
                        <Badge variant="outline">No description</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(category.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setDeleteCategoryId(category.id);
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
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
              Cars associated with this category will have their category set to null.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
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
