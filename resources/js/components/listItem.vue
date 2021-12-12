<template>
    <div :class="itemClasses">
        <v-checkbox
            @change="updateCheck()"
            v-model="item.status"
        ></v-checkbox>
        <span style="width: 40%"> {{ item.name }} </span>
        <span style="width: 20%"> {{ item.complete_before }} </span>
        <span style="width: 40%"> {{ item.comment }} </span>

        <v-btn
            icon
            color="red"
            @click="removeItem()"
        >
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['item'],
    data: () => ({
        currentTimeStamp: Date.now(),
    }),
    computed: {
        itemClasses () {
            let classes = [];
            classes.push('item')
            if (this.item.status == 1) classes.push('completed');
            if (Date.parse(this.item.complete_before) < this.currentTimeStamp) classes.push('expired');
            return classes;
        }
    },
    methods: {
        updateCheck() {
            console.log(Date.parse(this.item.complete_before));
            console.log(this.currentTimeStamp);
            axios.put('api/item/' + this.item.id, {
                item: this.item
            })
            .then(response => {
                if(response.status == 200) {
                    this.$emit('itemchanged');
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        removeItem() {
            if(this.item.name == '') {
                return;
            }
            axios.delete('api/item/' + this.item.id)
            .then(response => {
                if(response.status == 200) {
                    this.$emit('itemchanged');
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
    },
    beforeMount() {
        let newDate = new Date(this.item.complete_before);
        this.item.complete_before = moment(newDate.setHours(newDate.getHours() + 3)).format('MM/DD/YYYY, HH:mm');
    }
}
</script>
<style lang="sass" scoped>
.item
    display: flex
    justify-content: space-between
    align-items: center
    background: #e6e6e6
    padding: 5px
    span
        display: block
        margin: 5px
    &.completed
        background: #4caf50
        color: #ffffff
    &.expired
        background: #ff7961
        color: #ffffff

</style>
