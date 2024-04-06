import { IEvents } from "../base/events";

export interface IModal {
  open(): void;
  close(): void;
  render(): HTMLElement
}

export class Modal implements IModal {
  protected modalContainer: HTMLElement;
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement;
  protected _pageWrapper: HTMLElement;
  
  constructor(modalContainer: HTMLElement, protected events: IEvents) {
    this.modalContainer = modalContainer;
    this.closeButton = modalContainer.querySelector('.modal__close');
    this._content = modalContainer.querySelector('.modal__content');
    this._pageWrapper = document.querySelector('.page__wrapper');

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.modalContainer.addEventListener('click', this.close.bind(this));
    this.modalContainer.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
  }

  // принимает элемент разметки которая будет отображаться в "modal__content" модального окна
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  // открытие модального окна
  open() {
    this.modalContainer.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  // закрытие модального окна
  close() {
    this.modalContainer.classList.remove('modal_active');
    this.content = null; // очистка контента в модальном окне
    this.events.emit('modal:close');
  }

  set locked(value: boolean) {
    if (value) {
      this._pageWrapper.classList.add('page__wrapper_locked');
    } else {
      this._pageWrapper.classList.remove('page__wrapper_locked');
    }
  }

  render(): HTMLElement {
    this._content;
    this.open();
    return this.modalContainer
  }
}