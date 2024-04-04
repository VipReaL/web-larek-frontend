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

// тип ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// интерфейс формы заказа
export interface IOrderForm {
payment?: string;
address?: string;
phone?: string;
email?: string;
total?: string | number;
}

// интерфейс заказа
export interface IOrder extends IOrderForm {
  items: string[];
}