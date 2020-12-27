import { IdeaDTO } from './idea.dto';
import { IdeaEntity } from './idea.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}
  async showAll(){
      return await this.ideaRepository.find();
  }
  async create(data: Partial<IdeaDTO>){
      const idea = await this.ideaRepository.create(data);
      await this.ideaRepository.save(idea);
      return idea;
  }
  async read(id:string){
      return await this.ideaRepository.findOne({where:{id}});
  }
  async update(id:string, data){
      await this.ideaRepository.update({id}, data);
      return await this.ideaRepository.findOne({id})
  }
  async destroy(id:string){
      await this.ideaRepository.delete({id});
      return {deleted:true}
  }
}
