function deleteTodo(Id) {
  fetch(
    "https://b1b0b3f3-faa4-454b-a667-61ea23795eed-00-29d1h5nj763ss.riker.replit.dev/todos/" +
      Id,
    {
      method: "DELETE",
    }
  ).then((response) => {
    if (response.ok) {
      let todo = document.getElementById(Id);
      if (todo) {
        todo.remove();
      }
    } else {
      alert("Could Not Delete");
    }
  });
}

function deleteWrapperFunction(Id) {
  return () => {
    deleteTodo(Id);
  };
}

function getTodos() {
  fetch(
    "https://b1b0b3f3-faa4-454b-a667-61ea23795eed-00-29d1h5nj763ss.riker.replit.dev/todos",
    {
      method: "GET",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      list.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        const listItem = document.createElement("li");

        let grandChild1 = document.createElement("span");
        grandChild1.innerHTML = data[i]["title"];

        let grandChild2 = document.createElement("span");
        grandChild2.innerHTML = data[i]["description"];

        let grandChild3 = document.createElement("button");
        grandChild3.innerHTML = "Delete";
        grandChild3.addEventListener(
          "click",
          deleteWrapperFunction(data[i]["Id"])
        );

        listItem.appendChild(grandChild1);
        listItem.appendChild(grandChild2);
        listItem.appendChild(grandChild3);
        listItem.setAttribute("Id", (data[i]["Id"]));

        list.appendChild(listItem);
      }
    });
}

let sendbutton = document.getElementById("sendButton");
let GetButton = document.getElementById("GetButton");
let list = document.getElementById("list");
GetButton.addEventListener("click", getTodos);

sendbutton.addEventListener("click", function (event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();
  console.log("inside sendTodo function");

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  // Create a body object with title and description
  let body = {
    title: title,
    description: description,
  };

  // Use JSON.stringify to convert body to a JSON string
  fetch(
    "https://b1b0b3f3-faa4-454b-a667-61ea23795eed-00-29d1h5nj763ss.riker.replit.dev/todos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((response) => {
      if (response.ok) {
        // Handle successful response
        console.log("Todo sent successfully!");
        return response.json();
      } else {
        throw new Error("Request failed: " + response.statusText);
      }
    })
    .then((data) => {
      // Do something with the response data
      console.log("Response data:", data);
      const listItem = document.createElement("li");
      let grandChild1 = document.createElement("span");
      grandChild1.innerHTML = body["title"];
      console.log("this is data: " + data["Id"]);
      console.log("this is body: " + body["title"]);

      let grandChild2 = document.createElement("span");
      grandChild2.innerHTML = body["description"];

      let grandChild3 = document.createElement("button");
      grandChild3.innerHTML = "Delete";
      grandChild3.addEventListener("click", deleteWrapperFunction(data["Id"]));

      listItem.appendChild(grandChild1);
      listItem.appendChild(grandChild2);
      listItem.appendChild(grandChild3);
      listItem.setAttribute("Id", (data["Id"]));
      list.appendChild(listItem);
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
});
