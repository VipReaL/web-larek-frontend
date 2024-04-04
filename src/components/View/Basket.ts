import { IActions, IProductItem } from "../../types";
import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  basketList: HTMLElement;
  button: HTMLButtonElement;
  basketPrice: HTMLElement;
}

export class Basket implements IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  basketList: HTMLElement;
  button: HTMLButtonElement;
  basketPrice: HTMLElement;

  headerBasketButton: HTMLButtonElement;
  headerBasketCounter: HTMLElement;


  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.basket = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
    this.title = this.basket.querySelector('.modal__title');
    this.basketList = this.basket.querySelector('.basket__list');
    this.button = this.basket.querySelector('.basket__button');
    this.basketPrice = this.basket.querySelector('.basket__price');
    this.button.addEventListener('click', () => { this.events.emit('order:open') });

    this.headerBasketButton = document.querySelector('.header__basket');
    this.headerBasketCounter = document.querySelector('.header__basket-counter');
    this.headerBasketButton.addEventListener('click', () => { this.events.emit('basket:open') });
    this.items = []; //????????????
  }

  //Вставляем данные в корзину
  set items(items: HTMLElement[]) {
    if (items.length) {
      this.basketList.replaceChildren(...items);
      this.button.removeAttribute('disabled');
    } else {
      this.button.setAttribute('disabled', 'disabled'); // блокируем кнопку если товар отсутствует
      this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста', }));
    }
  }

  renderHeaderBasketCounter(value: number) {
    this.headerBasketCounter.textContent = String(value);
  }
  
  renderSumAllProducts(sumAll: number) {
    this.basketPrice.textContent = String(sumAll + ' синапсов');
  }

  render(): HTMLElement {
    this.title.textContent = 'Корзина';
    // this.basketList.append(item);
    // this.button.textContent = 'Оформить';
    // this.basketPrice.textContent = this.basketPrice + ' синапсов'
    

    return this.basket;
  }
}