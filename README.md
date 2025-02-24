# Comenzi-online
import { useState } from "react";
import { jsPDF } from "jspdf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OrderPage() {
  const [imageUrls, setImageUrls] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState({});

  const handleImageUpload = () => {
    if (!imageUrls.trim()) return;
    const urls = imageUrls.split("\n").map((url) => url.trim()).filter((url) => url);
    const newProducts = urls.map((url, index) => ({ id: index + 1, image: url }));
    setProducts(newProducts);
    setOrders(newProducts.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));
  };

  const handleOrder = (id, quantity) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [id]: Math.max(0, parseInt(quantity) || 0),
    }));
  };

  const generatePDF = () => {
    if (products.length === 0) return;
    const doc = new jsPDF();
    let y = 10;
    products.forEach((product) => {
      const quantity = orders[product.id];
      if (quantity > 0) {
        doc.addImage(product.image, "JPEG", 10, y, 50, 50);
        doc.text(`Cantitate: ${quantity}`, 10, y + 55);
        y += 70;
        if (y > 250) {
          doc.addPage();
          y = 10;
        }
      }
    });
    doc.save("comanda.pdf");
  };

  return (
    <div className="p-6">
      <textarea
        className="w-full p-2 border rounded"
        rows="5"
        placeholder="Adaugă link-urile imaginilor, fiecare pe un rând"
        value={imageUrls}
        onChange={(e) => setImageUrls(e.target.value)}
      />
      <Button className="mt-2 w-full" onClick={handleImageUpload}>
        Încarcă Imagini
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <CardContent>
              <img src={product.image} alt="Produs" className="w-full h-40 object-cover mb-2" />
              <Input
                type="number"
                placeholder="Cantitate"
                className="mt-2"
                min="0"
                value={orders[product.id] || ""}
                onChange={(e) => handleOrder(product.id, e.target.value)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4 w-full" onClick={generatePDF}>
        Generează PDF
      </Button>
    </div>
  );
}
