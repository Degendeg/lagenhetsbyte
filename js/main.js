(function() {

  let inputSearchSubmit = document.getElementById("input-search-submit");
  let inputSearch = document.getElementById("input-search");
  let itemsList = document.getElementById("items-list");
  let btnContainer = document.getElementById("btn-container");
  let btns = btnContainer.getElementsByClassName("btn");
  const form = document.querySelector("form");

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        var current = document.getElementsByClassName("active");
        this.className += " active";
      }
    });
  }

  form.addEventListener('submit', evt => {
    evt.preventDefault();
    let item = document.createElement("li");
    item.innerHTML = '<input type="checkbox" class="item-checkbox" /> ' + inputSearch.value;
    itemsList.appendChild(item);
    let activeBtns = document.querySelectorAll('.btn.active');
    for (let activeBtn of activeBtns) {
      let btn = document.createElement("button");
      btn.appendChild(document.createTextNode(activeBtn.innerText));
      btn.classList.add("btn", "btn-" + activeBtn.innerText.split(" ").pop());
      item.appendChild(btn);
    }
  });

})();