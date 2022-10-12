// const listItems = [];

const addItem = (e) => {
  e.preventDefault();

  const toDoItem = document.querySelector("#toDoItem").value;
  //   console.log(toDoItem1);
  //   listItems.push(toDoItem1);
  //   console.log(listItems);
  axios
    .post(`https://quaint-scrubs-cow.cyclic.app/todo`, {
      text: toDoItem,
    })
    .then((response) => {
      console.log(response.data);

      document.querySelector("#todoList").innerHTML += "";
      response.data.data.map((eachToDo) => {
        document.querySelector("#todoList").innerHTML += eachToDo;
        document.querySelector("#todoList").innerHTML += "<br>";
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// addItem();



const refresh= ()=>{
    axios
    .get(`https://quaint-scrubs-cow.cyclic.app/todos`)
    .then((response) => {
        console.log(response.data);
        
        document.querySelector("#todoList").innerHTML += "";
        response.data.data.map((eachToDo) => {
            document.querySelector("#todoList").innerHTML += eachToDo;
            document.querySelector("#todoList").innerHTML += "<br>";
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

 






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
