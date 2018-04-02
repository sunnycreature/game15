const fetch = require('node-fetch');

fetch('http://localhost:3003/db')
.then(res => res.text())
.then(res => JSON.parse(res))
.then(obj => {
    console.log(obj);
    return obj;
  }
)
.then( obj => {
  obj.top10.push(
    {
      "selectedOption": "numbers",
      "w": 5,
      "player": "from client",
      "elapsed": 777,
      "moves": 77
    } 
  );
  return fetch('http://localhost:3003/db', { 
    method: 'POST',
    body:    JSON.stringify(obj),
    headers: { 'Content-Type': 'application/json' },
  });
})
.then(res => console.log(res))
.catch(err => console.log(err));





