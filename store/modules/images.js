import axios from 'axios'
const images = {
    state: {
        images: []
    },
    getters: {
        images: state => state.images
    },
    mutations:{
        SET_IMAGES(state, images){
            state.images = images
        }
    },
    actions:{
        async getImages({commit}){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
                    commit('SET_IMAGES', response.data)
            }catch(error){
                    console.log(error)
                }
                
        }
    }
}


export default images;
