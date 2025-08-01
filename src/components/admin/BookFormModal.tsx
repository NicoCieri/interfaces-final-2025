import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../../constants";

interface BookFormData {
  title: string;
  author: string;
  description: string;
  category: string;
  year: string;
  availableQuantity: string;
  cover: string;
  featured: boolean;
}

interface ValidationErrors {
  title?: string;
  author?: string;
  description?: string;
  category?: string;
  year?: string;
  availableQuantity?: string;
  cover?: string;
}

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEditing: boolean;
  formData: BookFormData;
  setFormData: (data: BookFormData) => void;
}

export const BookFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  formData,
  setFormData,
}: BookFormModalProps) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "El título no puede exceder 100 caracteres";
    }

    if (!formData.author.trim()) {
      newErrors.author = "El autor es requerido";
    } else if (formData.author.trim().length < 2) {
      newErrors.author = "El autor debe tener al menos 2 caracteres";
    } else if (formData.author.trim().length > 50) {
      newErrors.author = "El autor no puede exceder 50 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (formData.description.trim().length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    } else if (formData.description.trim().length > 500) {
      newErrors.description = "La descripción no puede exceder 500 caracteres";
    }

    if (!formData.category) {
      newErrors.category = "La categoría es requerida";
    }

    if (!formData.year) {
      newErrors.year = "El año es requerido";
    } else {
      const year = parseInt(formData.year);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1800 || year > currentYear) {
        newErrors.year = `El año debe estar entre 1800 y ${currentYear}`;
      }
    }

    if (!formData.availableQuantity) {
      newErrors.availableQuantity = "El stock es requerido";
    } else {
      const quantity = parseInt(formData.availableQuantity);
      if (isNaN(quantity) || quantity < 0) {
        newErrors.availableQuantity =
          "El stock debe ser un número mayor o igual a 0";
      } else if (quantity > 1000) {
        newErrors.availableQuantity = "El stock no puede exceder 1000 unidades";
      }
    }

    if (!formData.cover.trim()) {
      newErrors.cover = "La URL de la portada es requerida";
    } else {
      try {
        new URL(formData.cover.trim());
      } catch {
        newErrors.cover = "La URL de la portada no es válida";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof BookFormData,
    value: string | boolean
  ) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof ValidationErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.title.trim() &&
    formData.author.trim() &&
    formData.description.trim() &&
    formData.category &&
    formData.year &&
    formData.availableQuantity &&
    formData.cover.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Editar Libro" : "Agregar Nuevo Libro"}
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Título"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              isRequired
              isInvalid={!!errors.title}
              errorMessage={errors.title}
              placeholder="Ingresa el título del libro"
            />
            <Input
              label="Autor"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              isRequired
              isInvalid={!!errors.author}
              errorMessage={errors.author}
              placeholder="Ingresa el nombre del autor"
            />
            <Select
              label="Categoría"
              selectedKeys={[formData.category]}
              onChange={(e) => handleInputChange("category", e.target.value)}
              isRequired
              isInvalid={!!errors.category}
              errorMessage={errors.category}
              placeholder="Selecciona una categoría"
            >
              {CATEGORIES.map((category) => (
                <SelectItem key={category.key}>{category.label}</SelectItem>
              ))}
            </Select>
            <Input
              label="Año"
              type="number"
              value={formData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
              isRequired
              isInvalid={!!errors.year}
              errorMessage={errors.year}
              placeholder="Ej: 2023"
              min="1800"
              max={new Date().getFullYear()}
            />
            <Input
              label="Stock Disponible"
              type="number"
              value={formData.availableQuantity}
              onChange={(e) =>
                handleInputChange("availableQuantity", e.target.value)
              }
              isRequired
              isInvalid={!!errors.availableQuantity}
              errorMessage={errors.availableQuantity}
              placeholder="Ej: 10"
              min="0"
              max="1000"
            />
            <Input
              label="URL de la Portada"
              value={formData.cover}
              onChange={(e) => handleInputChange("cover", e.target.value)}
              isRequired
              isInvalid={!!errors.cover}
              errorMessage={errors.cover}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
          <Textarea
            label="Descripción"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="mt-4"
            isRequired
            isInvalid={!!errors.description}
            errorMessage={errors.description}
            placeholder="Describe brevemente el contenido del libro..."
            minLength={10}
            maxLength={500}
          />
          <div className="mt-4">
            <Button
              color={formData.featured ? "warning" : "default"}
              variant="flat"
              onPress={() => handleInputChange("featured", !formData.featured)}
              size="sm"
            >
              {formData.featured ? "Destacado" : "No Destacado"}
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="bordered"
            onPress={onClose}
            isDisabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isLoading={isSubmitting}
            isDisabled={!isFormValid || isSubmitting}
          >
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
