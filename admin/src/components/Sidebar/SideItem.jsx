import { NavLink } from "react-router-dom";

const SideItem = ({ to, icon, text, closed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 w-full p-2 border-gray-500 border-b whitespace-nowrap ${
          isActive ? "bg-primary" : ""
        } ${closed ? "flex-col" : ""}`
      }
      end
    >
      {icon}
      {!closed && (
        <span className="w-full transition-width overflow-hidden">{text}</span>
      )}
    </NavLink>
  );
};

export default SideItem;
