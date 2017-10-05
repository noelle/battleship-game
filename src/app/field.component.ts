import {Component, OnInit} from '@angular/core';

export class Square {
  x: number;
  y: number;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  squares = this.generateFieldSquares();

  generateFieldSquares(): Square[] {
    const squares: Square[] = [];
    for (let _i = 0; _i < 10; _i++) {
      for (let _j = 0; _j < 10; _j++) {
        squares.push({ x: _i + 1, y: _j + 1 });
      }
    }
    return squares;
  }
  ngOnInit(): void {
    this.generateFieldSquares();
  }
}
