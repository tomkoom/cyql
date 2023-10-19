import React, { FC } from "react"
import styled from "styled-components"

// hooks
import useNav from "@/hooks/useNav"

const StaffPicks: FC = (): JSX.Element => {
  const { toProject } = useNav()

  const staffPicksItems = [
    {
      id: "iKxyXmT6aF1a",
      title: "NFID",
      text: "identity layer for the internet",
    },
    {
      id: "Ia53VeLrQdfS",
      title: "ME Wallet",
      text: "a powerful multichain wallet",
    },
    {
      id: "bwPjciHfNxGE",
      title: "#TAGGR",
      text: "decentralized social network",
    },
    {
      id: "MErXd1cd7U6E",
      title: "Funded",
      text: "web3 crowdfunding",
    },
    {
      id: "QX8lS9ogfjBJ",
      title: "OpenChat",
      text: "decentralized chat app",
    },
    {
      id: "mRswh7bVbXb7",
      title: "Rabbithole",
      text: "🔒 encrypted file storage",
    },
    {
      id: "1iUXcIQgMBIK",
      title: "Carbon Crowd",
      text: "decarbonise cloud computing",
    },
    {
      id: "Z2v9LWotQCT7",
      title: "Canlista",
      text: "community canister registry",
    },
    {
      id: "49ZWVBKMxiMa",
      title: "ICPCoins",
      text: "ic cryptocurrencies by market cap",
    },
    {
      id: "cuGuRsmwd3kP",
      title: "Blast",
      text: "install & share immutable contracts",
    },
    {
      id: "oOxbIjZpQPXx",
      title: "NNSCat",
      text: "filter and compare NNS proposals",
    },
  ]

  const openProject = (id: string): void => {
    toProject(id)
  }

  return (
    <StaffPicksStyled>
      <h3>staff picks</h3>

      <ul>
        {staffPicksItems.map((item, i) => (
          <li onClick={() => openProject(item.id)} key={i}>
            <span>{item.title}</span>
            <span id="text">{item.text}</span>
          </li>
        ))}
      </ul>
    </StaffPicksStyled>
  )
}

const StaffPicksStyled = styled.div`
  margin-bottom: 1rem;

  > h3 {
    font-size: var(--fs6);
    font-weight: var(--fwBold);
    color: var(--secondaryColor);
    margin-bottom: 0.5rem;
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;

    > li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: var(--fsText);
      font-weight: var(--fwMedium);
      background-color: var(--underlay1);
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;

      > span#text {
        font-size: var(--fs7);
        opacity: 80%;
      }
    }
  }
`

export default StaffPicks
