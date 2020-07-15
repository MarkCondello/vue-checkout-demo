<template>
    <div class="sidebar-cart">
        <div class="product">
            <div class="product-image">
                <img :alt="product" />
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
            </div> 
        </div>
    </div>
</template>

<script>
 
//import eventBus from "./eventBus";

export default {

    name: 'SidebarCart',
    props: {

    },
    components: {   },
    data() {
        return {
        }
    },
}
</script>
<style scoped>
    .sidebar-cart {
        width: 400px;
        height: 100vh;
        position: absolute;
        top: 0;
        background: #d8d8d8;
        right: -400px;
    }
</style>