<template>
  <div id="homePage">
    <p>{{ $t('welcome') }}</p>

    <h1 class="title">Todo List</h1>
    <div class="control">
      <b-button
        v-b-modal.modal-1
        variant="success"
        @click="changeIsModalAdd"
        class="padding-btn"
        >Add</b-button
      >
      <b-modal
        id="modal-1"
        :ref="changeModal"
        :title="title"
        @ok="handleOk($event, changeModal)"
        @hidden="resetInfoModal"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            id="input-todo"
            label="Task"
            label-for="input-todo-content"
            :invalid-feedback="changeInvalidFeedback()"
            :state="isValidTodo"
          >
            <b-form-input
              id="input-todo-content"
              v-model.trim="todoValue"
              placeholder="Enter your task"
              :state="isValidTodo"
              @keydown="nameKeydown($event)"
              required
              @blur="inputTodoBlur()"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Status">
            <b-form-select
              v-model="selected"
              :options="options"
              required
              @change="inputStatusBlur()"
            >
            </b-form-select>
            <small v-show="isStatusState" style="color: red">{{
              changeInvalidFeedback()
            }}</small>
          </b-form-group>
          <b-form-group
            id="input-description"
            label="Description"
            label-for="input-default"
            :invalid-feedback="changeInvalidFeedback()"
            :state="isValidDes"
          >
            <b-form-textarea
              id="input-default"
              placeholder="Enter task's description...."
              v-model.trim="descriptionValue"
              :state="isValidDes"
              @input="descKeyDown($event)"
              @blur="inputDescBlur()"
              required
            ></b-form-textarea>
          </b-form-group>
        </form>
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
      :filter="changeSearchParams"
      :filter-included-fields="changeSearchField"
      :table-variant="background"
      :no-sort-reset="true"
      :no-provider-sorting="true"
      show-empty
      bordered
      table-class="w-50"
      class="taskTable"
      hover
      striped
      fixed
      thead-class="thead-primary"
      :busy="isBusy"
      v-click-outside="onClickOutside"
      :sort-by.sync="sortState"
    >
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: changeWidthCol(field.key) }"
        />
      </template>
      <template #empty="scope">
        <h5>{{ scope.emptyText }}</h5>
      </template>
      <template #emptyfiltered="scope">
        <h5>{{ scope.emptyFilteredText }}</h5>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #head(todo)>
        <b-form-group
          label="Todo"
          label-for="filter-input"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0 headTodo"
          style="text-align: center"
        >
          <b-input-group size="sm" class="">
            <b-form-input
              id="filter-input"
              v-model="todoSearch"
              type="search"
              placeholder="Type to Search"
              @focus="setIsTodoFilter('filter-input')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </template>
      <template #cell(todo)="data">
        <p
          @click="checkShowDetails(data.index, data.detailsShowing)"
          :class="{ active: data.item.status2 === 'Done' }"
          class="todoContent"
          v-b-tooltip.hover
          title="Click to see details content"
        >
          {{ data.value }}
        </p>
      </template>
      <template #head(status2)>
        <b-form-group
          label="Status"
          label-for="filter-status2"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
          style="text-align: center"
        >
          <b-input-group size="sm" class="">
            <b-form-input
              id="filter-status2"
              v-model="status2SearchInput"
              type="search"
              placeholder="Type to Search"
              @focus="setIsStatus2Filter('filter-status2')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </template>
      <template #cell(status2)="data4">
        <p :style="{ color: changeStatusState(data4.value) }">
          {{ data4.value }}
        </p>
      </template>
      <template #cell(edit)="data2">
        <div
          v-b-tooltip.hover
          title="Click to edit this task!"
          class="iconBtn"
          @click="onEdit(data2.item, data2.index, $event.target)"
          id="editBtn"
          v-b-modal.modal-1
        >
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </div>
      </template>
      <template #cell(delete)="data3">
        <div
          @click="DELETE_TASK(data3.index)"
          id="deleteBtn"
          class="iconBtn"
          v-tooltip.hover="'Click to delete this task!'"
        >
          <font-awesome-icon :icon="['fas', 'trash-can']" />
        </div>
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
            <b-col>{{ row.item.status2 }}</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
    <small>*(Click non-sortable fields to cancel sorting)</small>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "IndexPage",
  head: {
    title: "Task List",
  },
  data() {
    return {
      sortState: null,
      checkDuplicate: false,
      isBusy: true,
      indexRowDetail: 0,
      isStatusState: false,
      title: "",
      name: "",
      nameState: null,
      isSorted: false,
      checked: false,
      todoValue: "",
      descriptionValue: "",
      isModal: false,
      background: "light",
      isValidTodo: null,
      isValidDes: null,
      todoSearch: null,
      status2SearchInput: null,
      filterCol: ["todo"],
      isColFilter: false,
      curIndex: 0,
      selected: null,
      transProps: {
        // Transition name
        name: "flip-list",
      },
      options: [
        {
          value: null,
          text: "Choose status for your task",
        },
        {
          value: "New",
          text: "New",
        },
        {
          value: "Inprogress",
          text: "Inprogress",
        },
        {
          value: "Done",
          text: "Done",
        },
      ],
      fields: [
        {
          key: "todo",
          label: "Todo",
          formatter: "",
          sortable: true,
        },
        {
          key: "status2",
          label: "Status2",
          sortable: true,
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
    };
  },
  computed: {
    ...mapGetters(["items"]),
    changeSearchField() {
      if (this.isColFilter) {
        return ["todo"];
      } else {
        return ["status2"];
      }
    },
    changeSearchParams() {
      if (this.isColFilter) {
        return this.todoSearch;
      } else {
        console.log("this is statusSearchInput: ", this.status2SearchInput);
        return this.status2SearchInput;
      }
    },
    changeModal() {
      return this.isModal ? "modal1" : "modal2";
    },
  },
  mounted() {
    setTimeout(() => {
      this.items;
      this.isBusy = false;
    }, 1000);
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    ...mapMutations([
      "DELETE_TASK",
      "ADD_TASK",
      "EDIT_TASK",
      "CHECK_SHOW_ROW_DETAIL",
    ]),
    resetInfoModal() {
      this.todoValue = "";
      this.descriptionValue = "";
      this.selected = null;
      this.isValidDes = null;
      this.isValidTodo = null;
      this.isStatusState = false;
    },
    onEdit(item, index) {
      this.curIndex = index;
      this.todoValue = item.todo;
      this.descriptionValue = item.description;
      this.selected = item.status2;
      this.isModal = false;
      this.title = "Edit todo";
      console.log("when click edit icon: ", item);
    },
    changeBackground() {
      this.checked ? (this.background = "dark") : (this.background = "light");
    },
    changeWidthCol(key) {
      if (key === "todo") return "90px";
      if (key === "status2") return "60px";
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
    inputTodoState() {
      let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (this.todoValue.length === 0) this.isValidTodo = null;
      else if (
        this.todoValue.length < 3 ||
        this.todoValue.length > 20 ||
        format.test(this.todoValue)
      )
        this.isValidTodo = false;
      else this.isValidTodo = true;
    },
    inputTodoBlur() {
      this.inputTodoState();
      this.inputStatusState();
      this.inputDescState();
      if (this.isValidTodo) {
        this.checkDuplicateData();
        if (this.checkDuplicate) {
          this.isValidTodo = false;
          this.isValidDes = false;
          this.isStatusState = true;
        }
      }
    },
    inputStatusState() {
      if (this.selected == null) {
        this.isStatusState = true;
      } else {
        this.isStatusState = false;
      }
    },
    inputStatusBlur() {
      this.inputTodoState();
      this.inputStatusState();
      this.inputDescState();

      if (!this.isStatusState || this.selected == null) {
        this.checkDuplicateData();
        if (this.checkDuplicate) {
          this.isStatusState = true;
          this.isValidDes = false;
          this.isValidTodo = false;
        }
      }
    },
    inputDescState() {
      let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (this.descriptionValue.length === 0) this.isValidDes = null;
      else if (
        this.descriptionValue.length < 3 ||
        this.descriptionValue.length > 100 ||
        format.test(this.descriptionValue)
      )
        this.isValidDes = false;
      else this.isValidDes = true;
    },
    inputDescBlur() {
      this.inputTodoState();
      this.inputStatusState();
      this.inputDescState();
      if (this.isValidDes) {
        this.checkDuplicateData();
        if (this.checkDuplicate) {
          this.isValidDes = false;
          this.isValidTodo = false;
          this.isStatusState = true;
        }
      }
    },
    changeIsModalAdd() {
      this.isModal = true;
      this.title = "Add todo";
      console.log("when click add button", this.isModal);
    },
    setIsStatus2Filter() {

      this.isColFilter = false;

    },
    setIsTodoFilter() {
      this.isColFilter = true;
  
      // this.changeSearchField();
      // this.changeSearchParams();
      // if(inputID === 'filter-input'){
      //   this.isColFilter=true;
      // }else if(inputID ==='filter-status2'){
      //   this.isColFilter=false;
      // }
    },
    changeStatusState(val) {
      if (val === "Done") {
        return "green";
      }
      if (val === "Inprogress") {
        return "orange";
      }
      if (val === "New") {
        return "red";
      }
    },
    checkFormValidity() {
      console.log("Prinnttt: ", this.isValidTodo);
      const valid = this.$refs.form.checkValidity();
      this.isValidTodo = valid;
      this.isValidDes = valid;
      if (this.selected == null) this.isStatusState = true;
      else this.isStatusState = false;
      return valid && this.isValidDes && this.isValidTodo;
    },
    handleOk(bvModalEvent, ref) {
      let editButton = document.getElementById("editBtn");
      editButton.focus({ focusVisible: false });
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit(ref);
      console.log(bvModalEvent);
    },
    handleSubmit(ref) {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the new data row
      if (ref === "modal1") {
        const data = {
          todo: this.todoValue,
          status2: this.selected,
          description: this.descriptionValue,
          _showDetails: false,
        };
        this.$store.commit("ADD_TASK", data);
        this.toast("b-toaster-top-center", "success");
      } else {
        console.log(this);
        this.$store.commit({
          type: "EDIT_TASK",
          id: this.curIndex,
          task: this.todoValue,
          desc: this.descriptionValue,
          status: this.selected,
        });

        this.$toast.success("Edit successfully!");
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-1");
      });
    },
    nameKeydown(e) {
      if (this.todoValue.length === 0) this.isValidTodo = null;
    },
    descKeyDown(e) {
      if (this.descriptionValue.length === 0) this.isValidDes = null;
    },
    checkShowDetails(index, showDetailState) {
      this.$store.commit({
        type: "CHECK_SHOW_ROW_DETAIL",
        idRowCurrent: index,
        statusShowDetail: showDetailState,
      });
    },
    checkDuplicateData() {
      this.checkDuplicate = false;
      this.items.forEach((item) => {
        if (
          item.todo == this.todoValue &&
          item.status2 == this.selected &&
          item.description == this.descriptionValue
        ) {
          this.checkDuplicate = true;
        }
      });
    },
    changeInvalidFeedback(id) {
      if (this.checkDuplicate) return "Duplicate data, please check again!";
      else {
        if (id == "input-todo")
          return "Your task shouldn't have special key like @,/..., require content length about 3 to 20 letters";
        else if (id == "input-default")
          return "Description should not over 100 letter and contain special key (@, /, ....)";
        else return "Choose one status, please!";
      }
    },
    onClickOutside() {
      this.sortState = null;
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
    .headTodoCol {
      display: flex;
      justify-content: space-around;
      .searchTodoInput {
        width: 200px;
      }
    }
  }
}
.iconBtn:hover {
  cursor: pointer;
}
#editBtn {
  &:focus {
    outline: none;
  }
}

.thead-primary {
  background-color: rgba(39, 37, 37, 0.705);
  color: #ffffff;
}
</style>
