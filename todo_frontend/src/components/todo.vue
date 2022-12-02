//<template>
  <div>
    <section class="vh-100" style="background-color: #eee">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-9 col-xl-7">
            <div class="card rounded-3">
              <div class="card-body p-4">
                <h4 class="text-center my-3 pb-3">Todo list</h4>

                <form
                  class="
                    row row-cols-lg-auto
                    g-3
                    justify-content-center
                    align-items-center
                    mb-4
                    pb-2
                  "
                >
                  <div class="col-12">
                    <div v-if="!isEditing" class="form-outline">
                      <input
                        type="text"
                        id="form1"
                        class="form-control"
                        v-model="todo"
                      />

                      <input type="date" v-model="date" />
                      <input type="time" v-model="time" />
                    </div>

                    <div v-else class="form-outline">
                      <input
                        type="text"
                        id="form1"
                        class="form-control"
                        v-model="newTodo"
                      />
                      <input type="date" v-model="newDate" />
                      <input type="time" v-model="newTime" />
                    </div>
                  </div>

                  <div class="col-12">
                    <button
                      v-if="!isEditing"
                      v-on:click="add(date, time, todo)"
                      type="submit"
                      class="btn btn-primary"
                    >
                      Add
                    </button>
                    <button
                      v-else
                      v-on:click="
                        save(newDate, newTime, newTodo, SelectedIndex)
                      "
                      type="submit"
                      class="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </form>

                <table class="table mb-4">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Task</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in pdata" :key="index" >
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ item.todo }}</td>
                      <td>{{ item.date }}</td>
                      <td>{{ item.time }}</td>
                      <td>
                        <button
                          type="submit"
                          class="btn btn-danger"
                          v-on:click="dele(item)"
                        >
                          Finish
                        </button>
                        <button
                          type="submit"
                          class="btn btn-success ms-1"
                          v-on:click="edit(item)"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
//import axios
import axios from "axios";

export default {
  //mounting the component
  async mounted() {
    console.log("mounted");
    let apiURL = "http://localhost:5000/todo";
    const response = axios.get(apiURL);
    this.todos = JSON.stringify((await response).data);
    this.pdata = JSON.parse(this.todos);

    console.info(this.pet);
  },
  data: () => ({
    time: "",
    date: "",
    todo: "",
    todos: [],
    pdata: [],
    isEditing: false,
    updated: "",
    SelectedIndex: "",
    newTodo: "",
    newDate: "",
    newTime: "",
  }),
  //create method add

  methods: {
    add(date, time, todo) {
      if (this.todo.length <= 0) {
        alert("too short");
      } else {
        //send data to mongodb by axios
        let apiURL = "http://localhost:5000/todo/posts";
        axios.post(apiURL, { date, todo, time }).then((response) => {
          console.log(response);
          console.log(response.data);
        });
      }
    },

    dele(item) {
      let apiURL = "http://localhost:5000/todo/posts/" + item._id;
      axios.delete(apiURL, { data: { _id: item._id } }).then((response) => {
        console.log(response);
        console.log(response.data);
      });
      location.reload();
    },
    edit(item) {
      console.log("editing");
      this.isEditing = true;
      this.newTodo = item.todo;
      this.newDate = item.date;
      this.newTime = item.time;
      this.SelectedIndex = item._id;
      // this.isEditing = true;
      // this.newTodo = item.todo;
    },
    save(newDate, newTime, newTodo, SelectedIndex) {
      //editing by axios

      let apiURL = "http://localhost:5000/todo/update/" + SelectedIndex;
      axios.patch(apiURL, { date : newDate, time :newTime, todo: newTodo }).then((response) => {
        console.log(response.data);
      });
    
      window.alert('edited');
      this.isEditing = false;
    },
  },
};
</script>

<style>
</style>