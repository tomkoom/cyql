import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown } from "@/components/icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectCategory } from "@/state/projects/category";

const Btn = () => {
  const category = useSelector(selectCategory);

  return (
    <button className={css.btn}>
      <p>category:</p>
      <span className={css.category}>{category.toLowerCase()}</span>
      <span className={css.icon}>{iAngleDown}</span>
    </button>
  );
};

export default Btn;