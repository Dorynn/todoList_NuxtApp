const usersInfo ={
    state:{
        users:[]
    },
    getters:{
        users: state=>state.users
    },
    mutations:{
        SET_USERS(state, users){
            state.users = users;
        }
    }, 
    action:{
        async getUserInfo({commit}){
            const response = await this.$axios.get('https://jsonplaceholder.typicode.com/users')
            commit('SET_USERS', response.data)
        }
    }
}

export default usersInfo