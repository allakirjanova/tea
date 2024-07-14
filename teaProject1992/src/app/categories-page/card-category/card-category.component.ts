import {Component, Input, OnInit} from '@angular/core';
import {categoryData} from "../categories-form-page/categories-form-page.component";

@Component({
  selector: 'card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {
  @Input() public category: categoryData | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
