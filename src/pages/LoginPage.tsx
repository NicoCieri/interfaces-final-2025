import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
  Link,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, LibrarySquare } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  console.log({ isLoading });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError(
        "Credenciales inválidas. Verifica tus datos e intenta nuevamente."
      );
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-content1/80 backdrop-blur-sm shadow-2xl p-2">
          <CardHeader className="flex flex-col items-center gap-4 pb-6">
            <div className="flex items-center gap-3">
              <LibrarySquare className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                Biblioteca Online
              </h1>
            </div>
            <p className="text-default-600 text-center">
              Inicia sesión para acceder a tu cuenta
            </p>
          </CardHeader>

          <CardBody className="gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<Mail className="w-4 h-4 text-default-400" />}
                variant="bordered"
                size="lg"
                isRequired
              />

              <Input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={<Lock className="w-4 h-4 text-default-400" />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff className="w-4 h-4 text-default-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-default-400" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                variant="bordered"
                size="lg"
                isRequired
              />

              {error && (
                <div className="text-danger text-sm bg-danger-50 p-3 rounded-lg border border-danger-200">
                  {error}
                  <div className="mt-2 text-xs">
                    <p>Admin: admin@biblioteca.com / admin123</p>
                    <p>Usuario: user@biblioteca.com / user123</p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isLoading}
                className="font-semibold"
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <Divider />

            <div className="text-center">
              <p className="text-sm text-default-600">
                ¿No tienes una cuenta?{" "}
                <Link href="#" className="text-primary">
                  Regístrate aquí
                </Link>
              </p>
            </div>

            <div className="bg-content2 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Credenciales de prueba:
              </h3>
              <div className="text-xs text-default-600 space-y-1">
                <p>
                  <strong>Admin:</strong> admin@unahur.edu.ar / admin123
                </p>
                <p>
                  <strong>Usuario:</strong> user@unahur.edu.ar / user123
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
