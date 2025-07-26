import { useRef, useState } from 'react';
import {
  Nav,
  Button,
  Overlay,
  Tooltip
} from 'react-bootstrap';
import {
  Home,
  Plane,
  Info,
  Menu,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
  LogOut
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const overlayTargetRef = useRef(null);

  const navItems = [
    { label: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    { label: "Airports", icon: <Plane className="w-5 h-5" />, path: "/airports" },
    { label: "About Us", icon: <Info className="w-5 h-5" />, path: "/about" }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleItemClick = (path) => {
    setActiveItem(path);
    setIsMobileOpen(false);
    navigate(path);
  };

  const renderNavItem = (item, idx, isBottom = false) => {
    const isActive = activeItem === item.path;
    const uniqueId = `${isBottom ? 'bottom' : 'main'}-${idx}`;

    return (
      <Nav.Item key={uniqueId} className="position-relative">
        <Button
          onClick={() => handleItemClick(item.path)}
          onMouseEnter={() => isCollapsed && setShowTooltip(uniqueId)}
          onMouseLeave={() => setShowTooltip(null)}
          className={`
            w-100 d-flex align-items-center gap-3 px-4 py-3 rounded-lg
            transition-all border-0 text-start position-relative overflow-hidden
            ${isActive 
              ? "bg-amber-600 shadow-lg text-white transform-gpu" 
              : "bg-transparent text-amber-900 hover:bg-amber-700 hover:bg-opacity-20 hover:text-amber-800 hover:shadow-md"
            }
          `}
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(isActive && {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            })
          }}
        >
          {/* Active indicator */}
          {isActive && (
            <div 
              className="position-absolute start-0 top-0 bottom-0 bg-amber-400"
              style={{
                width: '3px',
                animation: 'slideIn 0.3s ease-out'
              }}
            />
          )}

          {/* Icon with enhanced styling */}
          <span className={`
            d-flex align-items-center justify-content-center transition-all
            ${isActive ? 'text-amber-200 transform scale-110' : 'text-amber-700'}
          `}>
            {item.icon}
          </span>

          {/* Label with smooth animation */}
          <span className={`
            fs-6 fw-medium transition-all overflow-hidden text-nowrap
            ${isCollapsed ? 'w-0 opacity-0 ms-0' : 'w-auto opacity-100 ms-2'} 
            ${isActive ? 'text-white' : 'text-amber-900'}
          `}
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: isCollapsed ? '0s' : '0.1s'
          }}>
            {item.label}
          </span>

          {/* Hover effect overlay */}
          <div 
            className={`
              position-absolute inset-0 bg-white opacity-0 transition-opacity
              ${!isActive ? 'hover:opacity-5' : ''}
            `}
          />
        </Button>

        {/* Enhanced Tooltip */}
        <Overlay
          show={showTooltip === uniqueId && isCollapsed}
          target={overlayTargetRef.current}
          placement="right"
        >
          {(props) => (
            <Tooltip 
              id={`tooltip-${uniqueId}`} 
              {...props}
              className="custom-tooltip"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                fontSize: '0.875rem',
                padding: '8px 12px',
                borderRadius: '6px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              {item.label}
            </Tooltip>
          )}
        </Overlay>
      </Nav.Item>
    );
  };

  return (
    <>
      {/* Mobile Background Overlay with animation */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black z-40"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        ref={overlayTargetRef}
        className={`
          fixed lg:static top-0 start-0 h-screen 
          bg-gradient-to-b from-amber-50 to-amber-100 
          flex flex-col shadow-xl transition-all duration-300
          ${isCollapsed ? 'w-16' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          z-50 lg:z-auto border-e border-amber-200
        `}
        style={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
        }}
      >

        {/* Main Navigation Items */}
        <Nav className={`${isCollapsed ? 'px-2' : 'px-3'} py-4 flex-column gap-2 flex-grow-1`}>
          {navItems.map((item, idx) => renderNavItem(item, idx))}
        </Nav>
      </div>

      {/* Custom Styles - FIXED: Removed jsx attribute */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .custom-tooltip .tooltip-inner {
          background-color: rgba(0, 0, 0, 0.9) !important;
          color: white !important;
          font-size: 0.875rem !important;
          padding: 8px 12px !important;
          border-radius: 6px !important;
          border: none !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }

        .custom-tooltip .tooltip-arrow::before {
          border-right-color: rgba(0, 0, 0, 0.9) !important;
        }
      `}</style>
    </>
  );
};

export default Sidebar;