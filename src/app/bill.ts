import { Product } from "./product";

export class Bill {
    constructor(
      public shop: string,
      public city: string,
      public date: string,
      public products: Array<Product>,
      public id?: number
    ) {  }
  }
  