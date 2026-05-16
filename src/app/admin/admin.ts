// import { ChangeDetectorRef, Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Api } from '../services/api';

// @Component({
//   selector: 'app-admin',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './admin.html',
//   styleUrl: './admin.scss'
// })
// export class Admin {

//   constructor(
//     private api: Api,
//     private cdr: ChangeDetectorRef
//   ) {}

//   categories: any[] = [];

//   showDrawer = false;

//   categoryName = '';

//   editingId: number | null = null;

//   loading = false;

//   ngOnInit() {
//     this.loadCategories();
//   }

//   loadCategories() {
//     this.loading = true;

//     this.api.getAll('categories').subscribe({
//       next: (res: any) => {
//         this.categories = res.data;
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//       error: () => {
//         this.loading = false;
//         alert('Failed to load categories');
//       }
//     });
//   }

//   openDrawer() {
//     this.showDrawer = true;
//   }

//   closeDrawer() {
//     this.showDrawer = false;
//     this.categoryName = '';
//     this.editingId = null;
//   }

//   createCategory() {

//     if (!this.categoryName.trim()) {
//       alert('Enter category name');
//       return;
//     }

//     const body = {
//       name: this.categoryName.trim()
//     };

//     // UPDATE
//     if (this.editingId !== null) {

//       this.api.put(`categories/${this.editingId}`, body).subscribe({
//         next: () => {
//           this.closeDrawer();
//           this.loadCategories();
//           alert('Category updated');
//         },
//         error: () => alert('Update failed')
//       });

//       return;
//     }

//     // CREATE
//     this.api.post('categories', body).subscribe({
//       next: () => {
//         this.closeDrawer();
//         this.loadCategories();
//         alert('Category created');
//       },
//       error: () => alert('Create failed')
//     });
//   }

//   editCategory(item: any) {
//     this.categoryName = item.name;
//     this.editingId = item.id;
//     this.showDrawer = true;
//   }

//   deleteCategory(id: number) {

//     const ok = confirm('Delete this category?');
//     if (!ok) return;

//     this.api.delete(`categories/${id}`).subscribe({
//       next: () => {
//         this.loadCategories();
//         alert('Category deleted');
//       },
//       error: () => alert('Delete failed')
//     });
//   }
// }


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

  // TAB CONTROL
  activeTab: 'categories' | 'products' = 'categories';

  // CATEGORIES
  categories: any[] = [];
  categoryName = '';
  editingCategoryId: number | null = null;

  // PRODUCTS
  products: Product[] = [];
  categoriesList: any[] = [];

  // PRODUCT FORM
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

  // SWITCH TAB
  setTab(tab: 'categories' | 'products') {
    this.activeTab = tab;
  }

  // =======================
  // CATEGORIES
  // =======================

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
    if (!confirm('Delete category?')) return;

    this.api.delete(`categories/${id}`).subscribe({
      next: () => this.loadCategories()
    });
  }

  resetCategory() {
    this.categoryName = '';
    this.editingCategoryId = null;
  }

  // =======================
  // PRODUCTS
  // =======================

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
    if (!confirm('Delete product?')) return;

    this.api.delete(`products/${id}`).subscribe({
      next: () => this.loadProducts()
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