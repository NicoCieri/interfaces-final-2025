import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Badge,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LibrarySquare,
  User as UserIcon,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { usePrestamos } from "../hooks/usePrestamo";

const NAV_LINKS = [
  {
    label: "Libros",
    to: "/libros",
  },
  {
    label: "Favoritos",
    to: "/favoritos",
  },
  {
    label: "Préstamos",
    to: "/prestamos",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { totalPrestamos } = usePrestamos();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar onMenuOpenChange={setIsOpen} isMenuOpen={isOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? "Abrir menu" : "Cerrar menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to="/" className="flex items-center">
            <LibrarySquare className="w-6 h-6 mr-2" />
            <p className="font-bold text-inherit">Biblioteca Online</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.label} to={link.to}>
            {({ isActive }) => (
              <NavbarItem isActive={isActive}>
                {link.label === "Préstamos" && (
                  <Badge color="primary" content={totalPrestamos}>
                    {link.label}
                  </Badge>
                )}

                {link.label !== "Préstamos" && link.label}
              </NavbarItem>
            )}
          </NavLink>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {user ? (
            <div className="flex items-center gap-3">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <User
                    as="button"
                    name={user.name}
                    description={user.email}
                    className="transition-transform cursor-pointer"
                    classNames={{
                      name: "text-sm font-semibold",
                      description: "hidden md:block text-xs",
                      base: "min-w-0",
                    }}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Opciones de usuario">
                  <DropdownItem
                    key="profile"
                    startContent={<UserIcon className="w-4 h-4" />}
                  >
                    <Link to="/perfil" className="w-full">
                      Mi Perfil
                    </Link>
                  </DropdownItem>
                  {user.role === "admin" ? (
                    <DropdownItem
                      key="admin"
                      startContent={<Settings className="w-4 h-4" />}
                    >
                      <Link to="/admin/libros" className="w-full">
                        Administrar Libros
                      </Link>
                    </DropdownItem>
                  ) : null}
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut className="w-4 h-4" />}
                    onPress={handleLogout}
                  >
                    Cerrar Sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <Button as={Link} color="primary" to="/login" variant="flat">
              Ingresar
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {NAV_LINKS.map((link) => (
          <NavLink
            to={link.to}
            onClick={() => setIsOpen(false)}
            key={link.label}
          >
            {({ isActive }: { isActive: boolean }) => (
              <NavbarMenuItem isActive={isActive}>{link.label}</NavbarMenuItem>
            )}
          </NavLink>
        ))}
        {user && (
          <>
            <NavbarMenuItem>
              <Link to="/perfil" onClick={() => setIsOpen(false)}>
                Mi Perfil
              </Link>
            </NavbarMenuItem>
            {user.role === "admin" && (
              <NavbarMenuItem>
                <Link to="/admin/libros" onClick={() => setIsOpen(false)}>
                  Administrar Libros
                </Link>
              </NavbarMenuItem>
            )}
            <NavbarMenuItem
              className="text-danger"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              Cerrar Sesión
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};
