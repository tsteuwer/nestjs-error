import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCartDto } from './create.dto';
import { AcceptJsonApiGuard } from './json-api.guard';

@Controller({
  path: 'test',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseGuards(AcceptJsonApiGuard)
  create(@Body() body: CreateCartDto): string {
    console.error(body);
    return 'test';
  }
}
