import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICard {
  render(data: IProductItem): HTMLElement;
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}

export class Card implements ICard {
  cardElement: HTMLElement;
  cardCategory: HTMLElement;
  cardTitle: HTMLElement;
  cardImage: HTMLImageElement;
  cardPrice: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this.cardCategory = this.cardElement.querySelector('.card__category');
    this.cardTitle = this.cardElement.querySelector('.card__title');
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardPrice = this.cardElement.querySelector('.card__price');

    if (actions?.onClick) this.cardElement.addEventListener('click', actions.onClick);
  }

  render(data: IProductItem): HTMLElement {
    this.cardCategory.textContent = data.category;
    this.cardTitle.textContent = data.title;
    this.cardImage.src = data.image;
    const dataPrice = data.price;
    function getDataPrice(dataPrice: number | null): string {
      if (dataPrice === null) {
        return 'Бесценно'
      }
      return String(dataPrice) + ' синапсов'
    }
    this.cardPrice.textContent = getDataPrice(dataPrice);
    return this.cardElement;
  }
}
/* убрать работу с данными */

/* разукрасить овалы в разные цвета 

*/

/* изображения не такие как в макете */