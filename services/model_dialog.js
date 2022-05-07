
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("tab5");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

const eyeClick = document.querySelector("[data-password]");
const password_elem = document.getElementById("password");

eyeClick.onclick = () => {
  const icon = eyeClick.children[0];
  icon.classList.toggle("fa-eye-slash");
  if (password_elem.type === "password") {
    password_elem.type = "text";
  } else if (password_elem.type === "text") {
    password_elem.type = "password";
  }
};
