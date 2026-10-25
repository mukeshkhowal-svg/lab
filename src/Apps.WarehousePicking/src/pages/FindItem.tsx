import { useNavigate } from "react-router-dom";
import { ItemPicker } from "@/components/mobile/ItemPicker";
import { MobilePage } from "@/components/mobile/MobilePage";

// Find an item by name or SKU and open its detail page.
export default function FindItemPage() {
  const navigate = useNavigate();

  return (
    <MobilePage title="Find item">
      <ItemPicker onSelect={(item) => navigate(`/items/${item.id}`)} />
    </MobilePage>
  );
}
