import { useState, useEffect } from "react";
import { Card, Spin, Typography } from "antd";
import { Game, Summoner } from "../../libs/league/league-types";
import { getMatchHistory } from "../../libs/league/league-apis";
import { formatDistanceToNow } from "date-fns";
import { formatGameDurationFromMs } from "../../libs/general/utilities";

interface HistoryBlockProps {
  game: any | null;
}

const HistoryBlock: React.FC<{ game: any }> = ({ game }) => {
  const timeAgo = game
    ? formatDistanceToNow(new Date(game.gameCreation), { addSuffix: true })
    : "";
  const gameDurationString = game
    ? formatGameDurationFromMs(game.gameDuration)
    : "N/A";

  // Set the border color based on the game result
  const borderColorClass = game?.win
    ? "border-l-8 border-l-[#99ccff]"
    : "border-l-8 border-l-[#ff9999]";

  return (
    <Card className={`${borderColorClass}`} styles={{ body: { padding: 12 } }}>
      <div className="flex text-xs">
        <div className="w-1/4">
          <Typography.Title level={5} style={{ margin: 0 }}>
            {game?.queueName}
          </Typography.Title>
          <div className="mb-3">{timeAgo}</div>
          <div>{game?.win ? "Victory" : "Defeat"}</div>
          <div>{gameDurationString}</div>
        </div>
      </div>
    </Card>
  );
};

interface MatchHistoryProps {
  summoner: Summoner;
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({ summoner }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      setIsLoading(true);
      const history = await getMatchHistory("na1", summoner.puuid);
      if (isMounted) {
        setGames(history || []);
        setIsLoading(false);
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
  }, [summoner]);

  return (
    <div className="pt-3 pr-3 rounded-lg flex flex-col">
      <div className="text-lg font-bold mb-2">{`${summoner.championName}'s Match History`}</div>
      <Spin spinning={isLoading}>
        <div
          className="flex-1 overflow-y-auto grid grid-cols-1 gap-2"
          style={{ height: "calc(70vh - 79px)" }}
        >
          {games.map((game, index) => (
            <HistoryBlock
              key={`${summoner?.championId}-${index}`}
              game={game}
            />
          ))}
        </div>
      </Spin>
    </div>
  );
};
