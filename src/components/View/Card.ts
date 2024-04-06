import { IActions, IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICard {
  render(data: IProductItem): HTMLElement;
}

export class Card implements ICard {
  protected _cardElement: HTMLElement;
  protected _cardCategory: HTMLElement;
  protected _cardTitle: HTMLElement;
  protected _cardImage: HTMLImageElement;
  protected _cardPrice: HTMLElement;
  protected _colors = <Record<string, string>>{
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  }
  
  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this._cardCategory = this._cardElement.querySelector('.card__category');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardPrice = this._cardElement.querySelector('.card__price');
    
    if (actions?.onClick) {
      this._cardElement.addEventListener('click', actions.onClick);
    }
  }

  protected setText(element: HTMLElement, value: unknown): string {
    if (element) {
      return element.textContent = String(value);
    }
  }

  set cardCategory(value: string) {
    this.setText(this._cardCategory, value);
    this._cardCategory.className = `card__category card__category_${this._colors[value]}`
  }

  protected setPrice(value: number | null): string {
    if (value === null) {
      return 'Бесценно'
    }
    return String(value) + ' синапсов'
  }

  render(data: IProductItem): HTMLElement {
    this._cardCategory.textContent = data.category;
    this.cardCategory = data.category;
    this._cardTitle.textContent = data.title;
    this._cardImage.src = data.image;
    this._cardImage.alt = this._cardTitle.textContent;
    this._cardPrice.textContent = this.setPrice(data.price);
    return this._cardElement;
  }
}