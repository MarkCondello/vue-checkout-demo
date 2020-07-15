<template>
    <div>
        <span class="tab"
              :class="{activeTab: selectedTab === tab}"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab"
        >{{tab}} </span>

        <reviews v-show="selectedTab === 'Reviews'" :reviews="reviews"></reviews>
        <reviewForm v-show="selectedTab === 'Make a review'"></reviewForm>
        <productDetails v-show="selectedTab === 'Details'" :details="details"></productDetails>
        <delivery v-show="selectedTab === 'Shipping'" />
    </div>
</template>
<script>
    import reviewForm from "./productreview";
    import reviews from "./reviews";
    import productDetails from "./productdetails";
    import delivery from "./delivery";

    export default {
        components: {reviewForm, reviews, productDetails, delivery},

        props: {
            reviews: {
                type: Array,
                required: true
            },
            details : {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                tabs: ['Reviews', 'Make a review', 'Details', 'Shipping'],
                selectedTab: 'Reviews'
            }
        }
    }
</script>