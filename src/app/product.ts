export class Product {
    public id?: number;
    public name!: string;
    public categoryId?: number;
    public amount?: number;
    public price?: number;
    public billId?: number

    constructor(name: string, categoryId?: number, amount?: number, price?: number, billId?: number, id?: number
    ) { 
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.amount = amount;
        this.price = price;
        this.billId=billId;
     }
  }
  