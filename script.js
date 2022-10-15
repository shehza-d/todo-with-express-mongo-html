// mongoDB server ma install hoga ya clint js ma
//error status 500

//most optimize date funtion
// (() => {
// 	document.querySelector("#date").textContent = `${moment().format("D MMM YYYY")}`;
// 	let time= moment().format("h:mm:s a")
// 	const timeDiv = document.querySelector("#time").textContent =  time;		
// 	setInterval(() => {
// 		 time = moment().format("h:mm:s a");
// 		 timeDiv =   time;		
// 	}, 1000);
//   })();



const API = "https://gray-exuberant-nightingale.cyclic.app";

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
  const toDoItem = document.querySelector("#toDoItem").value;
  toDoItem.trim();
  if (toDoItem.length > 30) {
    alert("string can't be greater then 30");
    return;
  }
  // if(!toDoItem) console.log(`emty str`)
  if (toDoItem === "") return;
  document.querySelector("#todoList").innerHTML += toDoItem;
  document.querySelector("#todoList").innerHTML += "<br>";

  axios
    .post(`${API}/todo`, {
      text: toDoItem,
    })
    .then((response) => {
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
        ).innerHTML += `<li>${eachToDo.text}</li>`;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
refreshList();
// setInterval(getAllTodos, 5000);//this is not recommanded (use socket.io for realtime apps )

const deleteToDoList = () => {
  alert("Are You sure you want to Delete all todos?");
  axios
    .delete(`${API}/todos`)
    .then((response) => {
      console.log(response.data);

      // document.querySelector("#todoList").innerHTML = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

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
