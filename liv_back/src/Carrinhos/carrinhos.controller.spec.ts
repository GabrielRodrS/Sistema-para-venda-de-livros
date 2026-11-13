import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhosController } from './carrinhos.controller';

describe('CarrinhosController', () => {
  let controller: CarrinhosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhosController],
    }).compile();

    controller = module.get<CarrinhosController>(CarrinhosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
