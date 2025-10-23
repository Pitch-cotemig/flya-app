import { X } from "lucide-react";
import { User } from "../../services/authService";
import {
  SidebarOverlay,
  SidebarContainer,
  SidebarHeader,
  CloseButton,
  SidebarNav,
  SidebarNavLink,
  SidebarFooter,
  SidebarLoginButton,
} from "./sidebarStyles";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  navLinks: Array<{ label: string; to: string }>;
}

export function MobileSidebar({
  isOpen,
  onClose,
  user,
  navLinks,
}: MobileSidebarProps) {
  // Fecha o sidebar ao clicar em um link
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <h2>Menu</h2>
          <CloseButton onClick={onClose} aria-label="Fechar menu">
            <X size={24} />
          </CloseButton>
        </SidebarHeader>

        <SidebarNav>
          {navLinks.map((link) => (
            <SidebarNavLink
              key={link.to}
              to={link.to}
              onClick={handleLinkClick}
            >
              {link.label}
            </SidebarNavLink>
          ))}
        </SidebarNav>

        <SidebarFooter>
          {user ? (
            <SidebarNavLink to="/Perfil" onClick={handleLinkClick}>
              <SidebarLoginButton>👤 Perfil</SidebarLoginButton>
            </SidebarNavLink>
          ) : (
            <SidebarNavLink to="/auth" onClick={handleLinkClick}>
              <SidebarLoginButton>🔐 Login</SidebarLoginButton>
            </SidebarNavLink>
          )}
        </SidebarFooter>
      </SidebarContainer>
    </>
  );
}
