import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
  axios.get('http://localhost:3000/orders/1')
  .then(({data}) => {
    setText(JSON.stringify(data));
  });
}

export function getCatch() {
  axios.get('http://localhost:3000/orders/123')
  .then((result) => {
    setText(JSON.stringify(result.data));
  })
  .catch(error => setText(error));
}

export function chain() {
  axios.get('http://localhost:3000/orders/1')
  .then(({data}) => {
    // remember to RETURN the promise in each .then!!
    return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
  }).then(({data}) => {
    setText(`City: ${data.city}`);
  })
}

export function chainCatch() {
  axios.get('http://localhost:3000/orders/1')
  .then(({data}) => {
    axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
    throw new Error('First Error')
  })
  .catch(error => {
    console.log(error);
    setText(error);
    return {data: {}}
    // throw new Error('second error');
  })
  .then(({data}) => {
    throw new Error('second error')
    // setText(`City: ${data.city}`);
  })
  .catch(error => {
    console.log(error);
    setText(error)
  })
}

export function final() {
  showWaiting();
  axios.get('http://localhost:3000/orders/1')
       .then(({data}) => {
         return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`)
       })
       .then(({data}) => {
         setText(`City: ${data.city}`);
       })
       .catch(error => setText(error))
       .finally(() => {
         setTimeout(() => {
           hideWaiting();
         }, 1500);

         appendText('\nCompletely Done')
       });
}