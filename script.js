import { db, storage } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
document.getElementById("bookingForm").addEventListener("submit", async function(e){

    e.preventDefault();

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let address = document.getElementById("address").value;
    let service = document.getElementById("service").value;
    let message = document.getElementById("message").value;
    let file = document.getElementById("document").files[0];

    let text =
`*New CSC Service Request*

👤 Name: ${name}
📱 Mobile: ${mobile}
📍 Address: ${address}
📄 Service: ${service}
📝 Message: ${message}`;

    let url = "https://wa.me/918802273585?text=" + encodeURIComponent(text);
   try {let fileURL = "";

if(file){

  const storageRef = ref(storage, "documents/" + Date.now() + "_" + file.name);

  await uploadBytes(storageRef, file);

  fileURL = await getDownloadURL(storageRef);

}
  await addDoc(collection(db, "bookings"), {
    name: name,
    mobile: mobile,
    address: address,
    service: service,
    message: message,
    status: "Pending",
    documentURL: fileURL,
    time: new Date()
  });

  alert("Request Firebase me save ho gayi!");
  window.open(url, "_blank");
  document.getElementById("bookingForm").reset();

} catch (error) {
  alert("Error: " + error.message);
}

});