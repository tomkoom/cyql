import React, { FC } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

// components
import { Controls, FormContent, Header } from "./_index"
import { Loading } from "@/components/ui/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import {
  selectProjectModalLoadingSet,
  selectProjectModalLoadingDel,
} from "@/state/modals/project_modal/projectModalLoading"
import { selectTheme } from "@/state/ui/theme"

interface ProjectModalProps {
  isOpen: boolean
}

const ProjectModal: FC<ProjectModalProps> = ({ isOpen }): JSX.Element => {
  const theme = useAppSelector(selectTheme)
  const setIsLoading = useAppSelector(selectProjectModalLoadingSet)
  const delIsLoading = useAppSelector(selectProjectModalLoadingDel)

  if (!isOpen) return null

  if (setIsLoading || delIsLoading) {
    return (
      <ProjectModalStyled className={theme}>
        <Loading />
      </ProjectModalStyled>
    )
  }

  return createPortal(
    <ProjectModalStyled className={theme}>
      <Main>
        <Header />

        <Form>
          <FormContent />
          <Controls />
        </Form>
      </Main>
    </ProjectModalStyled>,
    document.getElementById("modal")
  )
}

const ProjectModalStyled = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  color: var(--primaryColor);
  background-color: var(--background);
  padding: 2rem;

  /* overflow */
  height: 100%;
  overflow: auto;
`

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Form = styled.div`
  margin-top: 1rem;
`

export default ProjectModal
