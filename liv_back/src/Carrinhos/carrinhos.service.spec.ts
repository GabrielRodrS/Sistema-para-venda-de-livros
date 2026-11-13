import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhosService } from './carrinhos.service';

describe('CarrinhosService', () => {
  let service: CarrinhosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrinhosService],
    }).compile();

    service = module.get<CarrinhosService>(CarrinhosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
