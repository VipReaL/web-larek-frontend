import './scss/styles.scss';

import { CDN_URL, API_URL, settings } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/Model/ApiModel';

import { DataModel } from './components/Model/DataModel';
import { Card } from './components/View/Card';
import { CardPreview } from './components/View/CardPreview';

import { IProductItem } from './types';
import { Modal } from './components/View/Modal';
import { ensureElement } from './utils/utils';

import { BasketModel } from './components/Model/BasketModel';
import { Basket } from './components/View/Basket';
import { BasketItem } from './components/View/BasketItem';

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();

/********** gallery.append ***********/
// const gallery = document.querySelector('.gallery');

// Отображения карточек товара на странице
events.on('productCards:receive', () => {
  dataModel.productCards.forEach(item => {
    const card = new Card(cardCatalogTemplate, events, {
      onClick: () => events.emit('card:select', item)
    });
    // gallery.append(card.render(item));
    ensureElement<HTMLElement>('.gallery').append(card.render(item));
  });
});

// Получить объект данных "IProductItem" карточки по которой кликнули 
events.on('card:select', (item: IProductItem) => {
  dataModel.setPreview(item);
});

// Открываем модальное окно cardPreview
events.on('ModalCard:open', (item: IProductItem) => {
  const cardPreview = new CardPreview(cardPreviewTemplate, events)
  modal.content = cardPreview.render(item);
  modal.render();
})

//Добавление товара в заказ и корзину, обновление счетчика корзины на главной страницы
events.on('card:addBasket', () => {
  basketModel.setSelectedСard(dataModel.selectedСard); // добавить карточку товара в корзину
  basket.renderHeaderBasketCounter(basketModel.getCounter()); // отобразить количество товара в корзине
  modal.close();
});

//Открытие корзины, отображение товаров и суммы заказа
events.on('basket:open', () => {
  basket.renderSumAllProducts(basketModel.getSumAllProducts());  // отобразить сумма всех продуктов в корзине
  // ... кнопка блокируеться и разблокируеться по статусу
  let i = 0;
  basket.items = basketModel.basketProducts.map((item) => {
    const basketItem = new BasketItem(cardBasketTemplate, events, {
      onClick: () => events.emit('basket:basketItemRemove', item)
      });
    i = i + 1;
    return basketItem.render(item, i);
  })
  modal.content = basket.render();
  modal.render();
});

//Удаление товара из корзины
events.on('basket:basketItemRemove', (item: IProductItem) => {
  basketModel.deleteCardToBasket(item);
  basket.renderHeaderBasketCounter(basketModel.getCounter()); // отобразить количество товара в корзине
  basket.renderSumAllProducts(basketModel.getSumAllProducts()); // отобразить сумма всех продуктов в корзине
  let i = 0;
  basket.items = basketModel.basketProducts.map((item) => {
    const basketItem = new BasketItem(cardBasketTemplate, events, {
      onClick: () => events.emit('basket:basketItemRemove', item)
      });
    i = i + 1;
    return basketItem.render(item, i);
  })
});

/************* Api ******************/ // !! в БИЛД сборке не работает !!!!!!!!!!!!
apiModel.getListProductCard()
  .then(function (data: IProductItem[]) {
    dataModel.productCards = data;
  })
  .catch((error) => {
    console.log(error);
  })