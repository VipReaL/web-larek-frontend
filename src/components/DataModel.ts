import { IProductItem } from "../types";
import { IEvents } from "./base/events";

export interface IDataModel {
  productCards: IProductItem[];
}

export class DataModel implements IDataModel {
  protected _productCards: IProductItem[]; // undefined

  constructor(protected events: IEvents) {
    this._productCards = []
  }

  /* сохранить массив объектов(карточек) в переменную */
  set productCards(data: IProductItem[]) {
    this._productCards = data; // - почему не сохраняется массив в переменой
    // console.log(data); // массив объектов товаров выводиться в консоль
    this.events.emit('productCards:receive', data);
  }

  get productCards() {
    return this._productCards; // undefined - при вызове свойства
  }

  // 2 способ
  // setProductCards(data: IProductItem[]) {
  //   this._productCards = data; // - почему не сохраняется массив в переменой
  // }
}

/*создать сюда метод который будет отдавать нужный массив*/

/*
В сеттере прописать емит (emit) события, что массив записался,
а в обработчике этого события выводить карточки на страницу
*/