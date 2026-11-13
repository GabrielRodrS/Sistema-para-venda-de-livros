import { Test, TestingModule } from '@nestjs/testing';
import { PesquisasController } from './pesquisas.controller';

describe('PesquisasController', () => {
  let controller: PesquisasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesquisasController],
    }).compile();

    controller = module.get<PesquisasController>(PesquisasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
