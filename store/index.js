export const state = () =>({
    images:[],
})

export  const getters={
    images:state => state.images,
}

export const mutations={
    setImage(state, images){
        state.images = images
    },
}
