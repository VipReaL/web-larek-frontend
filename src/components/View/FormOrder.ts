import { IEvents } from "../base/events";

export interface IOrder {
  formOrder: HTMLFormElement;
  buttonAll: HTMLButtonElement[];
  paymentSelection: String;
  render(): HTMLElement;
}

export class Order implements IOrder {
  formOrder: HTMLFormElement;
  buttonAll: HTMLButtonElement[];
  address: HTMLElement;
  buttonSubmit: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.formOrder = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.buttonAll = Array.from(this.formOrder.querySelectorAll('.button_alt')); // находим две кнопки выбора способа оплаты

    this.buttonAll.forEach(item => {
      item.addEventListener('click', () => {
        this.paymentSelection = item.name;
        events.emit('order:paymentSelection', item);
      });
    });

    this.address = this.formOrder.querySelector('.form__input');
    this.buttonSubmit = this.formOrder.querySelector('.order__button');
    
    this.formOrder.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('contacts:open');
    });

    this.formOrder.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
      const field = target.name;
			const value = target.value;
      this.events.emit(`order:changeAddress`, { field, value });

      if (value) {
        this.buttonSubmit.disabled = false;
      } else {
        this.buttonSubmit.disabled = true;
      }
		});
  }

  // устанавливаем обводку вокруг выбранного метода оплаты
  set paymentSelection(paymentMethod: string) {
    this.buttonAll.forEach(item => {
      item.classList.toggle('button_alt-active', item.name === paymentMethod);
    })
  }

  render() {
    return this.formOrder
  }
}

/*
<template id="order">
  <form class="form" name="order">
    <div class="order">
      <div class="order__field">
        <h2 class="modal__title">Способ оплаты</h2>
        <div class="order__buttons">
          <button name="card" type="button" class="button button_alt">Онлайн</button>
          <button name="cash" type="button" class="button button_alt">При получении</button>
        </div>
      </div>
      <label class="order__field">
        <span class="form__label modal__title">Адрес доставки</span>
        <input name="address" class="form__input" type="text" placeholder="Введите адрес" />
      </label>
    </div>
    <div class="modal__actions">
      <button type="submit" disabled class="button order__button">Далее</button>
      <span class="form__errors"></span>
    </div>
  </form>
</template>
*/

/*
конструктор буде принемать форму - которую мы находим в разметке
конструктор будет принемать название функции,
  функция будет срабатывать при ("submit") в конструкторе
функция в конструкторе будеть получать все данные
  которые есть у объекта

  ----------
метод рендер возвращающий форму

метод добавить что то в поле ввода

метод достать из поля ввода

метод очистки формы
*/