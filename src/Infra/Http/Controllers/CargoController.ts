import { PublicRoute } from '@Infra/Auth/Decorators/IsPublicRoute.decorator';
import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { AllowedRoles } from '../Decorators/AllowedRoles.decorator';

@Controller('cargo')
export class CargoController {
	@AllowedRoles('Admin')
	@Get()
	public listAll() {}

	@PublicRoute()
	@Get('nearby')
	public listAllWithDeliveryLocationNearby() {}

	@AllowedRoles('Admin')
	@Get(':id')
	public listOneByID() {}

	@AllowedRoles('Admin')
	@Post()
	public create() {}

	@AllowedRoles('Admin')
	@Put(':id')
	public update() {}

	@AllowedRoles('Admin')
	@Delete(':id')
	public delete() {}

	@AllowedRoles('Admin')
	@Patch(':id')
	public changeCargoStatus() {}

	@AllowedRoles('DeliveryMan')
	@Patch(':id/pick-up')
	public pickUpCargo() {}

	@AllowedRoles('DeliveryMan')
	@Patch(':id/deliver')
	public markCargoAsDelivered() {}
}
