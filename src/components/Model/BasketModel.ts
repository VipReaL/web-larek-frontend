import { IProductItem } from "../../types";

export interface IBasketModel {
  basketProducts: IProductItem[];
}

export class BasketModel implements IBasketModel {
  protected _basketProducts: IProductItem[]; // список карточек товара в корзине

  constructor() {
    this._basketProducts = [];
  }

  set basketProducts(data: IProductItem[]) {
    this._basketProducts = data;
  }

  get basketProducts() {
    return this._basketProducts;
  }

  // количество товара в корзине
  getCounter() {
    return this.basketProducts.length;
  }
  // сумма всех продуктов в корзине
  getSumAllProducts() {
    let sumAll = 0;
    this.basketProducts.forEach(item => {
      sumAll = sumAll + item.price;
    });
    return sumAll;
  }

  // //вернуть информацию по составу в корзине
  // get statusBasket(): boolean {
  // 	return this.basket.length === 0
  // }

  // добавить карточку товара в корзину
  setSelectedСard(data: IProductItem) {
    // !!!!!! Добавить проверку на нахождения одинакового товара в корзине
    this._basketProducts.push(data);
  }

  // удалить карточку товара из корзины
  deleteCardToBasket(item: IProductItem) {
    const index = this._basketProducts.indexOf(item);
    if (index >= 0) {
      this._basketProducts.splice(index, 1);
    }
  }
}