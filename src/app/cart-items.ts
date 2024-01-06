export class CartItems {

    id:string;
    title: string;
    price: number;
    description: string;
    image: string;
    rate: string;
    count: number;

    constructor(id: string, title: string,price:number,description:string,image:string,rate:string,count:number) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
        this.rate = rate;
        this.count = count;
    }
}
