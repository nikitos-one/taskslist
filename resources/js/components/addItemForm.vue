<template>
    <div class="addItem px-4">
        <v-row>
            <v-col>
                <v-text-field
                    v-model="item.name"
                    hide-details
                    label="Введите название"
                    class="ma-0 pa-0"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-datetime-picker
                    v-model="item.complete_before"
                    label="Выберите крайний срок исполнения"
                    clearText="Отмена"
                    :text-field-props="textFieldProps"
                    :date-picker-props="dateProps"
                    :time-picker-props="timeProps"
                    :time-format="timeFormat"
                    :date-format="dateFormatted"
                ></v-datetime-picker>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    v-model="item.comment"
                    hide-details
                    label="Введите комментарий"
                    rows="2"
                    row-height="10"
                    class="ma-0 pa-0"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col
                class="text-center"
            >
                <v-btn
                    class="mb-4 white--text"
                    @click="addItem()"
                    color="green"
                >
                    Добавить
                </v-btn>
            </v-col>
        </v-row>

    </div>
</template>

<script>
export default {
    data: vm => ({
        dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        textFieldProps: {
            appendIcon: 'event',
        },
        dateProps: {
            locale: "ru-ru",
            'first-day-of-week': "1"
        },
        timeProps: {
            format: "24hr"
        },
        timeFormat: "HH:mm",
        item: {
            name: "",
            comment: "",
            complete_before: "",
        }
    }),
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
    },
    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
    methods: {
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        addItem() {
            if(this.item.name == '') {
                return;
            }

            // Convert datetime to timestamp
            this.item.datetime = Date.parse(this.item.datetime);

            axios.post('api/item/store', {
                item: this.item
            })
                .then(response => {
                    if(response.status == 200) {
                        this.item.name = "";
                        this.item.comment = "";
                        this.item.complete_before = "";
                        this.$emit('reloadlist');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>
<style lang="sass" scoped>

</style>
