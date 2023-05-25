import { defineStore } from 'pinia'

export const EquipStore = defineStore("equip", {

    state: () => {
        return {
            currentUnid: ""
        }
    },
    actions: {
        getCurrentUnid(unid) {
            this.currentUnid = unid
        }
    },
    getters: {}

})
