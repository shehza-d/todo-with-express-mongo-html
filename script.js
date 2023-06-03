// mongoDB server ma install hoga ya clint js ma
//error status 500

const API = "https://gray-exuberant-nightingale.cyclic.app";
// const API = "http://localhost:3002";

//getting time function
(() => {
  const dateTimeDiv = document.querySelector("#dateDiv");
  const dateDiv = document.createElement("div");
  const time = document.createElement("div");
  let tim = moment().format("h:mm:s a");
  dateDiv.appendChild(
    document.createTextNode(`${moment().format("D MMM YYYY")}`)
  );
  time.appendChild(document.createTextNode(`${tim}`));
  dateTimeDiv.appendChild(dateDiv);
  dateTimeDiv.appendChild(time);
})();

//
const addItem = (e) => {
  e.preventDefault();
  let toDoItem = document.querySelector("#toDoItem").value;
  toDoItem.trim();
  if (toDoItem.length > 30) {
    alert("string can't be greater then 30");
    return;
  }
  if (!toDoItem) return;
  document.querySelector("#todoList").innerHTML += toDoItem;
  document.querySelector("#todoList").innerHTML += "<br>";

  axios
    .post(`${API}/todo`, {
      text: toDoItem,
    })
    .then((response) => {
      document.querySelector("#toDoItem").value = "";
      console.log(response.data.message);
      refreshList();
    })
    .catch((err) => {
      console.log(err);
    });
};

const refreshList = () => {
  axios
    .get(`${API}/todos`)
    .then((response) => {
      console.log(response.data);

      document.querySelector("#todoList").innerHTML = "";
      response.data.data.map((eachToDo) => {
        document.querySelector(
          "#todoList"
        ).innerHTML += `<li>${eachToDo.text} &nbsp;<button onclick="deleteTodo('${eachToDo._id}')">Delete<button/>&nbsp;<button onclick="editTodo('${eachToDo._id}')">Edit<button/> </li>`;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
refreshList();

const deleteToDoList = () => {
  alert("Are You sure you want to Delete all todos?");
  axios
    .delete(`${API}/todos`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTodo = async (id) => {
  try {
    let response = await axios.delete(`${API}/todo/${id}`);

    console.log(response.data.message);

    refreshList();
  } catch (err) {
    console.log(`error`, err);
  }
};

const editTodo = async (id) => {
  let newValue = prompt("ests");
  try {
    console.log(id);

    let response = await axios.put(`${API}/todo/${id}`, {
      text: newValue,
    });

    console.log(response.data.message);

    refreshList();
  } catch (err) {
    console.log(`error`, err);
  }
};
