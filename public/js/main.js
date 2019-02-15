(function() {

  const inputSearchSubmit = document.getElementById("input-search-submit");
  const inputSearch = document.getElementById("input-search");
  const socket = io.connect();
  const form = document.querySelector("form");
  let itemsList = document.getElementById("items-list");
  let btnContainer = document.getElementById("btn-container");
  let btns = btnContainer.getElementsByClassName("btn");
  let activeBtns = null;
  
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      if (this.classList.contains("active")) {
		socket.emit('deactivate', this.classList[1]);
      } else {
	    socket.emit('activate', this.classList[1]);
      }
    });
  }
  
  inputSearch.addEventListener("input", getSearchStr);
  function getSearchStr() {
	socket.emit('search', inputSearch.value);
  }
  
  socket.on('search', function(searchStr) {
	inputSearch.value = searchStr;
  });
  socket.on('activate', function(btnName) {
	  for (let i = 0; i < btns.length; i++) {
		  if (btns[i].classList[1] == btnName) {
			btns[i].className += " active";
		  }
	  }
  });
  socket.on('deactivate', function(btnName) {
	  for (let i = 0; i < btns.length; i++) {
		  if (btns[i].classList[1] == btnName) {
			btns[i].classList.remove("active");
		  }
	  }
  });
  
  form.addEventListener('submit', evt => {
	evt.preventDefault();
    socket.emit('item', inputSearch.value);
  });
  
  socket.on('item', function(data) {
	let item = document.createElement("li");
	item.innerHTML = '<input type="checkbox" class="item-checkbox" /> ' + data;
	itemsList.appendChild(item);
	activeBtns = document.querySelectorAll('.btn.active');
	for (let activeBtn of activeBtns) {
		let btn = document.createElement("button");
		btn.appendChild(document.createTextNode(activeBtn.innerText));
		btn.classList.add("btn", "btn-" + activeBtn.innerText.split(" ").pop());
		item.appendChild(btn);
	}
  });
  
})();