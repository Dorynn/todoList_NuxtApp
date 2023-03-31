<template>
  <div id="homePage">
    <h1 class="title">Todo List</h1>
    <div class="control">
      <b-button v-b-modal.modal-1 variant="success" @click="changeIsModalAdd"
        >Add</b-button
      >
      <b-modal
        id="modal-1"
        :ref="changeModal()"
        title="Add task"
        @ok="onModal(changeModal())"
        @hide="resetInfoModal"
        :ok-disabled="!validInput"
      >
        <b-form-group
          id="input-todo"
          label="Task"
          label-for="input-todo-content"
        >
          <b-form-input
            id="input-todo-content"
            v-model="todoValue"
            placeholder="Enter your task"
            :state="inputTodoState()"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback">
            Enter at least 3 letters
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Status">
          <b-form-select v-model="selected" :options="options" ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-description"
          label="Description"
          label-for="input-default"
        >
          <b-form-textarea
            id="input-default"
            placeholder="Enter task's description...."
            v-model="descriptionValue"
            :state="inputDescState()"
            aria-describedby="input-2-live-feedback"
          ></b-form-textarea>
          <b-form-invalid-feedback id="input-2-live-feedback">
            Enter maximum 100 letters
          </b-form-invalid-feedback>
        </b-form-group>

      </b-modal>
      <div>
        <b-form-checkbox
          v-model="checked"
          name="check-button"
          switch
          @change="changeBackground()"
          size="lg"
        >
          <p>Theme</p>
        </b-form-checkbox>
      </div>
    </div>
    <b-table
      :fields="fields"
      :items="items"
      :filter="changeSearchParams()"
      :filter-included-fields="changeSearchField()"
      :table-variant="background"
      :no-sort-reset="false"
      bordered
      table-class="w-50"
      class="taskTable"
      hover
      striped
      fixed
      thead-class="thead-primary"
    >
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: changeWidthCol(field.key) }"
        />
      </template>
      <template #head(todo)>
        <b-form-group
          label="Todo"
          label-for="filter-input"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
          style="text-align: center"
        >
          <b-input-group size="sm" class="">
            <b-form-input
              id="filter-input"
              v-model="todoSearch"
              type="search"
              placeholder="Type to Search"
              @focus="setIsTodoFilter()"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </template>
      <template #cell(todo)="data">
        <p
          @click="data.toggleDetails"
          :class="{ active: data.item.status2==='Done' }"
          class="todoContent"
          v-b-tooltip.hover
          title="Click to see details content"
        >
          {{ data.value }}
        </p>
      </template>
      <!-- <template #head(status)>
        <b-form-group
          label="Status"
          label-for="filter-input-status"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input-status"
              v-model="statusSearchInput"
              type="search"
              placeholder="Type to Search"
              @focus="setIsStatusFilter()"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </template> -->
      <!-- <template #cell(status)="data1">
        <b-button
          :variant="changeBgStatus(data1.item.status)"
          @click="onStatus(data1.index)"
          >{{ data1.value }}</b-button
        >
      </template> -->
      <template #head(status2)>
        <b-form-group
          label="Status2"
          label-for="filter-input"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
          style="text-align: center"
        >
          <b-input-group size="sm" class="">
            <b-form-input
              id="filter-input-status2"
              v-model="status2SearchInput"
              type="search"
              placeholder="Type to Search"
              @focus="setIsStatus2Filter()"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </template>
      <template #cell(status2)="data4">
        <p :style="{color:changeStatusState(data4.value)}">
          {{ data4.value }}
        </p>
      </template>
      <template #cell(edit)="data2">
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          @click="onEdit(data2.item, data2.index, $event.target)"
          class="delBtn"
          v-b-modal.modal-1
          v-tooltip.hover="'Click to edit this task!'"
        />
      </template>
      <template #cell(delete)="data3">
        <font-awesome-icon
          :icon="['fas', 'trash-can']"
          @click="onDelete(data3.index)"
          class="delBtn"
          v-tooltip.hover="'Click to delete this task!'"
        />
      </template>

      <template #row-details="row">
        <b-card style="color: black">
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Task:</b></b-col>
            <b-col>{{ row.item.todo }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
            <b-col>{{ row.item.description }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Status:</b></b-col>
            <b-col>{{row.item.status2 }}</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
    <small>*(Click non-sortable fields to cancel sorting)</small>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  head:{
    title:'Task List'
  },
  // asyncData(context){
  //   console.log(context)
  //   return new Promise((resolve, reject)=>{
  //     setTimeout(()=>{
  //       resolve({
  //         items:[
  //         { todo: "english", status: false, description: "hihi" },
  //         { todo: "math", status: true, description: "do it" },
  //         { todo: "physics", status: false, description: "physics desc" },
  //         ]
  //       })
  //     }, 1500)
  //     }).then((data)=>{
  //       return data
  //     }).catch((e)=>{
  //       console.log(e)
  //   })
  // },
  data() {
    return {
      // keyword:'',
      isSorted: false,
      checked: false,
      todoValue: "",
      descriptionValue: "",
      // isComplete: false,
      isModal: false,
      background: "light",
      // bgStatus: "",
      isValidTodo: null,
      isValidDes: null,
      todoSearch: null,
      // statusSearchInput: '',
      status2SearchInput:null,
      filterCol: ["todo"],
      isColFilter: false,
      curIndex: 0,
      selected: null,
      options:[
        {
          value: null,
          text: 'Choose status for your task'
        },
        {
          value: 'New',
          text: 'New'
        },
        {
          value: "Inprogress",
          text: "Inprogress"
        },
        {
          value: "Done",
          text: "Done"
        }
      ],
      fields: [
        {
          key: "todo",
          label: "Todo",
          formatter: "",
          sortable: true,
        },
        // {
        //   key: "status",
        //   label: "Status",
        //   formatter: (value) => {
        //     return value ? "Done" : "Incomplete";
        //   },
        //   sortable: true,
        // },
        {
          key: "status2",
          label: "Status2"
        },
        {
          // A regular column with custom formatter
          key: "edit",
          label: "Edit",
        },
        {
          key: "delete",
          label: "Delete",
        },
      ],
      items: [
        { todo: "english", status2: 'New', description: "hihi" },
        { todo: "math", status2: 'Inprogress', description: "do it" },
        { todo: "physics", status2: 'Done', description: "physics desc" },
      ],
    };
  },
  computed: {
    validInput() {
      return this.isValidDes && this.isValidTodo;
    },
    // dataArray(){
    //   const str='incomplete'
    //   const str2='done'
    //   console.log(this.statusSearchInput)
    //   if(str.includes(this.statusSearchInput.toLocaleLowerCase()) && str2.includes(this.statusSearchInput.toLocaleLowerCase())){
    //     return this.items
    //   }
    //   if(str.includes(this.statusSearchInput)&&this.statusSearchInput!==''){
    //     return this.items.filter(item=>item.status===false)
    //   }
    //   if(str2.includes(this.statusSearchInput)&&this.statusSearchInput !==''){
    //     return this.items.filter(item=>item.status===true)
    //   }
    //   if(!str.includes(this.statusSearchInput)||!str2.includes(this.statusSearchInput)){
    //     return []
    //   }
    //   if(this.statusSearchInput===''){
    //     return this.items
    //   }
    // },
  },
  methods: {
    onModal(ref) {
      if (ref === "modal1") {
        const data = {
          todo: this.todoValue,
          status2:this.selected,
          description: this.descriptionValue,
        };
        this.items = [...this.items, data];
        this.toast("b-toaster-top-center", "success");
      } else {
        this.updateTodo();
      }
      // console.log(ref);
    },
    // onStatus(index) {
    //   this.items[index].status = !this.items[index].status;
    // },
    // updateStatus: (state) => {
    //   return state ? "Done" : "Incomplete";
    // },
    onDelete(index) {
      this.items = this.items.filter((item, i) => {
        return i != index;
      });
    },
    resetInfoModal() {
      this.todoValue = "";
      this.descriptionValue = "";
      this.selected=null;
    },
    onEdit(item, index, button) {
      this.curIndex = index;
      this.todoValue = item.todo;
      this.descriptionValue = item.description;
      this.selected = item.status2;
      this.isModal = false;
      console.log("when click edit icon: ", this.isModal);
    },
    updateTodo() {
      this.items[this.curIndex].todo = this.todoValue;
      this.items[this.curIndex].description = this.descriptionValue;
      this.items[this.curIndex].status2 = this.selected;
      console.log("pluginnnnn: ", this.$toast);
      this.$toast.success("Edit successfully!");
    },
    changeBackground() {
      this.checked ? (this.background = "dark") : (this.background = "light");
    },
    changeWidthCol(key) {
      if (key === "todo") return "90px";
      if (key === "status2") return "60px"
      if (key === "delete" || key === "edit") return "20px";
    },
    toast(toaster, variant = null, append = false) {
      this.$bvToast.toast(`New task added successfully!`, {
        title: `Success`,
        toaster: toaster,
        solid: true,
        appendToast: append,
        variant: variant,
        autoHideDelay: 1000,
      });
    },
    changeBgStatus(statusState) {
      return statusState ? "success" : "danger";
    },
    inputTodoState() {
      // console.log(1, this.isValidTodo);
      if (this.todoValue.length === 0) return (this.isValidTodo = null);
      else if (this.todoValue.length < 3 || this.todoValue.length > 50)
        return (this.isValidTodo = false);
      else this.isValidTodo = true;
      return this.isValidTodo;
    },
    inputDescState() {
      if (this.descriptionValue.length == 0) return (this.isValidDes = null);
      if (this.descriptionValue.length > 150) return (this.isValidDes = false);
      else this.isValidDes = true;
      return this.isValidDes;
    },
    changeModal() {
      return this.isModal ? "modal1" : "modal2";
    },
    changeIsModalAdd() {
      this.isModal = true;
      console.log("when click add button", this.isModal);
    },
    onTodoSearch() {
      this.items = this.items.filter((item) => {
        return item.todo === this.todoSearch;
      });
    },
    changeSearchParams() {
      if (this.isColFilter) {
        return this.todoSearch;
      } else {
        console.log("this is statusSearchInput: ", this.status2SearchInput);
        return this.status2SearchInput;
      }
    },
    changeSearchField() {
      if (this.isColFilter) {
        this.filterCol[0] = "todo";
      } else {
        this.filterCol[0] = "status2";
      }
      return this.filterCol;
    },
    setIsStatus2Filter() {
      this.isColFilter = false;
    },
    setIsTodoFilter() {
      this.isColFilter = true;
    },
    changeStatusState(val){
      if(val==='Done'){
        return 'green'
      }
      if(val==='Inprogress'){
        return 'orange'
      }
      if(val==='New'){
        return 'red'
      }
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#homePage {
  text-align: center;

  .title {
    margin: 50px 0;
  }
  .control {
    width: 830px;
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    align-items: center;
    #modal-1 {
      margin-top: 100px;
    }
  }
  .taskTable {
    margin: auto;
    .todoContent {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .headTodoCol {
      display: flex;
      justify-content: space-around;
      .searchTodoInput {
        width: 200px;
      }
    }
  }
}

.delBtn:hover {
  cursor: pointer;
}

.thead-primary {
  background-color: rgba(39, 37, 37, 0.705);
  color: #ffffff;
}

</style>
