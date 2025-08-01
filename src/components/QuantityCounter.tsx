import { Button, Input } from "@heroui/react";
import { Minus, Plus } from "lucide-react";

interface QuantityCounterProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
  minQuantity?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showMaxLabel?: boolean;
}

export const QuantityCounter = ({
  quantity,
  onQuantityChange,
  maxQuantity,
  minQuantity = 1,
  disabled = false,
  size = "sm",
  showMaxLabel = true,
}: QuantityCounterProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  const isMinDisabled = quantity <= minQuantity || disabled;
  const isMaxDisabled = quantity >= maxQuantity || disabled;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-300">Cantidad:</span>
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          size={size}
          variant="bordered"
          onPress={() => handleQuantityChange(quantity - 1)}
          isDisabled={isMinDisabled}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Input
          type="number"
          value={quantity.toString()}
          onChange={(e) =>
            handleQuantityChange(parseInt(e.target.value) || minQuantity)
          }
          min={minQuantity}
          max={maxQuantity}
          className="w-12 text-center"
          size={size}
          isDisabled={disabled}
        />
        <Button
          isIconOnly
          size={size}
          variant="bordered"
          onPress={() => handleQuantityChange(quantity + 1)}
          isDisabled={isMaxDisabled}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {showMaxLabel && (
        <span className="text-sm text-gray-400">Máximo: {maxQuantity}</span>
      )}
    </div>
  );
};
