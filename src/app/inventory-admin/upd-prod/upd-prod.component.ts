import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/modelClasses/category.model';
import { Product } from 'src/app/modelClasses/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-upd-prod',
  templateUrl: './upd-prod.component.html',
  styleUrls: ['./upd-prod.component.css']
})
export class UpdProdComponent implements OnInit {

  @ViewChild('formRef') formRef!: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  prodId: number = 0;
  product!: Product;

  categories: Category[] = [];
  selectedCategory: string = "";
  selectedCategoryId: number = 0;
  selectedSubCategory: string = "";

  ngOnInit(): void {
    this.prodId = +this.route.snapshot.params["prodId"];
    this.route.params.subscribe(params => {
      this.prodId = +params["prodId"];
     }, err => {
      alert("Error:" + err);
    });

    this.categoryService.getCategories().subscribe(res => {
      this.categories = res["categoriesData"];
    }, err => {
      alert("Error:" + err);
    });

    this.productService.getProduct(this.prodId).subscribe(res => {
      if (res["productData"]) {
        this.product = res["productData"];
        // this.selectedCategory = this.product.prodCategory;
        this.selectedCategory = "0";
        this.selectedCategoryId = this.product.prodCategoryId;
        this.selectedSubCategory = this.product.prodSubCategory;
      }
    }, err => {
      alert("Error:" + err);
    });
  }

  getSubCats() {
    let subCatElem: HTMLSelectElement = document.getElementById("subCategories") as HTMLSelectElement;
    let subCats:String[] = [];
    for (let cat of this.categories) {
      if (cat.categoryName == this.selectedCategory) {
        this.selectedCategoryId = cat.categoryId;
        subCats = cat.subCategories;
        break;
       }
    }
    subCatElem.innerHTML = '';
    let options = `<option value="none">Select a subcategory</option>`;
    for (let sub of subCats) {
        options += `
        <option value="${sub}">${sub}</option>
        `;
    }
    subCatElem.innerHTML = options;
  }

  updProduct() {
    let newProductObj = new Product(
      this.product.prodId,
      this.formRef.value.prodName,
      this.formRef.value.brand,
      this.selectedCategoryId,
      this.selectedCategory,
      this.selectedSubCategory,
      this.formRef.value.price,
      this.formRef.value.discount,
      this.formRef.value.maxOrderQty,
      this.formRef.value.stock,
      true,
      [this.formRef.value.image],
      this.formRef.value.description
    );
    this.productService.updateProduct(newProductObj).subscribe(res => {
      if (res["updated"])
        this.router.navigate(["/inventory-admin", "products"]);
     }, err => {
      alert("Error:" + err);
    });
  }

}
