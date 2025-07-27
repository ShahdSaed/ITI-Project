import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-rating',
  templateUrl: './circular-rating.html',
  styleUrl: './circular-rating.css'
})
export class CircularRatingComponent {
  @Input() percentage: number = 87;
  @Input() size: number = 60;
  @Input() strokeWidth: number = 4;
  @Input() color: string = '#00ff00';

  get radius(): number {
    return (this.size - this.strokeWidth) / 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get strokeDasharray(): number {
    return this.circumference;
  }

  get strokeDashoffset(): number {
    const progress = this.percentage / 100;
    return this.circumference * (1 - progress);
  }

  get center(): number {
    return this.size / 2;
  }
}
