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

function showAddModal() {
  modalAdd.style.display = "block";
  textAreaNew.value = "";
}

function closeModal() {
  modalAdd.style.display = "none";
}

function createNewNote(input) {
  // cek isi text area
  if (!input) {
    return alert("note tidak boleh kosong");
  }

  // buat card notes baru
  let content = "";
  content = `
                  <div class="box-note">
                    <p>${input}</p>
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
}

function removeNote(element) {
  element.parentNode.parentNode.style.display = "none";
}

function editNote(element, value) {
  element.parentNode.previousElementSibling.firstElementChild.textContent = value;
}

function saveData() {
  localStorage.setItem("noteData", containerNote.innerHTML);
}

function loadData() {
  containerNote.innerHTML = localStorage.getItem("noteData");
}

// ketika tombol add diklik
addBtn.addEventListener("click", () => {
  showAddModal();
});

// ketika tombol close di klik
closeBtnNew.addEventListener("click", () => {
  closeModal();
});

// ketika tombol create di klik
createBtnNew.addEventListener("click", () => {
  // ambil value pada input text area
  let inputValue = textAreaNew.value;
  createNewNote(inputValue);
  saveData();
});

// edit / hapus note
document.addEventListener("click", (e) => {
  // jika tombol hapus di klik
  if (e.target.id == "hapus") {
    removeNote(e.target);
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
      editNote(e.target, textAreaEdit.value);
      modalEdit.style.display = "none";
      saveData();
    });

    // jika tombol close di klik
    closeBtnEdit.addEventListener("click", () => {
      modalEdit.style.display = "none";
    });
  }
});

loadData();
