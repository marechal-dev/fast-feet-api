import { PublicRoute } from '@Infra/Auth/Decorators/IsPublicRoute.decorator';
import { Controller, Post } from '@nestjs/common';
import { AllowedRoles } from '../Decorators/AllowedRoles.decorator';

@Controller('auth')
export class AuthController {
	@PublicRoute()
	@Post('login')
	public login() {}

	@AllowedRoles('Admin')
	@Post(':document/change-password')
	public changePassword() {}
}
