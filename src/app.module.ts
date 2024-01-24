import { HttpService, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';


const API_KEY = '123456';
const API_KEY_PROD = '456789';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: 'API_KEY',
    useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
  },
  {
    provide: 'TASKS',
    useFactory: async (http: HttpService) => {
        const tasks = await http.get('https://jsonplaceholder.typicode.com/todos').toPromise();
        return tasks.data;
    },
    inject: [HttpService],
  },
],
})

export class AppModule {}
