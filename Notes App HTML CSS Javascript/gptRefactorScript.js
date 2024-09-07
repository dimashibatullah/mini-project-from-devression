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

// Fungsi untuk membuka modal
function showModal(modal) {
  modal.style.display = "block";
}

// Fungsi untuk menutup modal
function closeModal(modal) {
  modal.style.display = "none";
}

// Fungsi untuk membuat note card baru
function createNoteCard(content) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("box");
  noteCard.innerHTML = `
    <div class="box-note">
      <p>${content}</p>
    </div>
    <div class="btn-note">
      <button type="button" class="edit">Edit</button>
      <button type="button" class="hapus">Hapus</button>
    </div>
  `;
  containerNote.appendChild(noteCard);
  saveData();
}

// Fungsi untuk menyimpan data ke localStorage
function saveData() {
  localStorage.setItem("noteData", containerNote.innerHTML);
}

// Fungsi untuk memuat data dari localStorage
function loadData() {
  const savedData = localStorage.getItem("noteData");
  if (savedData) {
    containerNote.innerHTML = savedData;
  }
}

// Event handler untuk tombol Add
addBtn.addEventListener("click", () => {
  showModal(modalAdd);
  textAreaNew.value = "";
});

// Event handler untuk tombol Close modal Add
closeBtnNew.addEventListener("click", () => {
  closeModal(modalAdd);
});

// Event handler untuk tombol Create Note
createBtnNew.addEventListener("click", () => {
  const inputValue = textAreaNew.value.trim();
  if (!inputValue) {
    alert("Note tidak boleh kosong");
    return;
  }
  createNoteCard(inputValue);
  closeModal(modalAdd);
});

// Event handler untuk tombol Edit dan Hapus
containerNote.addEventListener("click", (e) => {
  const target = e.target;
  const noteCard = target.closest(".box");

  if (target.classList.contains("hapus")) {
    noteCard.remove();
    saveData();
  }

  if (target.classList.contains("edit")) {
    showModal(modalEdit);
    textAreaEdit.value = noteCard.querySelector("p").textContent;

    // Update note setelah tombol edit di klik
    createBtnEdit.onclick = () => {
      const editedValue = textAreaEdit.value.trim();
      if (editedValue) {
        noteCard.querySelector("p").textContent = editedValue;
        closeModal(modalEdit);
        saveData();
      }
    };
  }
});

// Event handler untuk tombol Close modal Edit
closeBtnEdit.addEventListener("click", () => {
  closeModal(modalEdit);
});

// Muat data dari localStorage saat halaman dimuat
loadData();
