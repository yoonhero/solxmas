let inputElement = document.querySelector(".dragNdropInput");

const dropZoneElement = document.querySelector(".drag-zone");

const dragNdropContainer = document.querySelector(".dragNdrop ");

const mpredictButton = document.querySelector(".mobilePredict");
const tryAgain = document.querySelector(".tryAgain");
const mlabelContainer = document.getElementById("mlabel-container");

dropZoneElement.addEventListener("click", (e) => {
  inputElement.click();
});

document.querySelector(".tryAgain").addEventListener("click", (e) => {
  inputElement.click();
  mlabelContainer.classList.add("hidden");
  tryAgain.classList.add("hidden");
  mpredictButton.classList.remove("hidden");
});

inputElement.addEventListener("change", (e) => {
  if (inputElement.files.length) {
    updateThumbnail(dropZoneElement, inputElement.files[0]);
  }
});

dropZoneElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZoneElement.classList.add("drop-zone--over");
});

["dragleave", "dragend"].forEach((type) => {
  dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("drop-zone--over");
  });
});

dropZoneElement.addEventListener("drop", (e) => {
  e.preventDefault();

  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;
    updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
  }

  dropZoneElement.classList.remove("drop-zone--over");
});

function updateThumbnail(dropZoneElement, file) {
  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  const thumbnailElement = document.querySelector(".thumbnailElement");

  thumbnailElement.src = window.URL.createObjectURL(file);
  Image.onload = function () {
    window.URL.revokeObjectURL(this.src);
  };

  dragNdropContainer.classList.add("hidden");
  mpredictButton.classList.remove("hidden");
  // const info = document.createElement("span");
  // info.innerHTML = file.name + " " + file.size + " bytes";
  // dropZoneElement.appendChild(info);
}

// <script type="text/javascript">
//   function dropHandler(ev) {
//     console.log('File(s) dropped');

//     // Prevent default behavior (Prevent file from being opened)
//     ev.preventDefault();

//     if (ev.dataTransfer.items) {
//       // Use DataTransferItemList interface to access the file(s)
//       for (var i = 0; i < ev.dataTransfer.items.length; i++) {
//         // If dropped items aren't files, reject them
//         if (ev.dataTransfer.items[i].kind === 'file') {
//           var file = ev.dataTransfer.items[i].getAsFile();
//           console.log('... file[' + i + '].name = ' + file.name);
//         }
//       }
//     } else {
//       // Use DataTransfer interface to access the file(s)
//       for (var i = 0; i < ev.dataTransfer.files.length; i++) {
//         console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
//       }
//     }
//   }

//   function dragOverHandler(ev){
//     console.log('File(s) in drop zone');

//   // Prevent default behavior (Prevent file from being opened)
//   ev.preventDefault()
//   }
// </script>
