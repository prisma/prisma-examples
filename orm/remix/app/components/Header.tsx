import type { LinksFunction } from '@remix-run/node';
import { NavLink } from '@remix-run/react'
import headerStylesheet from "~/styles/header.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: headerStylesheet }];
};

const Header = () => {
  const activeStyle = {
    color: "gray"
  }

  return (
    <nav>
      <div className="left">
        <NavLink
          to="/"
          className="bold"
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/drafts"
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
        >
          Drafts
        </NavLink>
      </div>
      <div className="right">
        <NavLink to="/signup" >
          Signup
        </NavLink>
        <NavLink to="/create" >
          + Create draft
        </NavLink>
      </div>
    </nav>
  );
}

export default Header
