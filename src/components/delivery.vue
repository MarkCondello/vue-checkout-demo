<template>
    <div>
        <div v-if="this.$root.cart.length < 3">
            <p>Free delivery for more than 3 items</p>
            <p>Standard Fee: $12.99</p>
        </div>  
        <div v-else >
            <p>Free delivery!</p>
        </div>
    </div>
</template>