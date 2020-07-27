<template>
    <transition-group 
    :name="slideSideCart"
    class="slide"
    
    :class=" slideSideCart === 'slidein' ? 'slideinCart' : 'slideoutCart'  ">
        <slot  ></slot>
      </transition-group>
</template>

<script>
import eventBus from "./eventBus";

export default {
    data() {
        return {
            slideSideCart : 'slideout',
            //sideCartWidth : 0,
        }
    },
    created() {
            eventBus.$on('showSideCart', ()=>{
                if(this.$root.cartQty > 0){
                    return this.slideSideCart = 'slidein';
                }
                this.slideSideCart  = 'slideout';
        }),

        eventBus.$on('closeSideCart', ()=>{
                this.slideSideCart  = 'slideout';
        })
    },
    methods: {

    }
}
</script>
<style>
.slide{
    position: relative;
    display: block;
    transition: right 1s;

} 
 
.slide.slideoutCart {
  right: 0;
    /*overflow-x: hidden;*/

}

.slide.slideinCart {
   right: 444px;
    /*overflow-x: visible;*/

}
</style>