const getFoodList = (api: string, data: object, method: string = "GET") => {
  const headers = {
    'Content-Type': 'application/json',
  }
  return fetch(api,{
    method,
    headers,
    body: JSON.stringify(data),
  }).then(res => res.json())
    .then(response => {
      console.log(response)
    }).catch(err => console.log(err));
}

export default getFoodList;