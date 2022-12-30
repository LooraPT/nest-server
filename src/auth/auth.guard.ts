import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const header: string = req.headers.authorization;
            const bearer = header.split(' ')[0];
            const token = header.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('User is not authorization', HttpStatus.UNAUTHORIZED)
            }
            const user = this.authService.validateAccessToken(token)
            if (!user) {
                throw new HttpException('User is not authorization', HttpStatus.UNAUTHORIZED)
            }
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: 'user not authorization' })
        }
    }

}