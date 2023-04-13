<template>
  <div>
    <p v-if="isloading">Loading....</p>

    <div id="homePage" v-else>
      <h1 class="title">{{ $t("title.task-list") }}</h1>
      <div class="control">
        <b-button
          v-b-modal.modal-1
          variant="success"
          @click="changeIsModalAdd"
          class="padding-btn"
          >{{ $t("action.add-btn.label") }}</b-button
        >

        <b-modal
          id="modal-1"
          :ref="changeModal"
          :title="title"
          @ok="handleOk($event, changeModal)"
          @hidden="resetInfoModal"
          :cancel-title="$t('action.cancel-btn.label')"
          :ok-title="$t('action.ok-btn.label')"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <!-- <pre>{{ $v?.todoValue }}</pre> -->
            <div class="input-block">
              <label class="input_label">{{
                $t("field-tasklist.todo.label")
              }}</label>
              <input
                class="input_field"
                v-model.trim.lazy="$v.todoValue.$model"
                @blur="checkDuplicateData()"
                :placeholder="$t('field-tasklist.todo.placeholder')"
              />
            </div>
            <small
              class="error"
              v-if="!$v.todoValue.required && $v.todoValue.$error"
              >{{ $t("messages.error.required") }}</small
            >
            <small class="error" v-if="!$v.todoValue.minLength">{{
              $t("messages.error.minLength")
            }}</small>
            <small class="error" v-if="!$v.todoValue.maxLength">{{
              $t("messages.error.maxLength")
            }}</small>
            <small class="error" v-if="!$v.todoValue.format">{{
              $t("messages.error.special-characters")
            }}</small>
            <!-- <pre>{{ $v.descriptionValue }}</pre> -->

            <div class="input-block">
              <label class="input-label">{{
                $t("field-tasklist.description.label")
              }}</label>
              <textarea
                class="input-field"
                v-model.trim.lazy="$v.descriptionValue.$model"
                @blur="checkDuplicateData()"
                :placeholder="$t('field-tasklist.description.placeholder')"
              ></textarea>
            </div>

            <small
              class="error"
              v-if="!$v.descriptionValue.required && $v.descriptionValue.$error"
              >{{ $t("messages.error.required") }}</small
            >
            <small class="error" v-if="!$v.descriptionValue.minLength">{{
              $t("messages.error.minLength")
            }}</small>
            <small class="error" v-if="!$v.descriptionValue.maxLength">{{
              $t("messages.error.maxLength")
            }}</small>
            <small class="error" v-if="!$v.descriptionValue.format">{{
              $t("messages.error.special-characters")
            }}</small>
            <!-- <pre>{{ $v.selected }}</pre> -->

            <div
              class="input-block"
              :class="{ 'form-group--error': $v.selected.$error }"
            >
              <label class="input-label">{{
                $t("field-tasklist.status.label")
              }}</label>
              <select
                v-model.lazy="$v.selected.$model"
                @change="checkDuplicateData()"
              >
                <option value="New">
                  {{ $t("field-tasklist.status.value.new") }}
                </option>
                <option value="Inprogress">
                  {{ $t("field-tasklist.status.value.inprogress") }}
                </option>
                <option value="Done">
                  {{ $t("field-tasklist.status.value.done") }}
                </option>
              </select>
            </div>
          </form>
          <small class="error" v-if="ischeckDuplicate">{{
            $t("messages.error.duplicated")
          }}</small>
        </b-modal>
        <div>
          <b-form-checkbox
            v-model="checked"
            name="check-button"
            switch
            size="lg"
          >
            <p>{{ $t("title.feature.theme") }}</p>
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
        :current-page="currentPage"
        :per-page="perPage"
        show-empty
        bordered
        table-class="w-50"
        id="taskTable"
        hover
        striped
        fixed
        thead-class="thead-primary"
        :busy="isBusy"
        v-click-outside="onClickOutside"
        :sort-by.sync="sortState"
        :sort-desc.sync="sortDesc"
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
            :label="$t('field-tasklist.todo.label')"
            label-for="filter-input"
            label-cols-sm="3"
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
                :placeholder="$t('field-tasklist.todo.sort-placeholder')"
                @focus="setIsTodoFilter()"
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
            :title="$t('action.hover.see-detail')"
          >
            {{ data.value }}
          </p>
        </template>
        <template #head(status2)>
          <b-form-group
            :label="$t('field-tasklist.status.label')"
            label-for="filter-input"
            label-cols-sm="4"
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
                :placeholder="$t('field-tasklist.status.sort-placeholder')"
                @focus="setIsStatus2Filter()"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </template>
        <template #cell(status2)="data4">
          <p :style="{ color: changeStatusState(data4.value) }">
            {{ translateStatusField(data4.value) }}
          </p>
        </template>
        <template #head(edit)>{{ $t("field-tasklist.edit.label") }}</template>
        <template #cell(edit)="data2">
          <div
            v-b-tooltip.hover
            :title="$t('action.hover.edit-btn')"
            class="iconBtn"
            @click="onEdit(data2.item, data2.index, $event.target)"
            id="editBtn"
            v-b-modal.modal-1
          >
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </div>
        </template>
        <template #head(delete)>{{
          $t("field-tasklist.delete.label")
        }}</template>
        <template #cell(delete)="data3">
          <div
            @click="deleteTask(data3.item.id)"
            id="deleteBtn"
            class="iconBtn"
            v-tooltip.hover="$t('action.hover.delete-btn')"
          >
            <font-awesome-icon :icon="['fas', 'trash-can']" />
          </div>
        </template>

        <template #row-details="row">
          <b-card style="color: black">
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>{{ $t("field-tasklist.todo.label") }}:</b></b-col
              >
              <b-col>{{ row.item.todo }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>{{ $t("field-tasklist.description.label") }}:</b></b-col
              >
              <b-col>{{ row.item.description }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>{{ $t("field-tasklist.status.label") }}:</b></b-col
              >
              <b-col>{{ row.item.status2 }}</b-col>
            </b-row>
            <b-button size="sm" @click="row.toggleDetails">{{
              $t("action.hide-detail.tool-tip")
            }}</b-button>
          </b-card>
        </template>
      </b-table>
      <b-pagination 
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="taskTable"
        class="pagination mt-4"
        align="center"
        small
      >
    </b-pagination>
    <p>Current Page: {{ currentPage }}</p>
    <p>Total rows: {{ rows }}</p>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { v4 as uuidv4 } from "uuid";
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import {
  required,
  minLength,
  maxLength,
  helpers,
} from "vuelidate/lib/validators";
const format = helpers.regex(
  "format",
  /^(?=.{0,}$)[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9]+(?:\s[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9]+)*$/
);
export default {
  name: "IndexPage",
  head: {
    title: "Task List",
  },

  data() {
    return {
      // isloading: true,
      perPage: 5,
      currentPage: 1,
      sortDesc: false,
      sortState: null,
      ischeckDuplicate: false,
      isBusy: true,
      indexRowDetail: 0,
      title: "",
      isSorted: false,
      checked: false,
      todoValue: "",
      descriptionValue: "",
      isModal: false,
      background: "light",
      todoSearch: null,
      status2SearchInput: null,
      isColFilter: false,
      curIndex: 0,
      selected: "New",
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

  directives: {
    clickOutside: vClickOutside.directive,
  },

  validations: {
    descriptionValue: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(100),
      format,
    },
    selected: {
      required,
    },
    todoValue: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(25),
      format,
    },
  },

  computed: {
    ...mapState(["isloading"]),
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
    rows(){
      return this.items.length
    }
  },
  watch: {
    todoValue() {
      console.log("change: ", this.$v.todoValue.$error);
      console.log("change: ", this.$v.descriptionValue.$error);
      console.log("change: ", this.$v.selected.$error);
    },
    checked() {
      this.checked ? (this.background = "dark") : (this.background = "light");
    },
    sortDesc() {
      this.sortDesc ? console.log("Descending") : console.log("Ascending");
    },
    sortState() {
      console.log(this.sortState);
    },
  },

  methods: {
    ...mapMutations(["SORT_ITEMS_DESCENDING", "SORT_ITEMS_ASCENDING"]),
    ...mapActions(["getTodos", "addTask", "deleteTask", "editTask"]),
    handler() {
      console.log("asdasds");
      this.todoValue = "";
    },
    resetInfoModal() {
      this.todoValue = "";
      this.descriptionValue = "";
      this.selected = "New";
      this.$v.$reset();
    },
    onEdit(item, index) {
      this.curIndex = index;
      this.todoValue = item.todo;
      this.descriptionValue = item.description;
      this.selected = item.status2;
      this.isModal = false;
      this.title = this.$t("title.modal.edit");
      console.log("when click edit icon: ", item);
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

    changeIsModalAdd() {
      this.isModal = true;
      this.title = this.$t("title.modal.add");
    },
    setIsStatus2Filter() {
      this.isColFilter = false;
    },
    setIsTodoFilter() {
      this.isColFilter = true;
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
    handleOk(bvModalEvent, ref) {
      // Prevent modal from closing
      // Trigger submit handler
      this.$v.$touch();
      this.checkDuplicateData();
      this.handleSubmit(ref);
      bvModalEvent.preventDefault();
      console.log(bvModalEvent);
    },
    handleSubmit(ref) {
      // Exit when the form isn't valid
      if (
        this.$v.todoValue.$error ||
        this.$v.descriptionValue.$error ||
        this.$v.selected.$error ||
        this.ischeckDuplicate
      ) {
        return;
      }
      // Push the new data row
      if (ref === "modal1") {
        const data = {
          id: uuidv4(),
          todo: this.todoValue,
          status2: this.selected,
          description: this.descriptionValue,
          _showDetails: false,
        };
        this.addTask(data);
        this.toast("b-toaster-top-center", "success");
      } else {
        console.log(this);
        this.editTask({
          index: this.curIndex,
          item: {
            id: this.items[this.curIndex].id,
            todo: this.todoValue,
            status2: this.selected,
            description: this.descriptionValue,
            _showDetails: this.items[this.curIndex]._showDetails,
          },
        });
        this.$toast.success("Edit successfully!");
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-1");
      });
    },
    checkShowDetails(index, showDetailState) {
      console.log("in check detail: ", this.items);
      this.items[this.indexRowDetail]._showDetails = false;
      this.sortDesc
        ? this.SORT_ITEMS_DESCENDING(this.sortState)
        : this.SORT_ITEMS_ASCENDING(this.sortState);
      console.log("in check detail after: ", this.items);
      this.indexRowDetail = index + this.perPage*(this.currentPage-1);
      console.log('this index', index)
      if (showDetailState) {
        this.items[index + this.perPage*(this.currentPage-1)]._showDetails = false;
      } else {
        this.items[index + this.perPage*(this.currentPage-1)]._showDetails = true;
      }
    },
    checkDuplicateData() {
      this.ischeckDuplicate = false;
      this.items.forEach((item) => {
        if (
          item.todo == this.todoValue &&
          item.status2 == this.selected &&
          item.description == this.descriptionValue
        ) {
          this.ischeckDuplicate = true;
        }
      });
    },
    onClickOutside() {
      this.sortState = null;
    },
    translateStatusField(val) {
      if (val === "New") return this.$t("field-tasklist.status.value.new");
      if (val === "Inprogress")
        return this.$t("field-tasklist.status.value.inprogress");
      if (val === "Done") return this.$t("field-tasklist.status.value.done");
    },
  },
  beforeCreate() {
    console.log("beforeCreate", this.isBusy);
    setTimeout(() => {
      this.$store.commit("SET_LOADING", false);
    }, 1);
  },
  created() {
    console.log("created", this.isBusy);
    this.getTodos();
  },
  beforeMount() {
    // if(this.items.length==0)
    //   this.isBusy = true
    console.log('before mount',this.items.length, this.isBusy)
  },
  mounted() {
    console.log('mount',this.items.length, this.isBusy)
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate", this.items.length, this.isBusy);
  },
  updated() {
    this.isBusy = false
    // this.isBusy = true;
    console.log("updated", this.isBusy);
    // this.isBusy = false;
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    // this.isloading = true
  },
  destroyed() {
    console.log("destroyed");
    // this.isloading = false
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

  #taskTable {
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
  .pagination{
    // margin-top: 30px;
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
.input-block{
  display: flex;
  flex-direction: column;
}
</style>
