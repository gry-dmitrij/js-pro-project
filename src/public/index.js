// import '@babel/polyfill';
import Vue from './js/vue.js'
import app from './js/main'
// import './css/normalize.css';
//import './css/style.css';
// import './scss/style.scss';
importAll(require.context('./', true, /\.html$/i));
importAll(require.context('./', true, /\/img\/.*(png|jpe?g|svg|gif|ico)$/i));

function importAll(r) {
 r.keys().forEach(r);
}

const vm = new Vue(app);