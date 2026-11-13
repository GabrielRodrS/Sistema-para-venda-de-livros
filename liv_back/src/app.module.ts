import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './Usuarios/usuarios.module';
import { LivrosModule } from './Livros/livros.module';
import { CarrinhosModule } from './Carrinhos/carrinhos.module';
import { PedidosModule } from './Pedidos/pedidos.module';
import { PesquisasModule } from './Pesquisas/pesquisas.module';

@Module({
  imports: [
    // Carrega o .env e torna acessível globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuração do TypeORM (dinâmica via .env ou DATABASE_URL)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (databaseUrl) {
          // Para produção (Render)
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: false, // não recomendado true em produção
          };
        } else {
          // Para ambiente local
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            autoLoadEntities: true,
            synchronize: false, // use com cautela localmente
          };
        }
      },
    }),

    // Seus módulos
    UsuariosModule,
    LivrosModule,
    CarrinhosModule,
    PedidosModule,
    PesquisasModule,
  ],
})
export class AppModule {}

/*import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './Usuarios/usuarios.module';
import { LivrosModule } from './Livros/livros.module';
import { CarrinhosModule } from './Carrinhos/carrinhos.module';
import { PedidosModule } from './Pedidos/pedidos.module';
import { PesquisasModule } from './Pesquisas/pesquisas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite acessar as variáveis de qualquer lugar
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    UsuariosModule,
    LivrosModule,
    CarrinhosModule,
    PedidosModule,
    PesquisasModule,
  ],
})
export class AppModule {}
*/
