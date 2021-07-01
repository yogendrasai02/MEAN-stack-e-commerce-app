/*
Category object specifications
*/
export class Category {
    constructor(
        public categoryId: number,
        public categoryName: string,
        public subCategories: string[],
        public icon: string
    ) { }
}