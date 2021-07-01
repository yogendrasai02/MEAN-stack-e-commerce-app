import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/modelClasses/category.model';

@Component({
  selector: 'app-upd-category',
  templateUrl: './upd-category.component.html',
  styleUrls: ['./upd-category.component.css']
})
export class UpdCategoryComponent implements OnInit {

  categoryData!: Category;
  subCatsStr: string = "";

  categoryId: number = 0;

  @ViewChild("formRef") formRef!: NgForm;

  constructor(private route:ActivatedRoute, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    // Fetch the route parameter
    this.categoryId = +this.route.snapshot.params["categoryId"];
    
    this.route.params.subscribe(params => {
      this.categoryId = +params["categoryId"];
    }, err => {
      alert("Error");
    });

    // get the category data
    this.categoryService.getCategoryData(this.categoryId).subscribe(res => {
      this.categoryData = res["categoryData"];
      this.subCatsStr = this.categoryData["subCategories"].join(", ");
    }, err => {
      alert(err);
    });

  }

  updateCategory() {
    let subCats = this.formRef.value.subCategories.split(",");
    let sz = subCats.length;
    for (let i = 0; i < sz; i++) {
      subCats[i] = subCats[i].trim();
      subCats[i] = subCats[i][0].toUpperCase() + subCats[i].slice(1);
    }
    let newCategoryObj = new Category(this.categoryId,
      this.formRef.value.categoryName,
      subCats,
      this.formRef.value.icon
    );
    this.categoryService.updateCategory(this.categoryId, newCategoryObj).subscribe(res => {
      if (res["updated"] === "success") {
        alert("Category data updated successfully");
        this.router.navigate(["/inventory-admin", "products"]);
      }
    }, err => {
      alert("Error:" + err);
    });
  }

}
