<template>
    <button class="cart" @click="showSideCart">Cart: {{ this.$root.cartQty }}</button>
</template>
<script>

import eventBus from './eventBus';
export default {

    methods: {
        showSideCart( ){
            eventBus.$emit('showSideCart')
        }
    },
}
</script>
<style>
    .cart {
        margin: 1rem;
    }
</style>