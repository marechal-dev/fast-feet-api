import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AllowedRoles } from '../Decorators/AllowedRoles.decorator';

@Controller('delivery-man')
export class DeliveryManController {
	@AllowedRoles('Admin')
	@Get()
	public listAll() {}

	@AllowedRoles('Admin')
	@Get(':id')
	public listOneByID() {}

	@AllowedRoles('Admin')
	@Get(':document')
	public listOneByDocument() {}

	@AllowedRoles('Admin')
	@Post()
	public create() {}

	@AllowedRoles('Admin')
	@Put(':id')
	public update() {}

	@AllowedRoles('Admin')
	@Delete(':id')
	public delete() {}
}
