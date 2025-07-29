function toggleEditForm() {
    const form = document.getElementById("editForm");
    form.style.display = (form.style.display === "none") ? "block" : "none";
}

function toggleEdit(sid) {
    const form = document.getElementById(`edit-form-${sid}`);
    const contentDiv = document.getElementById(`content-${sid}`);
    if (form.style.display === "none") {
      form.style.display = "block";
      contentDiv.style.display = "none";
    } else {
      form.style.display = "none";
      contentDiv.style.display = "block";
    }
  }
