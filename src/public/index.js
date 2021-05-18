import '@babel/polyfill';
//import appMain from './js/main'
 import './css/normalize.css';
//import './css/style.css';
import './scss/style.scss';
importAll(require.context('./', true, /\.html$/i));
//const app = new Vue(appMain);

function importAll(r) {
 r.keys().forEach(r);
}
