const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductRouter = require('./routes/admin/products');
const productRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['ghaioelitgfih23yt484390welf']
}));

app.use(authRouter);
app.use(adminProductRouter);
app.use(productRouter);
app.use(cartsRouter);

app.listen(port, () => {
    console.log('Listening');
})
