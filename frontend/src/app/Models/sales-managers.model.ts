export interface SalesManagersBaseModel {
  status: string,
  data: SalesManagersModel[]
}

export interface SalesManagersModel {
  firstName: string,
  lastName: string,
  ownProduct: ownProductModel[],
  register: string,
  role: string,
  soldProducts: soldProductsModel[],
  totalSellingMoney: number,
  username: string,
  _id: string,
}

export interface soldProductsModel {
  createdAt: string,
  product: {
    amount: number,
    price: number,
    title: {
      en: string,
      ka: string
    }
    _id: string,
  }
}

export interface ownProductModel {
  title: {
    en: string,
    ka: string
  }
  user: string,
  _id: string
}
