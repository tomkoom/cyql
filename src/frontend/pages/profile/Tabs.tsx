import React, { FC } from "react"
import styled from "styled-components"
import type { Tabs } from "@/state/_types/curated_projects_types"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setProfileTab, selectProfile } from "@/state/profile/profile"

const activeStyle = {
  backgroundColor: "var(--highlight1)",
}

const Tabs: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const tab = useAppSelector(selectProfile).tab

  const updateTab = (tab: Tabs): void => {
    dispatch(setProfileTab(tab))
  }

  return (
    <TabsStyled>
      <li style={tab === "wallet" ? activeStyle : null} onClick={() => updateTab("wallet")}>
        Wallet
      </li>

      <li style={tab === "upvotes" ? activeStyle : null} onClick={() => updateTab("upvotes")}>
        Upvotes
      </li>
    </TabsStyled>
  )
}

const TabsStyled = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--fsText);

  > li {
    flex: 1;
    padding: 0.7rem;
    background-color: var(--underlay1);
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      background-color: var(--underlay2);
    }
  }
`

export default Tabs
