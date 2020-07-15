import Vue from 'vue'

Vue.config.productionTip = false
Vue.component('product', require('../src/Product').default);

new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        incrementCart(id){
            this.cart.push(id)
        },
        removeItem(id){
            this.cart = this.cart.filter(item=> {
                return item !== id;
            })
        }
    }

})