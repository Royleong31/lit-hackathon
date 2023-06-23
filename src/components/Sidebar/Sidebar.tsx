import { useState } from "react";
import { NavbarCard } from "./NavbarCard";
import { HomeIcon } from "../svg/HomeIcon";
import { SidebarDropdown } from "./SidebarDropdown";

enum SidebarTab {
  HOME = "HOME",
  CHAT = "CHAT",
  RESEARCH = "RESEARCH",
  TAGGING = "TAGGING",
  REPOSITORY = "REPOSITORY",
}

export const Sidebar = () => {
  const [selected, setSelected] = useState(SidebarTab.HOME);

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <NavbarCard
        logo={<HomeIcon />}
        text="Home"
        selected={selected === SidebarTab.HOME}
        onClick={() => setSelected(SidebarTab.HOME)}
      />

      <SidebarDropdown />
    </div>
  );
};
