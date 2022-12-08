import React from "react";
import css from "./Project.module.css";

// router
import { useParams } from "react-router-dom";

// components
import { BackBtn, Loader } from "@components/index";
import {
  CollStats,
  Description,
  Disclaimer,
  Header,
  Links,
  Meta,
  NftBtns,
  NftPreviews,
  Twitter,
} from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "@state/projects";

const Project = () => {
  const { slug } = useParams();
  const projects = useSelector(selectProjects);

  return (
    <div className={css.project}>
      <BackBtn />

      {projects.length < 1 ? (
        <Loader />
      ) : (
        projects
          .filter((p) => p.slug === slug)
          .map((p) => (
            <div className={css.content} key={p.id}>
              <div className={css.main}>
                <Header
                  logo={p.logo}
                  name={p.name}
                  category={p.category}
                  tags={p.tags}
                  grantee={p.grantee}
                  id={p.id}
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
                  <CollStats
                    nftSaleStatus={p.nftSaleStatus}
                    nftSaleDate={p.nftSaleDate}
                    nftUnits={p.nftUnits}
                    nftUnitPrice={p.nftUnitPrice}
                  />
                )}

                {(p.nftMarketUrl || p.nftRarityChecker) && (
                  <NftBtns nftMarketUrl={p.nftMarketUrl} nftRarityChecker={p.nftRarityChecker} />
                )}

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
                  // social
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

              {p.twitter && <Twitter name={p.name} twitter={p.twitter} />}
            </div>
          ))
      )}
    </div>
  );
};

export default Project;
