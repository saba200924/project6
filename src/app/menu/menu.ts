import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Product } from '../models/product';
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
    this.api.getAll(`products`).subscribe((resp:any)=>{
      console.log(resp.data.products)
      this.productsarr=resp.data.products
      this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამათება !!!!!!!!!!!!!!!

    })
  }
  productsarr:Product[]=[]

}
