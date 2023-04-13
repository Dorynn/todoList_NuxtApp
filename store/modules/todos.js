import axios from 'axios'
const taskList = {
    state: {
        items: [
            // {
            //     id: 1,
            //     todo: "english",
            //     status2: "New",
            //     description: "hihi",
            //     _showDetails: false,
            // },
            // {
            //     id: 2,
            //     todo: "math",
            //     status2: "Inprogress",
            //     description: "do it",
            //     _showDetails: false,
            // },
            // {
            //     id: 3,
            //     todo: "physics",
            //     status2: "Done",
            //     description: "physics desc",
            //     _showDetails: false,
            // },
        ],

    },
    getters: {
        items: state => state.items,
        completedTask(state){
            return state.items.filter((item)=>{
                return item.status2 ==='Done'
            }).length
        },
        inprogressTask(state){
            return state.items.filter((item)=>{
                return item.status2 ==='Inprogress'
            }).length
        },
        newTask(state){
            return state.items.filter((item)=>{
                return item.status2 ==='New'
            }).length
        },
    },
    mutations: {
        DELETE_TASK(state, idTask) {
            state.items = state.items.filter((item, i) => {
                return item.id != idTask
            })
        },
        ADD_TASK(state, newtask) {
            state.items.push(newtask)
        },
        EDIT_TASK(state, payload) {
            state.items[payload.index].todo = payload.item.todo
            state.items[payload.index].description = payload.item.description
            state.items[payload.index].status2 = payload.item.status2
            state.items[payload.index]._showDetails = payload.item._showDetails

        },
        SORT_ITEMS_DESCENDING(state, sortState) {
            if (sortState === 'todo') {
                state.items.sort((item1, item2) => {
                    let todo1 = item1.todo.toLowerCase();
                    let todo2 = item2.todo.toLowerCase();
                    if (todo1 < todo2) { return 1 };
                    if (todo1 > todo2) { return -1 };
                    return 0;
                })
            }
            if (sortState === 'status2') {
                state.items.sort((item1, item2) => {
                    let status1 = item1.status2.toLowerCase();
                    let status2 = item2.status2.toLowerCase();
                    if (status1 < status2) { return 1 };
                    if (status1 > status2) { return -1 };
                    return 0;
                })
            }
        },
        SORT_ITEMS_ASCENDING(state, sortState){
            if (sortState === 'todo'){        
                state.items.sort((item1, item2)=>{
                let todo1 = item1.todo.toLowerCase();
                let todo2 = item2.todo.toLowerCase();
                if(todo1 < todo2){return -1};
                if(todo1 > todo2){return 1};
                return 0;
                })
            }
            if (sortState === 'status2'){        
                state.items.sort((item1, item2)=>{
                  let status1 = item1.status2.toLowerCase();
                  let status2 = item2.status2.toLowerCase();
                  if(status1 < status2){return -1};
                  if(status1 > status2){return 1};
                  return 0;
                })
            }
        },
        SET_TASK(state, data){
            state.items = data
        }


    },
    actions: {
        async getTodos({commit}){
            try {
                const response = await axios.get('http://localhost:3000/items')
                commit('SET_TASK', response.data)
            }catch(error){
                console.log(error)
            }
        },
        async addTask({commit}, newTask){
            try{
                await axios.post('http://localhost:3000/items', newTask)
                commit('ADD_TASK', newTask)
            }catch(error){
                console.log(error)
            }
        },
        async deleteTask({commit}, taskId){
            try{
                await axios.delete(`http://localhost:3000/items/${taskId}`)
                commit('DELETE_TASK', taskId)
            }catch(error){
                console.log(error)
            }
        },
        async editTask({commit, state}, payload){
            try{
                await axios.put(`http://localhost:3000/items/${payload.item.id}`, payload.item)
                commit('EDIT_TASK', payload)
            }catch(error){
                console.log(error)
            }
        }
    }
}

export default taskList