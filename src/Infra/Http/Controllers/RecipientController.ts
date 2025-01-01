import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AllowedRoles } from '../Decorators/AllowedRoles.decorator';

@Controller('recipient')
export class RecipientController {
	@AllowedRoles('Admin')
	@Get()
	public listAll() {}

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
}
