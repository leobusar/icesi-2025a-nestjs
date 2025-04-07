import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from "uuid";

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
    public cars: Car[] =  [
        {
            "brand": "Chevrolet",
            "model": "Captiva", 
            "year": 2021,
            "id": uuid()
        },
        {
            "brand": "Chevrolet",
            "model": "Sprint", 
            "year": 2000,
            "id": uuid()        
        }
    ]
    create(car: CreateCarDto): Car{
        let carNew: Car =  {...car, id: uuid()}; 
        this.cars.push(carNew);

        return carNew;
    }

    getAll(): Car[] {
        return this.cars;
    }

    findById(id: string): Car {
        const car = this.cars.find(car => id == car.id); 
        if (car === undefined) throw new NotFoundException();

        return car;
    }

    update(id: string, car: UpdateCarDto): Car {
        const carUpdate = this.findById(id);
        Object.assign(carUpdate,car); 

        return carUpdate;
    }

    delete(id: string): Car {
        const carDelete = this.findById(id);
        this.cars = this.cars.filter(car => id!==car.id)

        return carDelete; 
    }
}
