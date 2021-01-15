const apiKey = "";

const headers = {
  'Content-Type': 'application/json',
}

export function getFoodList (data:string) {
  return fetch(apiKey,{
    method: 'GET',
    headers,
    body: JSON.stringify(data),
  }).then(res => res.json())
    .catch(err => console.log(err));
}