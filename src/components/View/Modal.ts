export interface IModal {
  content: HTMLElement;
  open(): void;
  close(): void;
}

export class Modal implements IModal {
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(protected modalContainer: HTMLElement) {
    this.closeButton = modalContainer.querySelector('.modal__close');
    this._content = modalContainer.querySelector('.modal__content');

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.modalContainer.addEventListener('click', this.close.bind(this));
    this.modalContainer.querySelector('.modal__container')
      .addEventListener('click', (event) => event.stopPropagation());
  }

  // принимает элемент разметки которая будет отображаться в "modal__content" модального окна
  set content(value: HTMLElement) {
    this._content.replaceChildren(value); // ???
  }

  // открытие модального окна
  open() {
    this.modalContainer.classList.add('modal_active');
  }

  // закрытие модального окна
  close() {
    this.modalContainer.classList.remove('modal_active');
    this.content = null; // очистка контента в модальном окне
  }
}

/*
export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);

    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
*/