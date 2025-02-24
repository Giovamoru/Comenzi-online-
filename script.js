document.addEventListener("DOMContentLoaded", () => {
    window.jsPDF = window.jspdf.jsPDF;
});

function handleImageUpload() {
    const fileInput = document.getElementById("imageInput");
    const files = fileInput.files;
    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const productDiv = document.createElement("div");
            productDiv.className = "product";

            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = "Produs";

            const input = document.createElement("input");
            input.type = "number";
            input.min = "0";
            input.placeholder = "Cantitate";
            input.dataset.id = index;

            productDiv.appendChild(img);
            productDiv.appendChild(input);
            productList.appendChild(productDiv);
        };
        reader.readAsDataURL(file);
    });
}

function generatePDF() {
    const doc = new jsPDF();
    let y = 10;
    const inputs = document.querySelectorAll(".product input");

    inputs.forEach(input => {
        const quantity = input.value;
        if (quantity > 0) {
            const imgElement = input.parentElement.querySelector("img");
            const imgUrl = imgElement.src;

            doc.addImage(imgUrl, "JPEG", 10, y, 50, 50);
            doc.text(`Cantitate: ${quantity}`, 10, y + 55);
            y += 70;

            if (y > 250) {
                doc.addPage();
                y = 10;
            }
        }
    });

    doc.save("comanda.pdf");
}
