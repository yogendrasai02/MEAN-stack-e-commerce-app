import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/modelClasses/category.model';
import { Product } from 'src/app/modelClasses/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  @ViewChild('formRef') formRef!: NgForm;
  categories: Category[] = [];
  selectedCategory: string = "";
  selectedCategoryId: number = 0;
  selectedSubCategory: string = "";
  maxId: number = 0;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res["categoriesData"];
    }, err => {
      alert("Error:" + err);
    });

    this.productService.getAllProducts().subscribe(res => {
      for (let prod of res["products"])
        if (prod["prodId"] > this.maxId)
          this.maxId = prod["prodId"];
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

  addProduct() {
    let productObj = new Product(
      this.maxId + 1,
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
    console.log(productObj);
    this.productService.addProduct(productObj).subscribe(res => {
      if (res["added"]) {
        if (res["added"] === "success")
          alert("Product added successfully");
        else
          alert("Failed to add new product");
        this.router.navigate(["/inventory-admin", "products"]);
      }
      else
        alert("Failed to add new product");
    }, err => {
      alert("Error:" + err);
    });
  }

}
