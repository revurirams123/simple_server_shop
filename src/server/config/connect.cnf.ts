
import * as fs from 'fs';
import * as path from 'path';

export default {
  session:{
    adapter: 'connect-mongo',
    collection: 'session',
    url: 'mongodb://127.0.0.1:27017/simpleStore',
    options: {
      useNewUrlParser: true
    },
    // username: 'admints',
    // password: 'eafb0424376b45769ccc4ffeacbd8f48',
  },
  ssl:{
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem'),
    passphrase: 'goodword'
  },
  ioOptions:{ //ioOptions refer to server.interface.d
    serveClient: true,
    pingInterval: 5000,
    pingTimeout: 2500,
    cookie: true
  },
  // port: 8095,
  sslPort: 6040,
  // wsPort: 40510,
  io_Port: 4051,
  io_sslPort: 6050,
  duration: 24, //hours
  mongoUrl: 'mongodb://127.0.0.1:27017/simpleStore',
  key: 'bf6987742b9c56b947f9c02baa6930dc',
  paths:{
    shop_image_path: '/public/imgs/products/',
    product_image: path.resolve(`${__dirname}/../public/imgs/products/`)
  },
  cache: {
    client: './clients/shop_sw.js',
    server: './server/clients/shop_sw.js',
    products:[
      '/',
      '/shop',
      '/shop/css/main.css',
      '/shop/app.js'
    ],
  }
}
