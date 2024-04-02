import { IActions, IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface IBasketItem {
  basketItem: HTMLElement;
	index:HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;
}

export class BasketItem implements IBasketItem {
  basketItem: HTMLElement;
	index:HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;

  constructor (template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
		this.index = this.basketItem.querySelector('.basket__item-index');
		this.title = this.basketItem.querySelector('.card__title');
		this.price = this.basketItem.querySelector('.card__price');
		this.buttonDelete = this.basketItem.querySelector('.basket__item-delete');

		if (actions?.onClick) this.buttonDelete.addEventListener('click', actions.onClick);
  }

	protected setPrice(value: number | null): string {
    if (value === null) {
      return 'Бесценно'
    }
    return String(value) + ' синапсов'
  }

	render(data: IProductItem, i: number) {
		this.index.textContent = String(i);
		this.title.textContent = data.title;
		this.price.textContent = this.setPrice(data.price);
		
		return this.basketItem;
	}
}

/*
<template id="card-basket">
		<li class="basket__item card card_compact">
			<span class="basket__item-index">1</span>
			<span class="card__title">Фреймворк куки судьбы</span>
			<span class="card__price">2500 синапсов</span>
			<button class="basket__item-delete card__button" aria-label="удалить"></button>
		</li>
	</template>
*/