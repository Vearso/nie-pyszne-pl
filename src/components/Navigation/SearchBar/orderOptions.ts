import { OrderOption } from "@/store/navigationInterface";

const orderOptions: OrderOption[] = [
  {
    category: "Option",
    order: "details",
    type: "none"
  },
  {
    category: "Price",
    order: "Low to High",
    type: "price_asc"
  },
  {
    category: "Price",
    order: "High to Low",
    type: "price_desc"
  },
  {
    category: "Alphabetically",
    order: "A to Z",
    type: "alph_asc"
  },
  {
    category: "Alphabetically",
    order: "Z to A",
    type: "alph_desc"
  }
];
export default orderOptions;
