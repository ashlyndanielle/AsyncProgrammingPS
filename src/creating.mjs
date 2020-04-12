import setText, { appendText } from "./results.mjs";

export function timeout(){
  const wait = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Timeout!');
    }, 1500);
  });

  wait.then(text => setText(text));
}

export function interval(){
  let counter = 0;
  const wait = new Promise((resolve) => {
    setInterval(() => {
      console.log('logging interval...')
      resolve(`Counter: ${++counter}`)
    }, 1500)
  })
  wait.then(response => setText(response))
      .finally(() => appendText(`\nDone ${counter}`));
}

export function clearIntervalChain(){
  let counter = 0;
  let interval;
  const wait = new Promise((resolve) => {
    interval = setInterval(() => {
      console.log(`logging counter: ${counter}`);
      resolve(`Counter: ${++counter}`);
    }, 1500)
  })

  wait.then(response => setText(response))
      .finally(() => clearInterval(interval));
}

export function xhr(){
  let request = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/users/7');
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject(xhr.status)
      }
    };
    // onerror is only called when there is something like a network
    // error and the call fails to be completed
    xhr.onerror = () => reject('Request Failed');

    xhr.send();
  })

  request.then(result => setText(result))
         .catch(error => setText(error));
}

export function allPromises(){
  let categories = axios.get('http://localhost:3000/itemCategories');
  let statuses = axios.get('http://localhost:3000/orderStatuses');
  let userTypes = axios.get('http://localhost:3000/userTypes');
  let addressTypes = axios.get('http://localhost:3000/addressTypes')

  Promise.all([categories, statuses, userTypes, addressTypes])
    .then(([catResults, statResults, userResults, addressResults]) => {
      setText(`All Promises Resolved:`);

      appendText(JSON.stringify(catResults.data));
      appendText(JSON.stringify(statResults.data));
      appendText(JSON.stringify(userResults.data));
      appendText(JSON.stringify(addressResults.data));
    })
    .catch(error => setText(error))
}

export function allSettled(){
  let categories = axios.get('http://localhost:3000/itemCategories');
  let statuses = axios.get('http://localhost:3000/orderStatuses');
  let userTypes = axios.get('http://localhost:3000/userTypes');
  let addressTypes = axios.get('http://localhost:3000/addressTypes');

  Promise.allSettled([categories, statuses, userTypes, addressTypes])
    .then((values) => {
      let results = values.map(response => {
        if (response.status === 'fulfilled') {
          console.log(response.value);
          return ` FULFILLED: ${response.value.data[0].description}`;
        }
        return ` REJECTED: ${response.reason.message}`;
      })
      setText(results);
    })
    .catch(error => {
      setText(error)
    })
}

export function race(){
  let users = axios.get('http://localhost:3000/users');
  let backup = axios.get('http://localhost:3001/users');

  Promise.race([users, backup])
    .then(users => setText(JSON.stringify(users.data)))
    .catch(error => setText(error))
}