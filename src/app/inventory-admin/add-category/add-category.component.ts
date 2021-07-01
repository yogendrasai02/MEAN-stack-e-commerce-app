import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/modelClasses/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categories: Category[] = [];
  newCategoryObj: Category = new Category(0, "", [], "");
  maxId: number = 0;

  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categoriesData => {
      this.categories = categoriesData["categoriesData"];
      for (let category of this.categories)
        if (category["categoryId"] > this.maxId)
          this.maxId = category["categoryId"];
    }, err => {
      alert("Error while fetching categories data");
    });
  }

  addCategory() {
    this.newCategoryObj.categoryId = this.maxId + 1;
    this.newCategoryObj.categoryName = this.formRef.value.categoryName;
    this.newCategoryObj.subCategories = this.formRef.value.subCategories.split(",");
    let sz = this.newCategoryObj.subCategories.length;
    for (let i = 0; i < sz; i++){
      this.newCategoryObj.subCategories[i] = this.newCategoryObj.subCategories[i].trim();
      this.newCategoryObj.subCategories[i] = this.newCategoryObj.subCategories[i][0].toUpperCase() + this.newCategoryObj.subCategories[i].slice(1);
    }
    this.newCategoryObj.icon = this.formRef.value.icon;
    this.categoryService.addCategory(this.newCategoryObj).subscribe(result => {
      if (result) {
        alert("New category added successfully");
        this.router.navigate(["/inventory-admin", "products"]);
      }
    }, err => {
      alert(err)
    });
  }
}
