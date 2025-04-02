import { Body,
     Controller,
     Delete, 
     Get, 
     Param, 
     ParseIntPipe, 
     Patch, 
     Post, 
     Put, 
     Query, 
     UsePipes,
     ValidationPipe} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { SearchCarDto } from './dto/search-car.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

    @Get()
    getAll(
         @Query() params: SearchCarDto
    ){
        return `Return ${params.limit} cars after ${params.offset}`;
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number){

        return 'return a car with id '+ (id+1);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: string,
           @Body() body:UpdateCarDto){
        return {car: body, mess: `update car with id ${id}` };
    }
    
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: string){
        return 'delete a car with id '+id;
    }

    @Post('')
    //@UsePipes(ValidationPipe)
    create(@Body() car:CreateCarDto){

        return this.carService.create(car);
    }
}
