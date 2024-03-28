import { ApiListResponse, Api } from '../base/api'
import { IProductItem } from '../../types';

export class ApiModel extends Api {
  cdn: string;
  total: number;
  items: IProductItem[];

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  //получаем массив объектов(карточек) с сервера
  getListProductCard(): Promise<IProductItem[]> {
    return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }

  getProductCard() {
    this.get('/product')
      .then((data: ApiListResponse<IProductItem>) => {
        this.total = data.total;
        this.items = data.items;
      })
  }
}