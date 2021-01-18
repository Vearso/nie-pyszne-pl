const api = "http://localhost:3000/productList";

export function getFoodList() {
  return fetch(api)
    .then(res => res.json())
    .catch(err => console.log(err));
}
