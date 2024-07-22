import { Menu } from "lucide-react";
import MobileNavbar from "../navbar/MobileNavbar";

export default function MobileMenuTrigger() {
  return (
    <div className="sm:hidden">
      <label
        htmlFor="mobileNav"
        className="size-8 flex justify-center items-center sm:hidden border border-white"
      >
        <Menu className="text-white" />
      </label>
      <input id="mobileNav" type="checkbox" className="hidden peer" />
      <div className="hidden peer-checked:block">
        <label htmlFor="mobileNav">
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[9]" />
        </label>
        <MobileNavbar />
      </div>
    </div>
  );
}
