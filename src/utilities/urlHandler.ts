import { OrderOption } from "@/store/navigationInterface";

export interface UrlParameters {
  foodCategory: string;
  listOrder: OrderOption;
  filterPhrase: string | number;
}
