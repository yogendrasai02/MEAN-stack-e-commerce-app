import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/modelClasses/category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categoriesData => {
      this.categories = categoriesData["categoriesData"];
      // console.log(this.categories);
    }, err => {
      alert("Error fetching categories data");
    });
  }

  loadForm(where: string, id?:number) {
    if (where === "add") {
      this.router.navigate(['/inventory-admin', 'add-category']);
    }
    else if (where === "upd") {
      this.router.navigate(['/inventory-admin', 'upd-category', id]);
    }
  }

  deleteCategory(categoryId: number) {
    if (confirm("Do you want to delete the category data?")) {
      (document.getElementById(categoryId.toString()) as HTMLDivElement).style.display = "none";
      this.categoryService.deleteCategory(categoryId).subscribe(res => {
        alert("Category deleted successfully");
      }, err => {
        alert(err);
      });
    }
  }

  loadProducts(categoryId: number) {
    this.router.navigate(["/inventory-admin","products","show-products"], { queryParams: { categoryId: categoryId } });
  }

}
