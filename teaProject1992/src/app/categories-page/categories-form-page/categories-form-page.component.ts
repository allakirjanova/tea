import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {CategoriesPageComponent} from "../categories-page.component";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {CategoryService} from "../../shared/services/category.service";


export interface categoryData {
  img: any,
  title: string,
  nike: string
}


@Component({
  selector: 'app-categories-form-page',
  templateUrl: './categories-form-page.component.html',
  styleUrls: ['./categories-form-page.component.scss']
})
export class CategoriesFormPageComponent implements OnInit {
  public isNew = true;
  public cat: any = {};
  public formCategory: FormGroup;
  public imagePreview: string | ArrayBuffer | null = '';
  public data: any = '';

  private subscription: any ;
  //#######################

  private img: any;

  //#######################

  constructor(private route: ActivatedRoute, private category: CategoryService) {
   this.formCategory = new FormGroup({
      name: new FormControl(null, Validators.required),
      img: new FormControl(null)
    })


  }

  public ngOnInit(): void {
    let rout =this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isNew = false;
      }
    })
    this.subscription.add(rout)
  }


  public submitCategory(data: any, action: boolean): void {
    const title = this.formCategory.controls.name.value;
    // todo сделать разделитель между слов _
    const nike = title;


    this.uploadCategory({
      prev: {img: data.img, title: data.title, nike: data.nike},
      next: {img: this.img, title, nike}
    }, action)
  }

  //############################################

  public onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.img = event.target.files[0];
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.img);
  }

  private uploadCategory(data: { prev: categoryData, next: categoryData }, action: boolean): void {
    this.category.uploadCategory(data, action)
  }

  //ngOndestroy(): void{
  // subscription.unsubscribe();
//}
}
