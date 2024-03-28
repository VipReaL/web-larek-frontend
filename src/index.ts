import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Card } from './components/View/Card';
import { ApiModel } from './components/Model/ApiModel';
import { CDN_URL, API_URL, settings } from './utils/constants';
import { DataModel } from './components/Model/DataModel';

import { IProductItem } from './types';

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);


/********** gallery.append ***********/
const gallery = document.querySelector('.gallery');


/************** Card ****************/
const cardCatalog = document.querySelector('#card-catalog') as HTMLTemplateElement;

events.on('productCards:receive', () => {
  dataModel.productCards.forEach(item => {
    const card = new Card(cardCatalog, events, {
      // events.emit('card:select', {id: item.id})
      onClick: () => events.emit('card:select', item)
    });
    const itemElement = card.render(item);
    gallery.append(itemElement);
  });
});


/************** Modal ****************/
// Получить объект данных "IProductItem" карточки по которой кликнули 
events.on('card:select', (item: IProductItem) => {
  dataModel.setPreview(item); 
});

// Открываем модальное окно
events.on('openModalCard', (item: IProductItem) => {
  console.log(item)
  /*
      const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('card:add', item)
        });
    modal.render({
        content: card.render({
            title: item.title,
            image: item.image,
            description: item.description,
            price: item.price,
            category: item.category
        })
    });
  */
})


/************* Api ******************/ // в БИЛД сборке не работает
apiModel.getListProductCard()
  .then(function (data: IProductItem[]) {
    dataModel.productCards = data;
  })
  .catch((error) => {
    console.log(error);
  })