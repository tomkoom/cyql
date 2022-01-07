import React, { useState, useEffect } from "react";
import css from "./NftList.module.css";
import Loader from "../../CatLoader";

// Components
import SearchBar from "../SearchBar/SearchBar";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchNfts } from "../../Redux/searchNftsSlice";

const NftList = () => {
  const [itemsVisible, setItemsVisible] = useState(12);
  const showMoreItems = () => {
    setItemsVisible((prevValue) => prevValue + 12);
  };

  const dispatch = useDispatch();
  // Handle search query
  const handleSearchNfts = (e) => {
    dispatch(setSearchNfts(e.target.value));
  };

  // Get data from state
  const searchNftsValue = useSelector((state) => state.searchNfts.value);
  const nftItems = useSelector((state) => state.nftItems.nftItems);
  const totalVolumeInUsd = useSelector(
    (state) => state.nftItems.totalVolumeInUsd
  );
  const totalVolumeInIcp = useSelector(
    (state) => state.nftItems.totalVolumeInIcp
  );
  const totalMarketCapInUsd = useSelector(
    (state) => state.nftItems.totalMarketCapInUsd
  );
  const totalMarketCapInIcp = useSelector(
    (state) => state.nftItems.totalMarketCapInIcp
  );

  return (
    <section className={css.nftTable}>
      {nftItems && nftItems.length ? (
        <div>
          <div className={css.nftTable__hero}>
            <div className={css.nftTable__hero__heading}>
              <h2>
                NFT Collections <span>&#40;{nftItems.length}&#41;</span>
              </h2>
              <p className="bodyText">
                Below are listed stats for the IC NFT collections. Projects are
                sorted in descending order by volume. If you see inaccuracies,
                or you have any missing information you can&nbsp;
                <a
                  id={css.nftTable__msgLink}
                  href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  DM us
                </a>
              </p>
            </div>

            <div className={css.nftTable__hero__dashboard}>
              <div className={css.nftTable__hero__dashboard__item}>
                <p>Market Cap</p>
                <h4>{totalMarketCapInUsd}</h4>
                <p>{totalMarketCapInIcp}&nbsp;ICP</p>
              </div>

              <div className={css.nftTable__hero__dashboard__item}>
                <p>All Time Sales Volume</p>
                <h4>{totalVolumeInUsd}</h4>
                <p>{totalVolumeInIcp}&nbsp;ICP</p>
              </div>
            </div>
          </div>

          <div>
            <SearchBar
              searchValue={searchNftsValue}
              handleSearch={handleSearchNfts}
              inputName="nft-list-search"
            />
            <div style={{ overflowX: "auto" }}>
              <table className={css.nftTable__table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Volume</th>
                    <th>Sales</th>
                    <th>Listings</th>
                    <th>Minted&nbsp;NFTs</th>
                    <th>Min.&nbsp;Sale&nbsp;Price</th>
                    <th>Max.&nbsp;Sale&nbsp;Price</th>
                    <th>Avg.&nbsp;Price</th>
                    <th>Est.&nbsp;Market&nbsp;Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {nftItems
                    .filter((n) => {
                      if (searchNftsValue == "") {
                        return n;
                      } else if (
                        n.name
                          .toLowerCase()
                          .includes(searchNftsValue.toLowerCase())
                      ) {
                        return n;
                      }
                    })
                    .slice(0, itemsVisible)
                    .map((n, i) => (
                      <tr key={n.name}>
                        <td data-label="#">{i + 1}</td>

                        <td data-label="Name">
                          <a
                            className={css.nftCollectionLink}
                            href={n.market}
                            target="_blank"
                            rel="norefferer noopener"
                          >
                            <img src={n.img} alt={n.name} />
                            {n.name}
                          </a>
                        </td>

                        <td data-label="Volume">
                          <div className={css.cell}>
                            {n.salesInIcpFormatted}&nbsp;ICP
                            <span className={css.cellSpan}>
                              {n.volumeUsdFormatted}
                            </span>
                          </div>
                        </td>

                        <td data-label="Sales">{n.sales}</td>

                        <td data-label="Listings">{n.listings}</td>

                        <td data-label="Assets">{n.totalAssetsFormatted}</td>

                        <td data-label="Min Sale Price">
                          {n.minSalePrice
                            ? `${n.minSalePrice} ICP`
                            : n.maxSalePrice == "Airdrop"
                            ? "Airdrop"
                            : null}
                        </td>

                        <td data-label="Max. Sale Price">
                          {n.maxSalePrice && n.maxSalePrice != "Airdrop"
                            ? `${n.maxSalePrice} ICP`
                            : n.maxSalePrice == "Airdrop"
                            ? n.maxSalePrice
                            : null}
                        </td>

                        <td data-label="Avg. Price">
                          <div className={css.cell}>
                            {n.avgPrice}&nbsp;ICP
                            <span
                              className={
                                Math.sign(n.profitToAvg) >= 0
                                  ? `${css.cellSpan} ${css.green}`
                                  : `${css.cellSpan} ${css.red}`
                              }
                            >
                              {n.profitToAvg
                                ? `${n.profitToAvg}% (to max sale price)`
                                : null}
                            </span>
                          </div>
                        </td>

                        <td data-label="Est. Market Cap">
                          <div className={css.cell}>
                            {n.marketCapInIcpFormatted}&nbsp;ICP
                            <span className={css.cellSpan}>
                              {n.marketCapInUsdFormatted}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={css.nftTable__loadMoreBtn}>
            <button onClick={showMoreItems}>
              Load more projects &#40;+12&#41;
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default NftList;