import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { Product } from '../models/product';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  activeTab: 'categories' | 'products' = 'categories';

  categories: any[] = [];
  categoryName = '';
  editingCategoryId: number | null = null;
  products: Product[] = [];
  categoriesList: any[] = [];
  showDrawer = false;
  editingProductId: number | null = null;
  name = '';
  description = '';
  price = 0;
  image = '';
  categoryId: number | null = null;
  spiciness = 0;
  vegetarian = false;
  method = '';
  ingredientsText = '';

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }


  setTab(tab: 'categories' | 'products') {
    this.activeTab = tab;
  }


  loadCategories() {
    this.api.getAll('categories').subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.categoriesList = res.data;
      }
    });
  }

  saveCategory() {

    if (!this.categoryName.trim()) return;

    const body = { name: this.categoryName };

    if (this.editingCategoryId !== null) {

      this.api.put(`categories/${this.editingCategoryId}`, body).subscribe({
        next: () => {
          this.loadCategories();
          this.resetCategory();
        }
      });

      return;
    }

    this.api.post('categories', body).subscribe({
      next: () => {
        this.loadCategories();
        this.resetCategory();
      }
    });
  }

  editCategory(item: any) {
    this.categoryName = item.name;
    this.editingCategoryId = item.id;
  }

  deleteCategory(id: number) {

  const staticIds = [1, 2, 3, 4, 5, 6];

  if (staticIds.includes(id)) {
    alert("You can't delete default categories");
    return;
  }

  if (!confirm('Delete category?')) return;

  this.api.delete(`categories/${id}`).subscribe({

    next: () => {

      this.categories = this.categories.filter(c => c.id !== id);

      this.loadCategories();

      this.cdr.detectChanges();
    },

    error: (err) => {
      console.log(err);
    }

  });
}

  resetCategory() {
    this.categoryName = '';
    this.editingCategoryId = null;
  }


  loadProducts() {
    this.api.getAll('products?Take=100&Page=1').subscribe({
      next: (res: any) => {
        this.products = res.data.products;
        this.cdr.detectChanges();
      }
    });
  }

  openProductDrawer() {
    this.resetProduct();
    this.showDrawer = true;
  }

  closeDrawer() {
    this.showDrawer = false;
  }

  saveProduct() {

    const body = {
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
      categoryId: this.categoryId,
      spiciness: this.spiciness,
      vegetarian: this.vegetarian,
      method: this.method,
      ingredients: this.ingredientsText
        ? this.ingredientsText.split(',').map(x => x.trim())
        : []
    };

    if (this.editingProductId !== null) {

      this.api.put(`products/${this.editingProductId}`, body).subscribe({
        next: () => {
          this.loadProducts();
          this.closeDrawer();
        }
      });

      return;
    }

    this.api.post('products', body).subscribe({
      next: () => {
        this.loadProducts();
        this.closeDrawer();
      }
    });
  }

  editProduct(item: Product) {

    this.name = item.name;
    this.description = item.description;
    this.price = item.price;
    this.image = item.image;
    this.spiciness = item.spiciness;
    this.vegetarian = item.vegetarian;
    this.method = item.method || '';
    this.ingredientsText = item.ingredients?.join(', ') || '';

    this.editingProductId = item.id;
    this.showDrawer = true;
  }

  deleteProduct(id: number) {

  const staticProductIds = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,
    18,19,20,21,22,23,24,
    25,26,27,28,29,30,31,
    32,33,34,35,36,37,38,
    39,40,41,42,43,44,45,
    46,47,48,49,50
  ];

  if (staticProductIds.includes(id)) {
    alert("You can't delete default products");
    return;
  }

  if (!confirm('Delete product?')) return;

  this.api.delete(`products/${id}`).subscribe({

    next: () => {

      this.products = this.products.filter(p => p.id !== id);

      this.loadProducts();

      this.cdr.detectChanges();
    },

    error: (err) => {
      console.log(err);
    }

  });
}

  resetProduct() {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.image = '';
    this.categoryId = null;
    this.spiciness = 0;
    this.vegetarian = false;
    this.method = '';
    this.ingredientsText = '';
    this.editingProductId = null;
  }
}