export const createProduct = (userId,  product) => {
  console.log(product)
  return fetch(`http://localhost:8000/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
 