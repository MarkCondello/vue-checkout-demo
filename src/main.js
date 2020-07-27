import Vue from 'vue'
import eventBus from "./eventBus";

Vue.config.productionTip = false
Vue.component('product', require('../src/Product').default);
Vue.component('sidebar-cart', require('../src/SidebarCart').default);
Vue.component('cart-btn', require('../src/CartBtn').default);
Vue.component('container', require('../src/Container').default);

new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        cartQty: 0,
    },
    components: {eventBus},
    created(){
        eventBus.$on('addToCart', (product, qty, title) => {
            this.cartQty += parseInt(qty);
            //check if product is in array
            let foundProductIndex = this.getProductIndex(product);
            if(foundProductIndex != -1){  
                this.cart[foundProductIndex].qty += parseInt(qty);
               return;
            }
            //else create new product with qty
            let newProduct = {
                title: title,
                qty : parseInt(qty),
                ...product
            }
            this.cart.push(newProduct);
        });

        eventBus.$on('removeProduct', (product) => {
            this.cartQty -= product.qty;
            this.cart = this.cart.filter(item => {
                return item.variantId !== product.variantId;
            })
        });

        eventBus.$on('updateItemQty', (product)=>{
            console.log("Reached udoate item qty");
            let foundProductIndex = this.getProductIndex(product);
            if(foundProductIndex != -1){  
                this.cart[foundProductIndex].qty = parseInt(product.qty);
            }
            this.cartQty = this.cart.reduce((acc, item)=>{
                return acc += item.qty;
            }, 0);
        });
    },
    methods: {
        getProductIndex(product){
            return this.cart.findIndex(item => item.variantId === product.variantId)
        }
    }

})

