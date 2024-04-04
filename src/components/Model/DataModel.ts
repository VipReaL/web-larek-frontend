import { IProductItem } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface IDataModel {
  productCards: IProductItem[];
}

export class DataModel implements IDataModel {
  protected _productCards: IProductItem[];
  selectedСard: IProductItem; 

  constructor(protected events: IEvents) {
    this._productCards = []
  }

  set productCards(data: IProductItem[]) {
    this._productCards = data;
    this.events.emit('productCards:receive');
  }

  get productCards() {
    return this._productCards;
  }

  // setProductCards(data: IProductItem[]) {
  //   this._productCards = data;
  //   this.events.emit('productCards:receive');
  // }

  //Вывести превью карточки
  setPreview(item: IProductItem) {
    this.selectedСard = item;
    this.events.emit('modalCard:open', item)
  }
}

/*создать сюда метод который будет отдавать нужный массив*/

/*
В сеттере прописать emit события, что массив записался,
а в обработчике этого события выводить карточки на страницу
*/