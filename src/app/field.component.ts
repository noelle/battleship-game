import {Component, OnInit} from '@angular/core';

export const SHIP: Ship = {
  startSquare: { x: 2, y: 5 },
  endSquare: { x: 6, y: 5 }
};

export class Square {
  x: number;
  y: number;
  hit?: boolean;
  miss?: boolean;
}

export class Ship {
  startSquare: Square;
  endSquare: Square;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  squares = this.generateFieldSquares();
  ship = SHIP;
  score = 0;
  won = false;

  generateFieldSquares(): Square[] {
    const squares: Square[] = [];
    for (let _i = 0; _i < 10; _i++) {
      for (let _j = 0; _j < 10; _j++) {
        squares.push({ x: _i + 1, y: _j + 1 });
      }
    }
    return squares;
  }

  getAllSquaresFrom(ship: Ship): Square[] {
    let start = ship.startSquare.x;
    let end = ship.endSquare.x;
    let vertical = false;

    if (ship.startSquare.x === ship.endSquare.x) {
      vertical = true;
      start = ship.startSquare.y;
      end = ship.endSquare.y;
    }

    const squares: Square[] = [];
    for (let _i = start; _i <= end; _i++) {
      squares.push({ x: (vertical ? ship.startSquare.x : _i), y: (vertical ? _i : ship.startSquare.y) });
    }

    return squares;
  }

  shipHit(square: Square): boolean {
    const squares = this.getAllSquaresFrom(this.ship);
    let found = false;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].x === square.x && squares[i].y === square.y) {
        found = true;
        break;
      }
    }

    return found;
  }

  checkIfWon(): void {
    const squares = this.getAllSquaresFrom(this.ship);
    let numberOfHits = 0;

    for (let _i = 0; _i < squares.length; _i++) {
      if (squares[_i].hit) {
        numberOfHits++;
      }
    }

    if (squares.length === numberOfHits) {
      this.won = true;
    }
  }

  onClick(square: Square): void {
    console.log('geklickt', square.x, square.y);
    console.log(this.getAllSquaresFrom(this.ship));

    if (this.shipHit(square)) {
      square.hit = true;
    } else {
      square.miss = true;
    }

    this.checkIfWon();
    if (this.won) {
      alert('You won!');
    } else {
      this.score++;
    }
  }

  ngOnInit(): void {
    this.generateFieldSquares();
  }
}
