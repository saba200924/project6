import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
    isAuth = signal(false)

  signIn(){this.isAuth.set(true)
  }

  signOut(){this.isAuth.set(false)

  }
}
