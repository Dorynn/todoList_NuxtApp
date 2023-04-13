import axios from 'axios'
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
    actions:{
        async getUserInfo({commit}){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                    commit('SET_USERS', response.data)
            }catch(error){
                    console.log(error)
                }
                
        }
    }
}

export default usersInfo