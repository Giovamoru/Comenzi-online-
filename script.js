/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    const imageUpload = document.getElementById("imageUpload");
    const generatePDF = document.getElementById("generatePDF");
    const imageContainer = document.getElementById("imageContainer");

    if (!imageUpload || !generatePDF || !imageContainer) {
        console.error("Unul sau mai multe elemente nu au fost găsite în DOM.");
        return;
    }

    imageUpload.addEventListener("change", function (event) {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        Array.from(files).forEach((file) => {
            if (!file.type.startsWith("image/")) return;

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

    generatePDF.addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 10;

        document.querySelectorAll(".image-item").forEach((item, index) => {
            const imgElement = item.querySelector("img");
            const quantity = item.querySelector("input").value || "0";
            if (!imgElement || !imgElement.src) return;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.src = imgElement.src;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL("image/jpeg", 0.8);
                doc.addImage(imgData, "JPEG", 10, y, 180, 100);
                doc.text(`Cantitate: ${quantity}`, 10, y + 105);
                y += 120;
                if (y > 250) {
                    doc.addPage();
                    y = 10;
                }
                if (index === document.querySelectorAll(".image-item").length - 1) {
                    doc.save("comanda.pdf");
                }
            };
        });
    });
});