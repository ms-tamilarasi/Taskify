import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = true;
  if (isLoggedIn) {
    return true;
  } else{
    return false;
  }
};
