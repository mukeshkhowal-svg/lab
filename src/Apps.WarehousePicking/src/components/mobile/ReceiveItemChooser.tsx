import { ItemPicker } from "@/components/mobile/ItemPicker";
import type { PickItem } from "@/hooks/UsePickItems";

type ReceiveItemChooserProps = {
  onSelect: (item: PickItem) => void;
};

// The first step of Receive is to choose an item already in the warehouse.
export function ReceiveItemChooser({ onSelect }: ReceiveItemChooserProps) {
  return <ItemPicker onSelect={onSelect} />;
}
