const fetch = require('node-fetch');

fetch('http://localhost:3003/db')
.then(res => res.text())
.then(res => JSON.parse(res).top10)
.then(top10 => {
    console.log(top10);
    return top10;
  }
)
.then(
  top10 => {
    const newTop10 = 
  }
);

