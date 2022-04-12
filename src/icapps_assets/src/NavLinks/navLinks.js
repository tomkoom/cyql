import { iFire } from "../Icons/Icons";
import { toApps, toHome, toSubmit, toUpcoming } from "../Routes/routes";

const navLinks = [
  { name: "Home", link: toHome, icon: "" },
  { name: "Projects", link: toApps, icon: "" },
  { name: "Upcoming", link: toUpcoming, icon: iFire },
  // { name: "NFT Stats", link: toNft, icon: "" },
  { name: "Submit", link: toSubmit, icon: "" },
];

export { navLinks };
