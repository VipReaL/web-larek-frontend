import { IEvents } from "../base/events";

export interface IContacts {

}

export class Contacts implements IContacts {
  formContacts: HTMLFormElement;
  // inputEmail: HTMLInputElement;
  // inputPhone: HTMLInputElement;
  inputAll: HTMLInputElement[];
  buttonSubmit: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.formContacts = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;

    this.inputAll = Array.from(this.formContacts.querySelectorAll('.form__input')) // находим два input
    this.buttonSubmit = this.formContacts.querySelector('.button');
    this.inputAll.forEach(item => {
      item.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const field = target.name;
			  const value = target.value;
        this.events.emit(`contacts:changeInput`, { field, value });

        if (value) {
          this.buttonSubmit.disabled = false;
        } else {
          this.buttonSubmit.disabled = true;
        }
      })
    })

    this.formContacts.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('success:open');
    });
  }

  // set inputEmail(value: string) {
  //   (this.formContacts.elements.namedItem('email') as HTMLInputElement).value = value;
  // }

  render() {
    return this.formContacts
  }
}

/*
<template id="contacts">
  <form class="form" name="contacts">
    <div class="order">
      <label class="order__field">
        <span class="form__label modal__title">Email</span>
        <input name="email" class="form__input" type="text" placeholder="Введите Email" />
      </label>
      <label class="order__field">
        <span class="form__label modal__title">Телефон</span>
        <input name="phone" class="form__input" type="text" placeholder="+7 (" />
      </label>
    </div>
    <div class="modal__actions">
      <button type="submit" disabled class="button">Оплатить</button>
      <span class="form__errors"></span>
    </div>
  </form>
</template>
*/