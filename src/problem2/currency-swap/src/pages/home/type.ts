import { ReactElement } from "react";

export interface CurrencyConvertFormProps {
  tokenList: {
    id?: string;
    currency: string;
    date: string;
    price: number;
    img: string;
  }[];
}

export interface ISelect {
  emoji: ReactElement;
  key: string;
  label: ReactElement;
  title: string;
  value: number;
}

export interface IConvertFormValues {
  amount: number | string;
  left_currency: ISelect;
  right_currency: ISelect;
}

export enum FormLayout{
  horizontal = 'horizontal',
  vertical = 'vertical',
  inline = 'inline'
}
