import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  

  lang=`en`
  greeting=`Hello`
  changelanguage(){
    this.lang==`en`?this.lang=`geo`: this.lang=`en`;
    this.lang==`en`?this.greeting=`Hello`: this.greeting=`გამარჯობა`;
  }

  clearstring(str:string){
    return str.trim().toLowerCase()
  }



}
