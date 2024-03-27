import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Card } from './components/Card';
import { ApiModel } from './components/ApiModel';
import { CDN_URL, API_URL, settings } from './utils/constants';
import { DataModel } from './components/DataModel';

import { postmanTest } from "./utils/postmanTest"
import { IProductItem } from './types';

const events = new EventEmitter();


/************ DataModel *************/

const dataModel = new DataModel(events);


/************ postmanTest ************/
// dataModel.productCards = postmanTest


/********** gallery.append ***********/
const gallery = document.querySelector('.gallery');


/************** Card ****************/
const cardCatalog = document.querySelector('#card-catalog') as HTMLTemplateElement;

events.on('productCards:receive', () => {
  dataModel.productCards.forEach(item => {
    const card = new Card(cardCatalog);
    const itemElement = card.render(item);
    gallery.append(itemElement);
  });
});


/************* Api ******************/
const apiModel = new ApiModel(CDN_URL, API_URL);

apiModel.getListProductCard()
  .then(function (data: IProductItem[]) {
    dataModel.productCards = data;
  })
  // 2 способ
  // .then(dataModel.setProductCards.bind(dataModel))
  .catch((error) => {
    console.log(error);
  })

/* КАК ЗАПУСТИТЬ ПРИЛОЖЕНИЕ ПРИ СБОРКЕ "build" - что стартанёт приложение */