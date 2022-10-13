// mongoDB server ma install hoga ya clint js ma
//error status 500

const API_KEY = "https://gray-exuberant-nightingale.cyclic.app";

const addItem = (e) => {
  e.preventDefault();
  const toDoItem = document.querySelector("#toDoItem").value;
  toDoItem.trim();
  if (toDoItem.length > 30) {
    alert("string can't be greater then 30");
    return;
  }
  if (toDoItem === "") return;
  //   console.log(toDoItem1);
  axios
    .post(`${API_KEY}/todo`, {
      text: toDoItem,
    })
    .then((response) => {
      console.log(response.data.message);
      refreshList();
      // document.querySelector("#messagesss").innerHTML = response.data.message;
      // setTimeout(() => {
      //   document.querySelector("#messagesss").innerHTML = "";
      // }, 2000);
      // document.querySelector("#todoList").innerHTML += "";
      // response.data.data.map((eachToDo) => {
      //   document.querySelector("#todoList").innerHTML += eachToDo;
      //   document.querySelector("#todoList").innerHTML += "<br>";
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

const refreshList = () => {
  axios
    .get(`${API_KEY}/todos`)
    .then((response) => {
      console.log(response.data);

      document.querySelector("#todoList").innerHTML = "";
      response.data.data.map((eachToDo) => {
        document.querySelector("#todoList").innerHTML += eachToDo.text;
        document.querySelector("#todoList").innerHTML += "<br>";
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
refreshList();

const deleteToDoList = () => {};

// setInterval(refreshList, 6000);
// const myGetDataFunction = async () => {
//   await fetch(
//     `https://api.weatherapi.com/v1/current.json?key=25175e31b7074cfc895204529222906&q=${city}`
//   )
//     .then((response) => response.json())
//     .then((json) => {
//       console.log(json);
//       // document.querySelector('#userName').innerHTML = `My name is ${json?.name}`
//     })
//     .catch((reject) => console.log(reject));
// };
