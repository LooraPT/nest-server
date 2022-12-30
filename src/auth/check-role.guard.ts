import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/roles/roles.decorator";
import { User } from "src/users/models/users.model";
import { AuthService } from "./auth.service";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private authService: AuthService,
        private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest();
            const authToken: string = req.headers.authorization;
            const bearer = authToken.split(' ')[0]
            const token = authToken.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'not auth' })
            }
            const user: User = this.authService.validateAccessToken(token)
            if (!user) {
                throw new UnauthorizedException({ message: 'not auth' })
            }
            req.user = user;
            return user.roles.some((role: { value: string; }) => requiredRoles.includes(role.value))
        } catch (e) {
            throw new HttpException('Not access', HttpStatus.FORBIDDEN)
        }
    }

}