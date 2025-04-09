import { Injectable, NotFoundException } from '@nestjs/common';
//import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';


@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) {
    }

    async create(car: CreateCarDto): Promise<Car> {
            let carNew = await this.carRepository.save(car);
            return carNew;
    }

    getAll(): Promise<Car[]> {
        return this.carRepository.find();
    }

    async findById(id: string): Promise<Car> {
        const car = await this.carRepository.findOneBy({ id }); 
        if (car == null ) throw new NotFoundException();
        return car;
    }

    async update(id: string, car: UpdateCarDto): Promise<Car> {
        const result = await this.carRepository.update(id, car);
        if (result.affected &&  result.affected < 1 ) throw new NotFoundException();
        return this.findById(id);
    }

    delete(id: string): Promise<Car> {
        const carDelete = this.findById(id);
        this.carRepository.delete(id);
        if (carDelete == null ) throw new NotFoundException();
        return carDelete;
    }
}
