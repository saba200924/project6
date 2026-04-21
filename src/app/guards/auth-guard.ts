import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
    if(localStorage.getItem("token") == null){
    alert("you need to sign first")
    router.navigateByUrl("/login")
      return false
  }
  return true;
};
