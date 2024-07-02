export interface ProductsModel {
  status: string,
  result: number,
  data: productModel[];
}
export interface productModel {
  title: titleObj,
  _id: string,
  price: number,
  totalAmount: number,
  amount: number,
  createdAt: string,
  soldDate: string
}
interface titleObj {
  en: string,
  ka: string
}
