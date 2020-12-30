import { Product } from "./product";

export class Bill {
    constructor(
      public shop: string,
      public city: string,
      public date: Date,
      public products: Array<Product>,
      public id?: number
    ) {  }
  }
  