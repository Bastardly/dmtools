import "./app.scss";
import { Tabs } from "ui/structure/tabs";
import { useAppState } from "hooks/useAppState";
import { AppContext } from "hooks/useAppContext";
import { ITabRoute } from "types";
import { Sidebar } from "ui/structure/sidebar";
import { TopicContent } from "ui/structure/topicContent";
import { Settings } from "ui/structure/settings";
import { CombatInfo } from "ui/structure/combat/combatInfo";
import { CombatEnemyTemplates } from "ui/structure/combat/enemyTemplates";
import { EnemyBattle } from "ui/structure/combat/createBattle";

interface IRoutes {
  activeRoute: string;
  routes: ITabRoute[];
}

const Routes = ({ activeRoute }: IRoutes) => {
  switch (activeRoute) {
    case "/players":
      return <div>Players</div>;
    case "/recap":
    case "/places":
    case "/plots":
    case "/npcs":
      return <TopicContent />;
    case "/combat":
      return <CombatInfo />;
    case "/combat/enemy_templates":
      return <CombatEnemyTemplates />;
    case "/combat/create_combat":
      return <EnemyBattle />;
    case "/settings": {
      return <Settings />;
    }
  }

  return <div>404</div>;
};

function App() {
  const { state, actions, routes, activeRoute, navigateTo } = useAppState();

  if (process.env.NODE_ENV === "development") {
    console.log(state);
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{ state, actions, routes, activeRoute, navigateTo }}
      >
        <Tabs routes={routes} />
        <div className="appContainer">
          <Sidebar />
          <div className="contentContainer">
            <Routes activeRoute={activeRoute} routes={routes} />
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
