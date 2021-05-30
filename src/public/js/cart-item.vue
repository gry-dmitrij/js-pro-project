<template>
  <div class="cart-item" :data-id="id_product">
    <div class="product-bio">
      <img :src="img" width="80" alt="Some img">
      <div class="product-desc">
        <p class="product-title">{{ product_name }}</p>
        <p class="product-quantity">Количество: {{ countItem }}</p>
        <p class="product-single-price">{{ price }} за ед.</p>
      </div>
      <div class="right-block">
        <p class="product-price">{{ sumPrice }}&nbsp;₽</p>
        <button class="del-btn" :data-id="id_product" v-on:click="subProduct">×</button>
      </div>
    </div>
  </div>
</template>

<script>
import GetData from './get-data';
import Item from './item';

export default {
  mixins: [Item, GetData],
  props: {
    quantity: {
      type: Number,
      default: 1,
      required: false
    },
    url: {
      type: String,
      default: '/api/cart'
    }
  },
  data: function () {
    return {
      countItem: this.quantity
    }
  },
  computed: {
    sumPrice: function () {
      return this.price * this.countItem;
    }
  },
  methods: {
    subProduct() {
      if (this.countItem === 1) {
        this.$emit('delete-me', this.id_product);
      } else {
        this.putJson(`${this.url}/${this.id_product}`, {quantity: -1})
            .then(data => {
              if (data.result === 1) {
                this.countItem--;
              }
            });
      }
    },
    addProduct(amount = 1) {
      this.countItem += amount;
    }
  }
}</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
}
.cart-item:not(:last-child){
  margin-bottom: 20px;
}
.cart-item img{
  align-self: flex-start;
  margin-right: 15px;
}
.product-bio{
  display: flex;
}
.product-single-price{
  color: #474747;
  font-size: 0.5em;
}
.product-price{
  margin-left: 30px;
}
.product-desc{
  max-width: 150px;
}
.product-quantity {
  margin-top: 15px;
  font-size: 0.75em;
}
.right-block{
  text-align: right;
}
.del-btn{
  margin-top: 5px;
  background-color: #2f2a2d;
  padding: 5px 15px;
  border: 1px solid transparent;
  color: #fafafa;
  border-radius: 5px;
  transition: all ease-in-out .4s;
  cursor: pointer;
}
</style>