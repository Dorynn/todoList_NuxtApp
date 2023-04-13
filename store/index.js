import Vue from 'vue';
import Vuex from 'vuex';
import images from './modules/images'
import todos from './modules/todos'
import users from './modules/users'
Vue.use(Vuex);

export default() => new Vuex.Store( {
    modules:{
        images:images,
        todos: todos,
        users: users
    },
    state:{
        isloading: true,
    },
    getters:{

    },
    mutations:{
        SET_LOADING (state, loadpay){
            state.isloading = loadpay
        }

    }
})
