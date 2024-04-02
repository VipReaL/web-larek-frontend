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

    this.headerBasketButton = document.querySelector('.header__basket');
    this.headerBasketCounter = document.querySelector('.header__basket-counter');

    // if (actions?.onClick) this.headerBasketButton.addEventListener('click', actions.onClick);
    // actions - для передачи данных

    this.headerBasketButton.addEventListener('click', () => {
      this.events.emit('basket:open');
    });

    this.items = [];
  }

  //Вставляем данные в корзину
  set items(items: HTMLElement[]) {
    if (items.length) {
      this.basketList.replaceChildren(...items);
      this.button.removeAttribute('disabled');
    } else {
      this.button.setAttribute('disabled', 'disabled'); // блокируем кнопку если товар отсутсвует
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

/*
  <template id="basket">
    <div class="basket">
      <h2 class="modal__title">Корзина</h2>
      <ul class="basket__list"></ul>
      <div class="modal__actions">
        <button class="button basket__button">Оформить</button>
        <span class="basket__price">0 синапсов</span>
      </div>
    </div>
  </template>



  <button class="header__basket">
    <span class="header__basket-counter">0</span>
  </button>
*/