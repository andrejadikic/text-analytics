import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {HistoryService} from "./services/history.service";

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  constructor(private router: Router, private historyService: HistoryService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    console.log(this.historyService.getToken())
    if (localStorage.getItem("token")) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
export const authorizationGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route,state)
};
