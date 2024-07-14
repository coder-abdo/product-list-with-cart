
type CartItem = {
    name: string
    price: number
    quantity?: number
}
 type ProductType = {
    name: string;
    category: string;
    price: number;
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    }
 }
export type {CartItem, ProductType}