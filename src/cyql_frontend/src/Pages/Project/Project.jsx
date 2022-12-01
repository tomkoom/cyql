import React from "react";
import css from "./Project.module.css";

// router
import { useParams } from "react-router-dom";

// icons
import { iExternalLink } from "@icons/Icons";

// components
import { BackBtn, Loader } from "@components/index";
import {
  CollStats,
  Description,
  Disclaimer,
  Header,
  Links,
  Meta,
  NftPreviews,
  TwitterTimeline,
} from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "@state/projects";

const Project = () => {
  const { id } = useParams();
  const projects = useSelector(selectProjects);

  return (
    <div className={css.project}>
      <BackBtn />

      {projects.length < 1 ? (
        <Loader />
      ) : (
        projects
          .filter((p) => p.id === id)
          .map((p) => (
            <div className={css.content} key={p.id}>
              <div className={css.main}>
                <Header
                  logo={p.logo}
                  name={p.name}
                  category={p.category}
                  tags={p.tags}
                  idx={p.idx}
                  upvotedBy={p.upvotedBy}
                />

                <Description name={p.name} description={p.description} />
                {(p.nftImg1 || p.nftImg2 || p.nftImg3 || p.nftImg4) && (
                  <NftPreviews
                    nftImg1={p.nftImg1}
                    nftImg2={p.nftImg2}
                    nftImg3={p.nftImg3}
                    nftImg4={p.nftImg4}
                  />
                )}

                {p.category === "NFTs" && (
                  <div>
                    <h6>Collection Stats</h6>
                    <CollStats
                      nftSaleStatus={p.nftSaleStatus}
                      nftSaleDate={p.nftSaleDate}
                      nftUnits={p.nftUnits}
                      nftUnitPrice={p.nftUnitPrice}
                    />
                  </div>
                )}

                <div className={css.nftBtns}>
                  {p.nftMarketUrl && (
                    <a
                      className={css.btn}
                      href={p.nftMarketUrl}
                      target="_blank"
                      rel="norefferrer noopener"
                    >
                      Trade<span>{iExternalLink}</span>
                    </a>
                  )}

                  {p.nftRarityChecker && (
                    <a
                      className={css.btn}
                      href={p.nftRarityChecker}
                      target="_blank"
                      rel="norefferrer noopener"
                    >
                      Rarity Checker&nbsp;<span>{iExternalLink}</span>
                    </a>
                  )}
                </div>

                <Links
                  // main
                  website={p.website}
                  canister={p.canister}
                  app={p.app}
                  docs={p.docs}
                  // ic
                  dscvr={p.dscvr}
                  distrikt={p.distrikt}
                  openChat={p.openChat}
                  // soc
                  twitter={p.twitter}
                  discord={p.discord}
                  github={p.github}
                  telegram={p.telegram}
                  medium={p.medium}
                  // nft
                  // ...
                  // crowdfunding, etc
                  // ...
                />

                <Meta added={p.added} />
                <Disclaimer />
              </div>

              {/* links */}
              <div className={css.twitter}>
                {p.twitter && (
                  <div>
                    <h5 className={css.subtitle}>{p.name} Twitter</h5>
                    <TwitterTimeline twitter={p.twitter} />
                  </div>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default Project;