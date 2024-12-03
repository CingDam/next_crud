export class Pager {
  private totalVal: number;

  get total(): number {
    return this.totalVal;
  }

  set total(value: number) {
    this.totalVal = value;
  }
}
