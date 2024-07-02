export interface SoldProductModel {
  _id: number;
  createdAt: string,
  amount: number,
  product: {
    price: number,
    title: {
      en: string
    }
  }
}
