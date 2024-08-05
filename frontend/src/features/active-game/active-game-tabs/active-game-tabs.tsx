import { useEffect, useState } from "react";
import { Menu, type MenuProps } from "antd";
import { OpenAIFilled } from "@ant-design/icons";
import { Game, Summoner } from "../../../libs/league/league-types";
import { getTeams } from "../../../libs/league/league-utils";
import { useNavigate, useLocation } from "react-router-dom";
import { GameOverview } from "./game-overview.tsx/game-overview";
import { Allies } from "./allies/allies";
import { Enemies } from "./enemies/enemies";
import ChatComponent from "../../chat/chat";

export const ActiveGameTabs = ({ game }: { game: Game | null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { allies, enemies } = getTeams(game);
  const [selectedView, setSelectedView] = useState<string>("overview");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get("view");
    if (view) {
      setSelectedView(view);
    }
  }, [location.search]);

  const handleChangeView: MenuProps["onClick"] = (e) => {
    const newView = e.key;
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("view", newView);
    navigate(`${location.pathname}?${queryParams.toString()}`);
    setSelectedView(newView);
  };

  const items: MenuProps["items"] = [
    {
      label: "Infernal AI",
      key: "chat",
      icon: <OpenAIFilled />,
      // disabled: true,
    },
    {
      label: "Enemy Team",
      key: "enemies",
      children: enemies?.map((enemy: Summoner) => {
        return {
          label: enemy.championName,
          key: `${enemy.puuid}`, // Ensure keys are unique
        };
      }),
    },
    {
      label: "Ally Team",
      key: "allies",
      children: allies?.map((ally: Summoner) => {
        return {
          label: ally.championName,
          key: `${ally.puuid}`, // Ensure keys are unique
        };
      }),
    },
    {
      label: "Game Overview",
      key: "overview",
    },
  ];
  return (
    <div className="flex flex-col flex-1">
      <Menu
        onClick={handleChangeView}
        selectedKeys={[selectedView]}
        mode="horizontal"
        items={items}
        style={{ backgroundColor: "transparent" }}
      />
      <div className="flex flex-col p-5">
        {selectedView === "overview" && <GameOverview />}
        {selectedView === "chat" && (
          <ChatComponent gameId={game?.gameId as number} />
        )}
        {allies?.map((ally) => ally.puuid).includes(selectedView) && (
          <Allies
            summoners={game?.participants}
            allyPuuid={selectedView}
            searchedSummonerPuuid={game?.searchedSummoner?.puuid}
          />
        )}
        {enemies?.map((enemy) => enemy.puuid).includes(selectedView) && (
          <Enemies
            summoners={game?.participants}
            enemyPuuid={selectedView}
            searchedSummonerPuuid={game?.searchedSummoner?.puuid}
          />
        )}
      </div>
    </div>
  );
};
