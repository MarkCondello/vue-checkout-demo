<template>
    <div class="product">
        <div class="product-image">
            <img :alt="product" :src="variants[selectedVariant].variantImage"/>
         </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <h2 v-show="onSale">{{showSaleMsg}}</h2>
            <p>Shipping: {{shipping}}</p>
            <h3>Price: ${{variants[selectedVariant].price}}</h3>
            <label> Qty:
                <input type="number" min="1" v-model="qty"   />
            </label>
            <p v-if="inStock > 10">In stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out</p>
            <p v-else :class="{'line-through': !inStock}">Out of stock</p>

            <div v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 class="color-box"
                 :style="{ backgroundColor: variant.variantColor}"
                 @mouseover="changeImg(index)"
            >
            </div>
            <h3>Sizes:</h3>
            <ul>
                <li v-for="size in sizes" v-text="size" :key="sizes.indexOf(size)"></li>
            </ul>
            <button v-on:click="addToCart(variants[selectedVariant])" :disabled="!inStock"
                    :class="{disabledButton: !inStock}">Add to Cart
            </button>
            <!-- <button v-on:click="removeItem(variants[selectedVariant].variantId)">Remove Current Item</button> -->
        </div>
        <productTabs :reviews="reviews" :details="details"></productTabs>
    </div>
</template>

<script>
    import greenSockImage from './assets/green-socks.jpg';
    import blueSockImage from './assets/blue-socks.jpg';
    import productTabs from "./components/producttabs";
    import eventBus from "./eventBus";

    export default {

        name: 'Product',
        props: {
   
        },
        components: { productTabs },
        data() {
            return {
                brand: 'Vue Mastery',
                product: 'Socks',
                selectedVariant: 0,
                onSale: true,
                details: ['80% cotton', '20% polyester', 'Gender-neutral', 'Stretchy and firm'],
                qty: 1,
                variants: [{
                    variantId: 125,
                    variantColor: 'green',
                    variantImage: greenSockImage,
                    variantStock: 20,
                    price: 6.99
                }, {
                    variantId: 127,
                    variantColor: 'blue',
                    variantImage: blueSockImage,
                    variantStock: 2,
                    price: 8.99
                }],
                sizes: [
                    'small',
                    'medium',
                    'large',
                    'x-large'
                ],
                reviews: []
            }
        },
        computed: {
            title() {
                return `${this.brand} | ${this.product}`;
            },
            image() {
                return this.variants[this.selectedVariant].variantImage;
            },
            inStock() {
                return this.variants[this.selectedVariant].variantStock;
            },
            showSaleMsg() {
                return `${this.title} is On Sale NOW!`;
            },
            shipping() {
                if (this.premium) {
                    return 'Free!';
                } else {
                    return '$2.99';
                }
            }
        },
        methods: {
            addToCart(product) {
                eventBus.$emit('addToCart', product, this.qty, this.title);
            },
            changeImg(index) {
                this.selectedVariant = index;
            },
        },
        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview);
            })

        }
    }
</script>

