import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound/NotFound";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import { useDispatch } from "react-redux";
import { getProjects } from "./actions/projects";
import Auth from './components/Auth/Auth';


const App = () => {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => (
              <Home currentId={currentId} setCurrentId={setCurrentId} />
            )}
          />
          <Route
            exact
            path="/projectDetails"
            component={(props) => <ProjectDetails currentId={currentId} />}
          />
          <Route
            exact
            path="/auth"
            component={Auth}
          />
          <Route exact component={NotFound} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
