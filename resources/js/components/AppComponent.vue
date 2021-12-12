<template>
    <v-app>
        <div class="todoListContainer">
            <div class="heading">
                <h2 class="my-4 text-center">Список задач</h2>
                <add-item-form
                    v-on:reloadlist="getList()"/>
                <list-view
                    :items="items"
                    v-on:reloadlist="getList()"
                />
            </div>
        </div>
    </v-app>
</template>

<script>
import addItemForm from "./addItemForm";
import listView from "./listView";
export default {
    components: {
        addItemForm,
        listView
    },
    data: () => ({
        items: [

        ]
    }),
    methods: {
        getList () {
            axios.get('api/items')
                .then(response => {
                    if(response) {
                        this.items = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    created() {
        this.getList();
    }
}
</script>
<style lang="sass">
.todoListContainer
    width: 750px
    margin: 0 auto
    border: 1px solid #000
    border-radius: 10px

</style>
