document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".edit-form").forEach(form => {
    form.style.display = "none";
  });

  document.querySelectorAll('.edit-form').forEach(form => {
    form.addEventListener('submit', function () {
      const button = this.querySelector('button[type="submit"]');
      button.disabled = true;
      button.innerText = "Saving...";
    });
  });
});

function toggleEditForm() {
  const form = document.getElementById("editForm");
  form.style.display = (form.style.display === "none") ? "block" : "none";
}

function toggleEdit(sid) {
  const form = document.getElementById(`edit-form-${sid}`);
  const contentDiv = document.getElementById(`content-${sid}`);

  if (!form || !contentDiv) return;

  const isHidden = window.getComputedStyle(form).display === "none";

  if (isHidden) {
    form.style.display = "block";
    contentDiv.style.display = "none";
  } else {
    form.style.display = "none";
    contentDiv.style.display = "block";
  }
}

