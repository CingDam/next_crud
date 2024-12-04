export class Pager {
  private totalVal: number;
  private pageVal: number = 1;
  private perPage: number = 10;
  private perGroup: number = 5;

  get total(): number {
    return this.totalVal;
  }

  set total(value: number) {
    this.totalVal = value;
  }

  get page(): number {
    return this.pageVal;
  }

  set page(value: number) {
    this.pageVal = value;
  }
}
