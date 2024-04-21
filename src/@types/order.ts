export type Order = {
    orderId: String;
    userId: String;
    products: Array<String>;
    totalPrice: Number;
    paid: Boolean;
}