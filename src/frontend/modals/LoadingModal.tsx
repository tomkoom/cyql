import React, { FC } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { Spinner } from "@/components/ui/_index"

interface LoadingModalProps {
  isOpen: boolean
}

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"

const LoadingModal: FC<LoadingModalProps> = ({ isOpen }): JSX.Element => {
  const theme = useAppSelector(selectTheme)
  const text = ["Writing to chain 🔗..."]

  if (!isOpen) return null

  return createPortal(
    <LoadingModalStyled className={theme}>
      <Spinner />
      <p>{text[0]}</p>
    </LoadingModalStyled>,
    document.getElementById("modal")
  )
}

const LoadingModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: rgba(var(--backgroundRgb), 0.7);
  padding: 1rem;

  > p {
    color: var(--primaryColor);
    font-size: var(--fsText);
  }
`

export default LoadingModal