// sync with api docs https://tomkoom.gitbook.io/cyql-api/

const main = [
  { id: "name", label: "Name", type: "text" },
  { id: "slug", label: "Slug", type: "text" },
  { id: "website", label: "Website", type: "text" },
  { id: "canister", label: "Canister", type: "text" },
  { id: "logo", label: "Logo", type: "text" },
];

const socials = [
  { id: "twitter", label: "Twitter", type: "text" },
  { id: "discord", label: "Discord", type: "text" },
  { id: "telegram", label: "Telegram", type: "text" },
  { id: "github", label: "GitHub", type: "text" },
  { id: "medium", label: "Medium", type: "text" },
  
  // socials ic
  { id: "dscvr", label: "Dscvr", type: "text" },
  { id: "distrikt", label: "Distrikt", type: "text" },
  { id: "openChat", label: "OpenChat", type: "text" },
  { id: "taggr", label: "TAGGR", type: "text" },
  { id: "seers", label: "Seers", type: "text" },
  { id: "nuance", label: "Nuance", type: "text" },
  { id: "catalyze", label: "Catalyze", type: "text" },
  { id: "funded", label: "funded", type: "text" },
];

const additional = [
  { id: "app", label: "app", type: "text" },
  { id: "docs", label: "docs", type: "text" },
  { id: "whitepaper", label: "whitepaper", type: "text" },
];

const nft = [
  { id: "nftSaleDate", label: "NFT sale date", type: "date" },
  { id: "nftUnits", label: "Units", type: "text" },
  { id: "nftUnitPrice", label: "Unit price", type: "text" },
  { id: "nftMarketUrl", label: "Market URL", type: "text" },
  { id: "nftSaleUrl", label: "Sale URL", type: "text" },
  { id: "nftRarityChecker", label: "Rarity URL" },
  { id: "nftImg1", label: "Preview img1", type: "text" },
  { id: "nftImg2", label: "Preview img2", type: "text" },
  { id: "nftImg3", label: "Preview img3", type: "text" },
  { id: "nftImg4", label: "Preview img4", type: "text" },
];

const nftSaleStatusOptions = [
  { id: "Upcoming", label: "Upcoming" },
  { id: "Open", label: "Open" },
  { id: "On the market", label: "On the market" },
];

export { main, socials, additional, nft, nftSaleStatusOptions };