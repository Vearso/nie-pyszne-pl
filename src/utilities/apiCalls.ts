const api = "http://localhost:3000/productList";

const headers = {
  'Content-Type': 'application/json',
}

export function getFoodList () {
  return fetch(api,{
    method: 'GET',
    headers,
  }).then(res => res.json())
    .catch(err => console.log(err));
}