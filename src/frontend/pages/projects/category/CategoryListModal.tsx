import React, { Dispatch, FC, SetStateAction } from "react"
import styled from "styled-components"
import { CrossIcon } from "@/components/icons/_index"
import { getCategoryNum } from "@/utils/_index"
import { Btn } from "@/components/btns/_index"
import { useBackend, useQueryParams } from "@/hooks/_index"
import { RefreshProjectsParams } from "@/state/_types/curated_projects_types"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveCuratedProjects } from "@/state/curatedProjects"
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"

interface CategoryListModalProps {
  openCategoryList: boolean
  setOpenCategoryList: Dispatch<SetStateAction<boolean>>
}

const CategoryListModal: FC<CategoryListModalProps> = ({
  openCategoryList,
  setOpenCategoryList,
}): JSX.Element => {
  const { refreshPaginated } = useBackend()
  const { refreshProjectsParams } = useQueryParams()
  const projects = useAppSelector(selectActiveCuratedProjects)
  const categoriesSorted = useAppSelector(selectCategoriesSortedByNum)

  const refresh = async (updatedCategory: string): Promise<void> => {
    try {
      const args: RefreshProjectsParams = {
        ...refreshProjectsParams,
        category: updatedCategory,
      }
      await refreshPaginated(args)
    } catch (error) {
      throw new Error(error)
    }
  }

  const closeModal = (): void => {
    setOpenCategoryList(false)
  }

  const setCategory = async (updatedCategory: string): Promise<void> => {
    try {
      await refresh(updatedCategory)
      closeModal()
    } catch (error) {
      throw new Error(error)
    }
  }

  const reset = async (): Promise<void> => {
    try {
      const updatedCategory = "All"
      await refresh(updatedCategory)
    } catch (error) {
      throw new Error(error)
    }
  }

  if (!openCategoryList) {
    return null
  }

  return (
    <CategoryListModalStyled>
      <Content>
        <CrossIcon onClick={closeModal} />
        <h3>Filter by Category</h3>

        <Categories>
          {categoriesSorted.map((c) => (
            <li
              key={c.id}
              id={
                refreshProjectsParams.category.toLowerCase() === c.label.toLowerCase()
                  ? "active"
                  : null
              }
              onClick={() => setCategory(c.label)}
            >
              <span className="label">{c.label}</span>
              <span className="num">{getCategoryNum(projects, c.label).toString()}</span>
            </li>
          ))}
        </Categories>

        {refreshProjectsParams.category !== "All" && (
          <Btn style={{ width: "100%" }} btnType={"secondary"} text={"Reset"} onClick={reset} />
        )}
      </Content>
    </CategoryListModalStyled>
  )
}

const CategoryListModalStyled = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: var(--background);
  padding: 1rem;

  /* overflow */
  height: 100%;
  overflow: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const Categories = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  font-weight: var(--fwMedium);
  margin: 0.5rem 0;

  > li {
    height: 2.75rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
    padding: 0 0.75rem;
    background-color: var(--underlay1);
    font-size: var(--fsText);
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      background-color: var(--underlay2);
    }

    &#active {
      color: var(--background);
      background-color: var(--primaryColor);
      box-shadow: unset;
    }

    > span.num {
      color: var(--tertiaryColor);
    }
  }
`

export default CategoryListModal
