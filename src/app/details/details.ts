import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { Product } from '../models/product';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  constructor(private route:ActivatedRoute,
              private api : Api,
              private cdr: ChangeDetectorRef){
    this.route.queryParams.subscribe((data:any)=>{
      console.log(data.id);
      this.selectedid=data.id
    })
  }



    ngOnInit(){
    this.api.getAll(`products`).subscribe((resp:any)=>{
      console.log(resp)
      this.productsarr=resp
      this.selectedProduct=this.productsarr.find(el=>el.id==this.selectedid)|| new Product()
      this.cdr.detectChanges()  // ყველა ქოლის მერე აუცილებელია ამის დამატება !!!!!!!!!!!!!!!

    })
  }




  selectedid = 0

  productsarr : Product[]=[]
  selectedProduct!:Product

}
