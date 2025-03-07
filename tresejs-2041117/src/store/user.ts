import {defineStore} from 'pinia'


// @ts-ignore
export const useUserStore = defineStore('user', {
    state:() =>({
        user: {
        }
    }),
    persist:{
       enabled: true
    }
    }
);

