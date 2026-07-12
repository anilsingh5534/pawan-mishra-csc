import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const table = document.getElementById("tableData");

async function loadData() {
  table.innerHTML = "";

let total = 0;
let pending = 0;
let completed = 0;

const querySnapshot = await getDocs(collection(db, "bookings"));

  const search = document.getElementById("searchBox").value.toLowerCase();
  querySnapshot.forEach((document) => {
    const data = document.data();
    total++;

if(data.status === "Pending"){
    pending++;
}else if(data.status === "Completed"){
    completed++;
}
    if (
  !data.name.toLowerCase().includes(search) &&
  !data.mobile.includes(search)
) {
  return;
}

table.innerHTML += `
<tr>
<td>${data.name}</td>
<td>${data.mobile}</td>
<td>${data.service}</td>
<td>${data.address}</td>
<td>${data.message}</td>
<td>${data.status}</td>

<td>
${
  data.documentURL
    ? `<a href="${data.documentURL}" target="_blank">
         <button>View Document</button>
       </a><br><br>`
    : ""
}

<button onclick="completeBooking('${document.id}')">
Complete
</button>

<br><br>

<button onclick="deleteBooking('${document.id}')">
Delete
</button>
</td>
</tr>
`;
  });
  document.getElementById("total").innerText = total;
document.getElementById("pending").innerText = pending;
document.getElementById("completed").innerText = completed;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadData();
    } else {
        alert("Please login first!");
        window.location.replace("login.html");
    }
});

window.deleteBooking = async function(id) {

  if(confirm("Delete this request?")){

    await deleteDoc(doc(db, "bookings", id));

    alert("Request Deleted");

    loadData();

  }

}

window.completeBooking = async function(id) {

  await updateDoc(doc(db, "bookings", id), {
    status: "Completed"
  });

  alert("Status Updated");

  loadData();

};
document.getElementById("logoutBtn").addEventListener("click", async () => {

    await signOut(auth);

    alert("Logged Out Successfully");

    window.location.replace("login.html");

});