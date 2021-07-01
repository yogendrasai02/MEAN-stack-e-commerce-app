/*
Product object specifications
*/
export class Product {
    constructor(
        public prodId: number,
        public prodName: string,
        public brand: string,
        public prodCategoryId: number,
        public prodCategory: string,
        public prodSubCategory: string,
        public price: number,
        public discount: number,
        public maxOrderQty: number,
        public stock: number,
        public forSale: boolean,
        public prodImages: string[],
        public description: string
    ) { }
}