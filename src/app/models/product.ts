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

// export class Categories{
//    public static readonly list =  [  
//     { id: 1, name: "Appetizer" },  
//     { id: 2, name: "First Courses" },
//     { id: 3, name: "Main Courses" },
//     { id: 4, name: "Pizzas" },
//     { id: 5, name: "Side Dishes" },
//     { id: 6, name: "Desserts" },
   
//   ]
// }
