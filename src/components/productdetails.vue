<template>
    <ul>
        <li v-for="detail in details" v-text="detail" :key="details.indexOf(detail)"></li>
    </ul>
</template>
<script>
    export default {
        name: 'productdetails',
        props: {
            details: {
                type: Array,
                required: true
            }
        }
    }
</script>