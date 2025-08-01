import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  onAdd: () => void;
}

export const AdminHeader = ({ title, onAdd }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <Button
        color="primary"
        startContent={<Plus className="w-4 h-4" />}
        onPress={onAdd}
      >
        Agregar Libro
      </Button>
    </div>
  );
};
