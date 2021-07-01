import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/modelClasses/category.model';
import { Product } from 'src/app/modelClasses/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  categoryId: number = 0;
  categoryName!: string;
  products: Product[] = [];
  selectedIndex: number = 0;
  newStock: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService,
  private router: Router) { }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.queryParams["categoryId"];
    this.categoryService.getCategoryData(this.categoryId).subscribe(res => {
      this.categoryName = res["categoryData"]["categoryName"];
    }, err => {
      alert("Error:" + err);
    });
    this.productService.getProducts(this.categoryId).subscribe(res => {
      this.products = res["products"];
    }, err => {
      alert("Error:" + err);
    });
  }

  selectIndex(i: number) {
    // <p id="modalBrand"></p>
    //             <p id="modalProdCategory"></p>
    //             <p id="modalProdSubCategory"></p>
    //             <p id="modalPrice"></p>
    //             <p id="modalDiscount"></p>
    //             <p id="modalMaxOrderQty"></p>
    //             <p id="modalProdDescription"></p>
    this.selectedIndex = i;
    (document.getElementById("modalProdName") as HTMLHeadingElement).innerHTML = `<strong>Product name :</strong> ${this.products[this.selectedIndex].prodName}`;
    (document.getElementById("modalBrand") as HTMLParagraphElement).innerHTML = `<strong>Brand :</strong> ${this.products[this.selectedIndex].brand}`;
    (document.getElementById("modalProdCategory") as HTMLParagraphElement).innerHTML = `<strong>Category :</strong> ${this.products[this.selectedIndex].prodCategory}`;
    (document.getElementById("modalProdSubCategory") as HTMLParagraphElement).innerHTML = `<strong>Sub category :</strong> ${this.products[this.selectedIndex].prodSubCategory}`;
    (document.getElementById("modalPrice") as HTMLParagraphElement).innerHTML = `<strong>Price :</strong> ${this.products[this.selectedIndex].price}`;
    (document.getElementById("modalDiscount") as HTMLParagraphElement).innerHTML = `<strong>Discount :</strong> ${this.products[this.selectedIndex].discount}`;
    (document.getElementById("modalMaxOrderQty") as HTMLParagraphElement).innerHTML = `<strong>Max Order Qty :</strong> ${this.products[this.selectedIndex].maxOrderQty}`;
    (document.getElementById("modalProdDescription") as HTMLParagraphElement).innerHTML = `<strong>Description :</strong> ${this.products[this.selectedIndex].description}`;
  }

  gotoAddProd() {
    this.router.navigate(["/inventory-admin", "add-product"]);
  }

  editProduct(prodId: number) {
    this.router.navigate(["/inventory-admin", "upd-product", prodId.toString()]);
  }

  changed(event: any) {
    this.newStock = +(<HTMLInputElement>event.target).value;
  }

  updateStock(prodId: number) {
    let obj = {
      prodId: prodId,
      stock: this.newStock
    };
    this.productService.updateStock(obj).subscribe(res => {
      if (res["updated"]) {
        if (res["updated"] === "success") {
          alert("Stock updated!");
          location.reload();
        }
      }
     }, err => {
      alert("Error");
    });
  }

  updateForSale(prodId: number, to: any) {
    console.log(to, typeof to);
    let obj = {
      prodId: prodId,
      forSale: false
    };
    if (to == 1)
      obj.forSale = true;
    this.productService.updateForSale(obj).subscribe(res => {
      alert("Product status updated");
      location.reload();
    });
  }

  deleteProduct(prodId: number) {
    if (confirm("Do you want to delete the product?")) {
      this.productService.deleteProduct(prodId).subscribe(res => {
        if (res["deleted"]) {
          if (res["deleted"] === "success") {
            alert("Product deleted successfully");
            document.getElementById(prodId.toString())?.remove();
          }
        }
      }, err => {
        alert("Error:" + err);
      });
    }
  }

}
