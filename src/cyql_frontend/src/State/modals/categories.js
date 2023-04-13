import { createSlice } from "@reduxjs/toolkit";

const categories = createSlice({
  name: "categories",
  initialState: {
    categories: [
      { id: "all", label: "All", icon: "" },
      // wallets, defi, tokens, payments
      { id: "wallets", label: "Wallets", icon: "👛" },
      { id: "defi", label: "DeFi", icon: "‍🌾" },
      { id: "tokens", label: "Tokens", icon: "🪙" },
      { id: "stablecoins", label: "Stablecoins", icon: "🪙" },
      { id: "dexs", label: "DEXs", icon: "🐂" },
      { id: "swapping", label: "Swapping", icon: "↔️" },
      { id: "payments-invoicing", label: "Payments/Invoicing", icon: "🧾" },

      // games, gambling
      { id: "games", label: "Games", icon: "⚔️" },
      { id: "gambling", label: "Gambling", icon: "🎲" },
      // add p2e

      // tools, dev tools
      { id: "tools", label: "Tools", icon: "🛠️" },
      { id: "dev-tools", label: "Dev Tools", icon: "👨‍💻" },

      // communities, daos
      { id: "communities", label: "Communities", icon: "📣" },
      { id: "daos", label: "DAOs", icon: "🏠" },

      // infrastracture, cloud, storage
      { id: "infrastructure", label: "Infrastructure", icon: "🚀" },
      { id: "cloud", label: "Cloud", icon: "☁️" },

      // metaverse, ar/vr
      { id: "metaverse", label: "Metaverse", icon: "👓" },
      { id: "ar-vr", label: "AR/VR", icon: "👓" },

      //  ...

      { id: "nfts", label: "NFTs", icon: "🗿" },
      { id: "dapps", label: "dApps", icon: "🔗" },
      { id: "social-networks", label: "Social Networks", icon: "🎯" },
      { id: "explorers", label: "Explorers", icon: "🌎" },
      { id: "education", label: "Education", icon: "🎓" },
      { id: "marketplace", label: "Marketplace", icon: "🔄" },
      { id: "blogging", label: "Blogging", icon: "🗒️" },
      { id: "identity", label: "Identity", icon: "🔑" },

      // to add
      // docs - motoko book
      // dev tools to dev resources (?)
    ],
  },
  reducers: {
    setCategoryLength(state, { payload }) {
      state.categories ===
        {
          ...state.categories,
          ...payload,
        };
    },
  },
});

// selectors
const selectCategories = (state) => state.categories.categories;
export { selectCategories };

export const { setCategoryLength } = categories.actions;
export default categories.reducer;
