import { IProductItem } from "../types";

export class Card {
  cardElement: HTMLElement;
  cardCategory: HTMLElement;
  cardTitle: HTMLElement;
  cardImage: HTMLImageElement;
  cardPrice: HTMLElement;

  constructor(template: HTMLTemplateElement) {
    this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this.cardCategory = this.cardElement.querySelector('.card__category');
    this.cardTitle = this.cardElement.querySelector('.card__title');
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardPrice = this.cardElement.querySelector('.card__price');
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

/* разукрасить овалы в разные цвета */

/* изображения не такие как в макете */