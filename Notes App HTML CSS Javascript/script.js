// Ambil element element
const addBtn = document.querySelector(".add-btn");
const modalAdd = document.querySelector(".modal-container-new");
const closeBtnNew = document.querySelector("#close-btn-new");
const createBtnNew = document.querySelector("#create-btn-new");
const textAreaNew = document.querySelector("#textInputNew");
const modalEdit = document.querySelector(".modal-container-edit");
const closeBtnEdit = document.querySelector("#close-btn-edit");
const createBtnEdit = document.querySelector("#create-btn-edit");
const textAreaEdit = document.querySelector("#textInputEdit");
const containerNote = document.querySelector(".container-note");
const editBtn = document.querySelector("#edit");
const hapusBtn = document.querySelector("#hapus");



// ketika tombol add diklik
addBtn.addEventListener("click", () => {
  // munculkan modal add
  modalAdd.style.display = "block";
  textAreaNew.value = "";
});

// settingan modal

// ketika tombol close di klik
closeBtnNew.addEventListener("click", () => {
  modalAdd.style.display = "none";
});

// ketika tombol create di klik
createBtnNew.addEventListener("click", () => {
  // ambil value pada input text area
  let inputValue = textAreaNew.value;

  // cek isi text area
  if (!inputValue) {
    return alert("note tidak boleh kosong");
  }

  // buat card notes baru
  let content = "";
  content = `
                <div class="box-note">
                  <p>${inputValue}</p>
                </div>
                <div class="btn-note">
                  <button type="button" id="edit">edit</button>
                  <button type="button" id="hapus">hapus</button>
                </div>`;

  let noteCard = document.createElement("DIV");
  noteCard.classList.add("box");
  noteCard.innerHTML = content;
  containerNote.appendChild(noteCard);

  // close modal
  modalAdd.style.display = "none";

  saveData();
});


// edit / hapus note
document.addEventListener("click", (e) => {
  // jika tombol hapus di klik
  if (e.target.id == "hapus") {
    e.target.parentNode.parentNode.style.display = "none";
    saveData();

    // jika tombol edit di klik
  } else if (e.target.id == "edit") {
    // buka modal edit
    modalEdit.style.display = "block";

    //ambil inputValue
    textAreaEdit.value = e.target.parentNode.previousElementSibling.firstElementChild.textContent;

    // jika tombol edit note di klik
    createBtnEdit.addEventListener("click", () => {
      // ubah isi note
      e.target.parentNode.previousElementSibling.firstElementChild.textContent = textAreaEdit.value;
      modalEdit.style.display = "none";
      saveData();
    });

    // jika tombol close di klik
    closeBtnEdit.addEventListener("click", () => {
      modalEdit.style.display = "none";
    });
  }
});

function saveData() {
  localStorage.setItem("noteData", containerNote.innerHTML);
}

function loadData() {
  containerNote.innerHTML = localStorage.getItem("noteData");
}
loadData();
