export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}

// интерфейс формы заказа
export interface IOrderForm {
payment?: string;
address?: string;
phone?: string;
email?: string;
total?: string | number;
}

export interface IOrder extends IOrderForm {
  items: string[];
}

export interface IOrderLot{
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}

// тип ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;