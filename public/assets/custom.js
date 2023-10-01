// edite product page
const editePhotoPreview = document.querySelector("#image-preview");
const editePhotoSelect = document.querySelector(".edite-photo-select");

editePhotoSelect.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      editePhotoPreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});








document.addEventListener("DOMContentLoaded", function() {
    var backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function() {
        return window.history.back();
    });
});
