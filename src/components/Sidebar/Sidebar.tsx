import { useState } from "react";
import { NavbarCard } from "./NavbarCard";
import { HomeIcon } from "../svg/HomeIcon";

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
      <NavbarCard
        logo={<HomeIcon />}
        text="Course selection"
        selected={selected === SidebarTab.CHAT}
        onClick={() => setSelected(SidebarTab.CHAT)}
      />
      <NavbarCard
        logo={<HomeIcon />}
        text="Case Research"
        selected={selected === SidebarTab.RESEARCH}
        onClick={() => setSelected(SidebarTab.RESEARCH)}
      />
      <NavbarCard
        logo={<HomeIcon />}
        text="Tagging legal texts"
        selected={selected === SidebarTab.TAGGING}
        onClick={() => setSelected(SidebarTab.TAGGING)}
      />
      <NavbarCard
        logo={<HomeIcon />}
        text="Legal text repository"
        selected={selected === SidebarTab.REPOSITORY}
        onClick={() => setSelected(SidebarTab.REPOSITORY)}
      />
    </div>
  );
};
