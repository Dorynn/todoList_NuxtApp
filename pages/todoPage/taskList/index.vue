<template>
  <div id="homePage">
    <h1 class="title">Todo List</h1>
    <div class="control">
      <b-button v-b-modal.modal-1 variant="success">Add</b-button>
      <b-modal
        id="modal-1"
        ref="modal1"
        title="Add task"
        @ok="onAdd('modal1')"
        @hide="resetInfoModal"
        :ok-disabled="!validInput"
      >
        <p>Task</p>
        <b-form-input
          v-model="todoValue"
          placeholder="Enter your task"
        ></b-form-input>
        <p>Description</p>
        <b-form-textarea
          id="textarea-default"
          placeholder="Enter task's description...."
          v-model="descriptionValue"
        ></b-form-textarea>
      </b-modal>
      <b-form-checkbox
        v-model="checked"
        name="check-button"
        switch
        @change="changeBackground"
        size="lg"
      >
        <p>Theme</p>
      </b-form-checkbox>
    </div>
    <b-table
      :fields="fields"
      :items="items"
      bordered
      table-class="w-50"
      class="taskTable"
      :table-variant="background"
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
      <template #cell(todo)="data">
        <p
          @click="data.toggleDetails"
          :class="{ active: data.item.status }"
          class="todoContent"
          v-b-tooltip.hover
          title="Click to see details content"
        >
          {{ data.value }}
        </p>
      </template>
      <template #cell(status)="data1">
        <b-button
          :variant="changeBgStatus(data1.item.status)"
          @click="onStatus(data1.index)"
          >{{ data1.value }}</b-button
        >
      </template>
      <template #cell(edit)="data2">
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          @click="onEdit(data2.item, data2.index, $event.target)"
          class="delBtn"
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
            <b-col>{{ updateStatus(row.item.status) }}</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      @hide="resetInfoModal"
      :ok-disabled="!validInput"
      @ok="updateTodo"
    >
      <p>Task</p>
      <b-form-input
        v-model="todoValue"
        placeholder="Enter your task"
      ></b-form-input>
      <p>Description</p>
      <b-form-textarea
        id="textarea-default"
        placeholder="Enter task's description...."
        v-model="descriptionValue"
        @input="updateDescription(descriptionValue)"
        >this is text temp</b-form-textarea
      >
    </b-modal>
  </div>
</template>

<script>
// import headerDefault from '~/components/headerDefault.vue';
export default {
  // components: { headerDefault },
  name: "IndexPage",
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
      checked: false,
      todoValue: "",
      descriptionValue: "",
      isComplete: false,
      background: "",
      bgStatus: "",
      isValidTodo: null,
      isValidDes: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      curIndex: 0,
      fields: [
        {
          key: "todo",
          label: "Todo",
          formatter: "",
        },
        {
          key: "status",
          label: "Status",
          formatter: (value) => {
            return value ? "Done" : "Incomplete";
          },
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
        { todo: "english", status: false, description: "hihi" },
        { todo: "math", status: true, description: "do it" },
        { todo: "physics", status: false, description: "physics desc" },
      ],
    };
  },
  computed: {
    // inputTodoState() {
    //   console.log(1, this.isValidTodo);
    //   if (this.todoValue.length === 0) this.isValidTodo = null;
    //   else if (this.todoValue.length < 3 || this.todoValue.length > 50)
    //     this.isValidTodo = false;
    //   else this.isValidTodo = true;
    //   return this.isValidTodo;
    // },
    // inputDescState() {
    //   if (this.descriptionValue.length == 0) this.isValidDes = null;
    //   else if (this.descriptionValue.length > 150) this.isValidDes = false;
    //   else this.isValidDes = true;
    //   return this.isValidDes;
    // },
    validInput() {
      return this.isValidDes && this.isValidTodo;
    },
  },
  methods: {
    onAdd() {
      const data = {
        todo: this.todoValue,
        status: false,
        description: this.descriptionValue,
      };
      this.items = [...this.items, data];
      this.toast("b-toaster-top-center", "success");
    },
    onStatus(index) {
      this.items[index].status = !this.items[index].status;
    },
    updateStatus: (state) => {
      return state ? "Done" : "Incomplete";
    },
    onDelete(index) {
      this.items = this.items.filter((item, i) => {
        return i != index;
      });
    },
    resetInfoModal() {
      this.todoValue = "";
      this.descriptionValue = "";
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onEdit(item, index, button) {
      this.infoModal.title = `Edit task:`;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.curIndex = index;
      this.todoValue = item.todo;
      this.descriptionValue = item.description;
    },
    updateTodo() {
      this.items[this.curIndex].todo = this.todoValue;
      console.log("pluginnnnn: ", this.$toast);
      this.$toast.success("Edit successfully!");
    },

    updateDescription() {
      this.items[this.curIndex].description = this.descriptionValue;
    },
    changeBackground() {
      this.checked ? (this.background = "dark") : (this.background = "light");
    },
    changeWidthCol(key) {
      if (key === "todo") return "120px";
      if (key === "status") return "50px";
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
  }
}

.delBtn:hover {
  cursor: pointer;
}

.active {
  color: #aaa;
  text-decoration: line-through;
}

.thead-primary {
  background-color: rgb(39, 37, 37);
  color: #ffffff;
}
</style>
