import setText , {appendText} from './results.mjs';

export async function get(){
  const { data } = await axios.get('http://localhost:3000/orders/1');
  setText(JSON.stringify(data))
}

export async function getCatch(){
  try {
    const { data } = await axios.get('http://localhost:3000/orders/123');
    setText(JSON.stringify(data));
  } catch(error) {
    setText(error);
  }
}

export async function chain(){
  try {
    // destructuring 'data' and then renaming it 'order'
    const { data: order } = await axios.get('http://localhost:3000/orders/1');
    const { data: address } = await axios.get(`http://localhost:3000/addresses/${order.shippingAddress}`)
    setText(`City: ${address.city}`);
  } catch(error) {
    setText(error);
  }
}

export async function concurrent(){
  // setting it up like this allows both api calls to kick off at the same time
  const orderStatus = axios.get('http://localhost:3000/orderStatuses');
  const orders = axios.get('http://localhost:3000/orders');

  setText('');

  const {data: statuses} = await orderStatus;
  const {data: order} = await orders;

  appendText(JSON.stringify(statuses));
  appendText(JSON.stringify(order[0]));
}

export async function parallel(){
  setText('');

  try {
    await Promise.all([
      // annonymous async function that retunrs a promise
      (async () => {
        const { data } = await axios.get('http://localhost:3000/orderStatuses');
        appendText(JSON.stringify(data));
      })(),
      (async () => {
        const { data } = await axios.get('http://localhost:3000/ordersss');
        appendText(JSON.stringify(data));
      })()
    ])
  } catch(error) {
    setText(error);
  }

}