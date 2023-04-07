const taskList = {
    state:{
        items:[
            {
            todo: "english",
            status2: "New",
            description: "hihi",
            _showDetails: false,
            },
            {
            todo: "math",
            status2: "Inprogress",
            description: "do it",
            _showDetails: false,
            },
            {
            todo: "math",
            status2: "Done",
            description: "do it",
            _showDetails: false,
            },
        ],
        idRowBefore:0

    },
    getters:{
        items:state=>state.items
    },
    mutations:{
        DELETE_TASK(state, idTask){
            state.items = state.items.filter((item, i)=>{
                return i!=idTask
            })
        },
        ADD_TASK(state, newtask){
            state.items.push(newtask)
        }, 
        EDIT_TASK(state, payload){
            state.items[payload.id].todo = payload.task
            state.items[payload.id].description = payload.desc
            state.items[payload.id].status2= payload.status
            
        },
        CHECK_SHOW_ROW_DETAIL(state, payload){
            state.items[state.idRowBefore]._showDetails = false;
            state.idRowBefore = payload.idRowCurrent;
            payload.statusShowDetail?state.items[payload.idRowCurrent]._showDetails = false : state.items[payload.idRowCurrent]._showDetails=true;
        }
    },
    actions:{

    }
}

export default taskList