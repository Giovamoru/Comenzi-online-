// script.js

document.addEventListener("DOMContentLoaded", function () {
  const imageUpload = document.getElementById("imageUpload");
  const generatePDF = document.getElementById("generatePDF");

  if (imageUpload) {
    imageUpload.addEventListener("change", function (event) {
      const files = Array.from(event.target.files);
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = ""; // Curăță containerul pentru imagini noi

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imageDiv = document.createElement("div");
          imageDiv.className = "image-item";

          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = "Produs";
          img.className = "preview-image";

          const input = document.createElement("input");
          input.type = "number";
          input.placeholder = "Cantitate";
          input.className = "quantity-input";
          input.min = "0";

          imageDiv.appendChild(img);
          imageDiv.appendChild(input);
          imageContainer.appendChild(imageDiv);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  if (generatePDF) {
    generatePDF.addEventListener("click", function () {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      let y = 10;

      document.querySelectorAll(".image-item").forEach((item) => {
        const imgElement = item.querySelector("img");
        const quantity = item.querySelector("input").value || "0";
        const imgData = imgElement.src;

        doc.addImage(imgData, "JPEG", 10, y, 180, 100);
        doc.text(`Cantitate: ${quantity}`, 10, y + 105);
        y += 120;
        if (y > 250) {
          doc.addPage();
          y = 10;
        }
      });
      doc.save("comanda.pdf");
    });
  }
});
