import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from './entities/bike.entity';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private bikesRepository: Repository<Bike>,
  ) {}

  findAll(): Promise<Bike[]> {
    return this.bikesRepository.find();
  }

  async findOne(id: string): Promise<Bike> {
    const bike = await this.bikesRepository.findOneBy({ id });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return bike;
  }

  create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const bike = this.bikesRepository.create(createBikeDto);
    return this.bikesRepository.save(bike);
  }

  async update(id: string, updateBikeDto: UpdateBikeDto): Promise<Bike> {
    await this.findOne(id); // Ensure bike exists
    await this.bikesRepository.update(id, updateBikeDto);
    return this.bikesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const result = await this.bikesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
  }
}
