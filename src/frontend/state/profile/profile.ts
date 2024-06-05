import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Project, Tabs } from "@/state/_types/curated_projects_types"

interface ProfileState {
  tab: Tabs
  upvotedProjects: Project[]
}

const initialState: ProfileState = {
  tab: "wallet",
  upvotedProjects: [],
}

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileTab(state, { payload }: PayloadAction<Tabs>) {
      state.tab = payload
    },
    setProfileUpvotedProjects(state, { payload }: PayloadAction<Project[]>) {
      state.upvotedProjects = payload
    },
  },
})

export const selectProfile = (state: RootState) => state.profile

export const { setProfileTab, setProfileUpvotedProjects } = profile.actions
export default profile.reducer
