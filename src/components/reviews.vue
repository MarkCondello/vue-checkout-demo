<template>
    <div>
        <h2>Reviews</h2>
        <p v-if="reviews.length === 0">There are no reviews</p>
        <ul v-for="review in reviews" :key="reviews.indexOf(review)">
            <li>Name: {{review.name}}</li>
            <li>said: {{review.review}}</li>
            <li>rating: {{review.rating}} out of 5</li>
            <li>Recommended: {{review.recommended}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            reviews: {
                type: Array,
                required: true
            }
        }
    }
</script>