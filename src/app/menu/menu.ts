import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Category, Product } from '../models/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(private api:Api,
              private cdr:ChangeDetectorRef,){}



    ngOnInit(){
    this.api.getAll(`products?Take=100&Page=1`).subscribe((resp:any)=>{
      console.log(resp.data.products)
      this.productsarr=resp.data.products
      this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!
    })

      this.api.getAll(`categories`).subscribe((resp:any)=>{
      console.log(resp.data)
      this.categoriesarr=resp.data
      this.cdr.detectChanges()
    })

  }


  filterByCategory(categoryId: number) {
     this.selectedCategoryId = categoryId;
  this.api.getAll(`products/filter?CategoryId=${categoryId}&Take=100&Page=1`)
    .subscribe((resp: any) => {
      console.log('Filtered:', resp.data.products)
      this.productsarr = resp.data.products
      this.cdr.detectChanges()
    });
}

all(){
  this.selectedCategoryId = null;
      this.api.getAll(`products?Take=100&Page=1`).subscribe((resp:any)=>{
      console.log(resp.data.products)
      this.productsarr=resp.data.products
      this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!
    })
}
    

selectedCategoryId: number | null = null;

  categoriesarr:Category[]=[]
  productsarr:Product[]=[]

}
