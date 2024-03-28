import { IProductItem } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface IDataModel {
  productCards: IProductItem[];
  preview: string | null;
}

export class DataModel implements IDataModel {
  protected _productCards: IProductItem[];
  preview: string | null;

  constructor(protected events: IEvents) {
    this._productCards = []
  }

  /* сохранить массив объектов(карточек) в переменную */
  set productCards(data: IProductItem[]) {
    this._productCards = data;
    this.events.emit('productCards:receive');
  }

  get productCards() {
    return this._productCards; // undefined - при вызове свойства
  }

  //Вывести превью карточки
  setPreview(item: IProductItem) {
    this.preview = item.id;
    this.events.emit('openModalCard', item)
  }
}

/*создать сюда метод который будет отдавать нужный массив*/

/*
В сеттере прописать емит (emit) события, что массив записался,
а в обработчике этого события выводить карточки на страницу
*/