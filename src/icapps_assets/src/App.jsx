import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./Theme/theme.css";
import "./App.css";
import CookieConsent from "react-cookie-consent";

// components
import { Nav, Footer, Homepage, Projects, ProjectPage, UpcomingNfts, Submit, NotFound } from "./Pages";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchIcpPrice } from "./State/icpPrice";
import { setProjects, setUpcomingNfts, setNftList, selectProjects } from "./State/siteData";
import { setFilterByCategory } from "./State/projectsFiltering";
import { selectTheme } from "./State/theme";

// google api
import useGoogleSheets from "use-google-sheets";
import k from "../../../k/k";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

const App = () => {
  const [category, setCategory] = useState("All");
  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["Apps", "NftList"],
  });

  // state
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const projects = useSelector(selectProjects);

  useEffect(() => {
    if (!loading) {
      const [dataProjects, dataNftList] = data;
      dispatch(setProjects({ value: dataProjects.data }));
      dispatch(
        setUpcomingNfts({
          value: dataProjects.data.filter(
            (project) =>
              project.nftSaleStatus === "Open" ||
              project.nftSaleStatus === "Over" ||
              project.nftSaleStatus === "Upcoming"
          ),
        })
      );
      dispatch(setNftList({ value: dataNftList.data }));
    }
  }, [loading]);

  // set icp price
  useEffect(() => {
    dispatch(fetchIcpPrice());
  }, []);

  // set filtered categories
  useEffect(() => {
    if (projects.length) {
      category == "All"
        ? dispatch(setFilterByCategory(projects))
        : dispatch(setFilterByCategory(projects.filter((p) => p.category === category)));
    }
  }, [projects, category]);

  return (
    <div className={`app ${theme}`}>
      <Route exact path={`/(|projects|upcoming|nft)`}>
        <Nav />
      </Route>

      <div className="app__content">
        <Switch>
          <Route exact path="/">
            <Homepage
              category={category}
              setCategory={setCategory}
              data={data}
              loading={loading}
              error={error}
            />
          </Route>

          <Route exact path="/projects">
            <Projects
              category={category}
              setCategory={setCategory}
              data={data}
              loading={loading}
              error={error}
            />
          </Route>

          <Route exact path="/projects/:id">
            <ProjectPage data={data} loading={loading} />
          </Route>

          <Route exact path="/upcoming">
            <UpcomingNfts />
          </Route>

          <Route exact path="/submit">
            <Submit />
          </Route>

          {/* not found */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>

      <Route exact path={`/(|projects|upcoming|nft)`}>
        <Footer />
      </Route>

      {/* cookies */}
      <CookieConsent
        cookieName="cookie"
        disableStyles={true}
        buttonText="Ok"
        containerClasses="cookie"
        contentClasses="cookie__content"
        buttonClasses="cookie__btn"
        expires={90}
      >
        This website uses 🍪{" "}
        <a
          className="cookie__link"
          href="https://bit.ly/icapps-cookies"
          rel="noreferrer noopener"
          target="_blank"
        >
          Learn more
        </a>
      </CookieConsent>
    </div>
  );
};

export default App;
