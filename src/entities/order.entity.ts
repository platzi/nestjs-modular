import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";

export class Order{
  date: Date;
  user: User;
  products: Product[];
}
