<template>
    <div class="sidebar-cart" ref="sidebarCart" >
        <div class="details"> 
            <button class="close-sidecart" @click="closeSideCart">&times;</button>
            <h2 class="cart-title">Cart</h2>
            <div v-for="(product, index) in this.$root.cart"  :key="index" class="product-container">
                <button class="remove-product-btn" @click.prevent="removeProduct(product)">&times;</button>
                <div class="product">
                    <div class="product-image">
                        <img :alt="product.title" :src="product.variantImage" />  
                    </div>
                    <div class="product-info">
                        <p class="title">{{product.title}} | {{product.variantColor}}</p>
                        <hr>
                        <div class="cost-qty">
                            <span>${{ product.price }}</span>
                            <span>Qty:  <input type="number" placeholder="product.qty" v-model="product.qty" @change="updateItemQty(product)"/> </span>
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
 
    computed: {
         getTotals: function(){
           return this.$root.cart.reduce((acc, item) => {
                return acc += item.price * parseInt(item.qty); 
            }, 0);
        },
    },
    created(){
     },
    methods: {
        updateItemQty(product){
            eventBus.$emit('updateItemQty', product);
        },
        removeProduct(product) {
             eventBus.$emit('removeProduct', product);
        },
        closeSideCart(){
            eventBus.$emit('closeSideCart')
        }
    }
}
</script>
<style scoped>
    .sidebar-cart {
        width: 400px;
        min-height: 100vh;
        height: 100%;
        position: absolute;
        top: 0;
        background: #d8d8d8;
        right: calc((3rem + 400px) * -1);  
     
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: hidden;
    }
    .sidebar-cart .details {
        position: relative;
    }

    .sidebar-cart .details .cart-title{
        margin-top:0;
    }

    .sidebar-cart .details .close-sidecart {
        position: absolute;
        top: 0;
        right: 0;
        color: black;
        background: transparent;
        border: none;
        height: 10px;
        width: 10px;
        right: 1rem;
        font-size: 33px;
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