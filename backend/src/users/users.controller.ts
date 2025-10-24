import { Controller, Get, Put, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile(@Request() req) {
		const user = await this.usersService.findById(req.user.id);
		if (!user) throw new NotFoundException('User not found');
		// Do not return password
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = user as any;
		return rest;
	}

	@UseGuards(JwtAuthGuard)
	@Put('profile')
	async updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
		const updated = await this.usersService.update(req.user.id, dto as any);
		if (!updated) throw new NotFoundException('User not found');
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = updated as any;
		return rest;
	}
}
