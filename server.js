const express = require('express')
const next = require('next')
const https = require('https')
const fs = require('fs')

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  
  https.get('https://news.itmo.ru/api/news/list/?ver=2.0', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const posts = JSON.parse(Buffer.concat(data).toString());

    fs.writeFile("public/locales/ru/common.json", JSON.stringify(posts), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});


  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
