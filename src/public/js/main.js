import Vue from './vue'
import {Goods} from './goods';
import {Cart} from "./cart";
import {Search} from "./search";

const app = new Vue({
    el: '#app',
    data: {
        isVisibleCart: false,
        filterLine: '',
    },
    components: {
        'cart': Cart,
        'goods': Goods,
        'search': Search
    },
    methods:{
        filterGoods(data) {
            this.filterLine = data;
        },
        addProduct(product) {
            this.$refs.cart.addProduct(product);
        }
    }
})

export default app;