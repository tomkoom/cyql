import React, { FC } from "react"
import styled from "styled-components"

const Token: FC = (): JSX.Element => {
  return (
    <TokenStyled>
      <div className="title">content</div>
    </TokenStyled>
  )
}

const TokenStyled = styled.div`
  text-align: center;

  > div.title {
    h5 {
      margin-bottom: 0.25rem;
    }

    p {
      color: var(--secondaryColor);
    }
  }
`

export default Token
