import Vue from 'vue'
import eventBus from "./eventBus";

Vue.config.productionTip = false
Vue.component('product', require('../src/Product').default);
Vue.component('sidebar-cart', require('../src/SidebarCart').default);
Vue.component('cart-btn', require('../src/CartBtn').default);

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
            let foundProductIndex = this.cart.findIndex(item => item.variantId === product.variantId)
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
            this.cart = this.cart.filter(item=> {
                return item.variantId !== product.variantId;
            })
        });

        eventBus.$on('showSideCart', ()=>{
            //get width of side cart,
            //get the root element
            //add -right value of root element with sidecart width
            let container = this.$el,
            sideBarCart = this.$root.$children.find(child => {
                 return  child.$el.classList.value  === 'sidebar-cart'
                }
            ),
            sideBarWidth = sideBarCart.$el.clientWidth,
            rightVal = 0;

            if(this.cartQty > 0){
                 let slideLeftInterval = setInterval(function(){
                    rightVal +=1;
                    container.style.right = `${rightVal}px`

                   if(rightVal === sideBarWidth){
                       clearInterval(slideLeftInterval)   
                    } 
                       // console.log("RightVal", rightVal);
                    
                }, 10); 
            }
        
        })
    },
    methods: {
 
    }

})

