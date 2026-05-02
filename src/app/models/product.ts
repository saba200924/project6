export class Product{

  canDelete!:boolean
  description!:string
  id!:number
  image!:string
  name!:string
  price!:number
  rate!:number
  spiciness!:number
  vegetarian!: boolean;
  ingredients?: string[];
  method?: string;

}

export class Category{
  id!:number
  name!:string
}