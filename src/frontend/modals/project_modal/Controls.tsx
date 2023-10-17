import React, { FC, useState } from "react"
import styled from "styled-components"

// project id
import { projectId } from "@/utils/projectId"

// components
import { Btn } from "@/components/btns/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProject, setCloseProjectModal } from "@/state/modals/project_modal/projectModal"
import {
  setProjectModalLoadingSet,
  setProjectModalLoadingDel,
} from "@/state/modals/project_modal/projectModalLoading"

const Controls: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const project = useAppSelector(selectProject)

  const submitProject = async (): Promise<void> => {
    dispatch(setProjectModalLoadingSet(true))
    const timestamp = Date.now()
  }

  return (
    <ControlsStyled>
      {/* {deleteConfirm === false ? (
        <DeleteBtn>
          <Btn btnType="secondary" text="delete" onClick={confirmDeletion} />
        </DeleteBtn>
      ) : (
        <DeleteContainer>
          <Btn btnType="secondary" text="cancel" onClick={cancelDeletion} />
          <Btn btnType="secondary" text="confirm" onClick={deleteProject} />
        </DeleteContainer>
      )}

      <Btn btnType="secondary" text="cancel" onClick={closeModal} />
      <Btn btnType="primary" text="save" onClick={submitProject} /> */}
    </ControlsStyled>
  )
}

const ControlsStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
`

const DeleteBtn = styled.div`
  margin-right: auto;
`

const DeleteContainer = styled.div`
  margin-right: auto;
  display: flex;
  gap: 0.75rem;
`

export default Controls
