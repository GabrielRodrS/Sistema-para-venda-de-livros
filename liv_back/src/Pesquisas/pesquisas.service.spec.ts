import { Test, TestingModule } from '@nestjs/testing';
import { PesquisasService } from './pesquisas.service';

describe('PesquisasService', () => {
  let service: PesquisasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PesquisasService],
    }).compile();

    service = module.get<PesquisasService>(PesquisasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
