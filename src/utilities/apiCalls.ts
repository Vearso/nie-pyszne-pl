const api = "http://localhost:3000";

export function getFoodList() {
  return fetch(`${api}/productList`)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getFoodCategories() {
  return fetch(`${api}/foodCategories`)
      .then(res => res.json())
      .catch(err => console.warn(err))
}
