export class Product {
    public id?: number;
    public name!: string;
    public category!: string;
    public amount?: number;
    public price?: number;
    public billId?: number

    constructor(name: string, category: string, amount?: number, price?: number, billId?: number, id?: number
    ) { 
        this.id = id;
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.price = price;
        this.billId=billId;
     }
  }
  