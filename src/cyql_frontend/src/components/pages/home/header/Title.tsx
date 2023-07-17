import React, { FC } from "react";
import styled from "styled-components";
import { device } from "@/styles/breakpoints";
import iclogo from "../../../../../assets/ic-logo.svg";

// routes
import { toApps } from "@/routes/routes";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectProjects } from "@/state/projects";

const Title: FC = (): JSX.Element => {
  const projects = useAppSelector(selectProjects).filter((project) => project.data.archived !== true);
  const projectsNum = projects.length;

  return (
    <TitleStyled>
      curated list of{" "}
      {projectsNum > 0 ? (
        <ProjectsNum onClick={toApps}>{projectsNum}</ProjectsNum>
      ) : (
        <Dots>...</Dots>
      )}{" "}
      <Badge>
        <img src={iclogo} alt="Internet Computer iclogo" />
        <span>#InternetComputer</span>
      </Badge>{" "}
      projects
    </TitleStyled>
  );
};

const TitleStyled = styled.h2`
  max-width: 36rem;
  font-size: var(--fs1);
  font-weight: var(--fwBlack);
  line-height: 125%;

  @media ${device.mobileL} {
    font-size: var(--fs2);
  }
`;

const ProjectsNum = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const Dots = styled.span`
  color: var(--tertiaryColor);
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs4);
  padding: 0 1rem;
  border-radius: 4rem;
  background-color: var(--underlay1);

  > img {
    height: 2rem;
  }
`;

export default Title;
