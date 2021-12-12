<template>
    <div class="items">
        <div v-for="(item, index) in items" :key="index">
            <list-item
                :item="item"
                v-on:itemchanged="$emit('reloadlist')"
            />
        </div>
    </div>
</template>

<script>
import listItem from "./listItem";

export default {
    props: ['items'],
    components: {
        listItem
    }
}
</script>
<style lang="sass">
.items
    &:last-child
        .item
            border-radius: 0 0 10px 10px
</style>
