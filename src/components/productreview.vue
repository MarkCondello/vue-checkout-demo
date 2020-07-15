<template>
    <form class="review-form" @submit.prevent="onSubmit" @click="clearErrors">
        <p v-if="errors.length">Please fix the following errors...</p>
        <ul v-for="error in errors" :key="errors.indexOf(error)">
            <li v-text="error"></li>
        </ul>
        <label>Name:
            <input type="text" v-model="name"/>
        </label>
        <label>Review:
            <textarea v-model="review"></textarea>
        </label>
        <label>Rating:
            <select v-model.number="rating">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </label>
        <div>
            <p>Would you recommend this product?</p>
            <label>Yes
                <input type="radio" name="recommended" value="yes" v-model="recommended"/>
            </label>
            <label>No
                <input type="radio" name="recommended" value="no"  v-model="recommended"/>
            </label>
        </div>
        <div>
            <button>Add review</button>
        </div>
    </form>
</template>
<script>
    import eventBus from "../eventBus";
    export default {
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                recommended: null,
                errors: []
            }
        },
        methods: {
            onSubmit() {
                if (this.name && this.review && this.rating && this.recommended) {
                    let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating,
                        recommended: this.recommended
                    }
                    eventBus.$emit('review-submitted', productReview);
                    this.clearErrors();
                } else {
                    if(!this.name) this.errors.push('The name field is required');
                    if(!this.review) this.errors.push('The review field is required');
                    if(!this.rating) this.errors.push('The rating options is required');
                    if(!this.recommended) this.errors.push('The recommended option is required');
                }
            },
            clearErrors(){
                this.errors = [];
            }
        }
    }
</script>