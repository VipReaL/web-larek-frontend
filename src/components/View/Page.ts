import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

export class Page {
  protected _basket: HTMLElement;
  protected _counterBasket: HTMLElement;
  // protected _cardList: HTMLElement;
  // protected _wrapper: HTMLElement;

  // constructor(container: HTMLElement, protected events: IEvents) {
  constructor(protected events: IEvents) {
    // super(container);
    this._basket = ensureElement<HTMLElement>('.header__basket');
    this._counterBasket = ensureElement<HTMLElement>('.header__basket-counter');
    
    this._basket.addEventListener('click', () => {
        this.events.emit('basket:open');
    });


    // this._cardList = ensureElement<HTMLElement>('.gallery');
    // this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
  }

  // set counter(value: number) {
  //   this.setText(this._counterBasket, String(value));
  // }

  // set catalog(items: HTMLElement[]) {
  //   this._cardList.replaceChildren(...items);
  // }

  //матод блокировки прокрутки страницы при открытом модальном окне
  // set locked(value: boolean) {
  //   if (value) {
  //       this._wrapper.classList.add('page__wrapper_locked');
  //   } else {
  //       this._wrapper.classList.remove('page__wrapper_locked');
  //   }
  // }
}

/*
пятая часть 6 мин

отвечает за вывод всего содержимого на строницу

хранит в себе ГАЛЕРЕЮ куда нужно выводить

в конструкторе принимает КОНТЭЙНЕР - галерею

есть методы set для передачи внутрь ШТМЛЭлементов

передаём массив всех карточек ШТМЛЭлементов и храним в свойстве
*/