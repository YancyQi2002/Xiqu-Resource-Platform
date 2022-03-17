import { defineStore } from 'pinia'

export interface UserInfo {
    id:number;
    username:string;
    jurisdiction:string;
    phone:string;
    email:string;
    token:string;
}

export const KEY_USER_ID = 'user'

const useUserStore = defineStore({
    id: KEY_USER_ID,
    state: ():UserInfo => ({
        id: -1,
        username: '',
        jurisdiction: '',
        phone: '',
        email: '',
        token: ''
    }),

    actions: {
        setToken(token :string) {
            this.$state.token = token
        },
        setId(_id :number) {
            this.$state.id = _id
        },
        setJurisdiction(jurisdiction :string) {
            this.$state.jurisdiction = jurisdiction
        },
        login(user :Partial<UserInfo>) {
            this.$state = {
                ...this.$state,
                ...user
            }
        }
    }
})

// create
const instance = useUserStore()

instance.$subscribe((mutation, state) => {
    localStorage.setItem(instance.$id, JSON.stringify(state))
})

// init
const val = localStorage.getItem(instance.$id)
if (val) {
    instance.login(JSON.parse(val))
}

export default useUserStore