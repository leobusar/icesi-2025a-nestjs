import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
    create(car: CreateCarDto): Car{

        return {...car, id: 123}
    }
}
