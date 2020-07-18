<template>
    <div class="sidebar-cart" ref="sidebarCart">
        <div class="details"> 
            <h2>Cart</h2>
            <div v-for="(product, index) in this.$root.cart"  :key="index" class="product-container">
                <button class="remove-product-btn" @click.prevent="removeProduct(product)">&times;</button>
                <div class="product">
                    <div class="product-image">
                        <img :alt="product.title"  :src="product.variantImage" />  
                    </div>
                    <div class="product-info">
                        <p class="title">{{product.title}} | {{product.variantColor}}</p>
                        <hr>
                        <div class="cost-qty">
                            <span>${{ product.price }}</span>
                            <!-- Inc product qty input to change cart qty -->
                            <span>Qty: {{product.qty}} </span>
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
        <div class="totals">
            Total cost: ${{ getTotals}}
        </div>
    </div>
</template>

<script>
 import eventBus from "./eventBus";
export default {
    name: 'SidebarCart',
    data() {
        return {
            products: []
         }
    },
    computed: {
         getTotals: function(){
           return this.$root.cart.reduce((acc, item) => {
                return acc += item.price * item.qty; 
            }, 0);
        },
    },
    created(){
  
    },
    methods: {
        removeProduct(product) {
            //add to the event bus instead so a cart component can be udpated
            eventBus.$emit('removeProduct', product);
        },
    }
}
</script>
<style scoped>
    .sidebar-cart {
        width: 400px;
        height: 100vh;
        position: absolute;
        top: 0;
        background: #d8d8d8;
        right: calc((2rem + 400px) * -1);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .sidebar-cart .product-container {
        position: relative;
    }

    .sidebar-cart .product-container .remove-product-btn {
        position: absolute;
        right: 0;
        top: 1rem;
        width: 20px;
        height: 20px;
    }

    .sidebar-cart .product {
        flex-flow: nowrap;
        padding-left: 0;
        padding-right: 0;
    }

    .sidebar-cart .product-image {
        width: 110px;
        margin-right: 10px;
    }
   .sidebar-cart .product-image img {
        margin: 0;
        width: 100%;
    }

    .sidebar-cart .product-info {
        width: 100%;
    }
.sidebar-cart .product-info .cost-qty {
    justify-content: space-between;
    display: flex;
}
</style>