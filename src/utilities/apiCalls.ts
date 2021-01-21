const api =
  "https://nie-pyszne-pl-13352-default-rtdb.europe-west1.firebasedatabase.app";

type RequestTypes = "GET" | "POST" | "PUT" | "DELETE";

interface RequestSettings {
  method?: RequestTypes;
  headers: {
    "Content-Type": "application/json";
  };
  mode: "cors";
}

const settings = (method: RequestTypes = "GET"): RequestSettings => {
  return {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  };
};

export function getFoodList() {
  return fetch(`${api}/productList`, settings())
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getFoodCategories() {
  return fetch(`${api}/foodCategories`)
    .then(res => res.json())
    .catch(err => console.warn(err));
}
