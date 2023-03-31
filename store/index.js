export const state = () =>({
    images:[],
    // descUser:[]
})

export  const getters={
    images:state => state.images,
    // descUser:state=>state.descUser
}

export const mutations={
    setImage(state, images){
        state.images = images
    },
    // setDescUser(state, descUser){
    //     state.descUser = descUser
    // }
}

// export const actions={
//     async loadDescUser({commit}){
//         let desc = await this.$axios.get('https://jsonplaceholder.typicode.com/posts')
//         commit ('setDescUser', desc)
//     }
// }