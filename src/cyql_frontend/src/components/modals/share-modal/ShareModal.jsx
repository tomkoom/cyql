import React from "react";
import css from "./ShareModal.module.css";

// components
import { Header, ShareBtns, ShareLink } from "./index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setShareModal } from "@/state/modals/shareModal";

const ShareModal = ({ slug, name, categories, description }) => {
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(setShareModal(false));
  };

  return (
    <div className={css.modal} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <Header name={name} />
        <ShareBtns slug={slug} name={name} categories={categories} description={description} />
        <ShareLink />
      </div>
    </div>
  );
};

export default ShareModal;
