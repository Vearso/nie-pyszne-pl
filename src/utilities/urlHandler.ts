import { ListOrder } from "@/store/navigationInterface";

export interface UrlParameters {
  foodCategory: string;
  listOrder: ListOrder;
  filterPhrase: string | number;
  displayType: string
}
