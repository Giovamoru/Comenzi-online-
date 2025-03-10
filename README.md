# Haine En-gross
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const products = [
  { id: 1, name: "Geacă iarnă", colors: ["Negru", "Roșu", "Albastru"] },
  { id: 2, name: "Bluză casual", colors: ["Alb", "Gri", "Verde"] },
  { id: 3, name: "Pantaloni sport", colors: ["Negru", "Gri"] },
];

export default function OrderPage() {
  const [orders, setOrders] = useState({});

  const handleOrder = (id, field, value) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [id]: {
        ...prevOrders[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Comenzi trimise:", orders);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="p-4">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <Select onValueChange={(value) => handleOrder(product.id, "color", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Alege culoarea" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Cantitate"
              className="mt-2"
              min="1"
              value={orders[product.id]?.quantity || ""}
              onChange={(e) => handleOrder(product.id, "quantity", e.target.value)}
            />
            <Button className="mt-2 w-full" onClick={handleSubmit}>
              Trimite Comanda
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
