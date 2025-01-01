import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('admin')
export class AdminController {
	@Get()
	public listAll() {}

	@Get(':id')
	public listOneByID() {}

	@Get(':document')
	public listOneByDocument() {}

	@Post()
	public create() {}

	@Put(':id')
	public update() {}

	@Delete(':id')
	public delete() {}
}
