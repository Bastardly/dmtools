import { RollDice } from "../rollDice";
import { Combat } from "./combat";
import { Topics } from "./topics";

export function Sidebar() {
  // const onClick = () => {
  //   switch (activeTabId) {
  //     // todo combat
  //     case "Players": {
  //       const [playerId, player] = createPlayer();
  //       player.playedBy =
  //         window.prompt("Who is the player?") || "Unnamed Player";

  //       return updateCreatePlayer(playerId, player);
  //     }
  //   }
  // };

  return (
    <div className="sidebar">
      <RollDice />
      <Topics />
      <Combat />
    </div>
  );
}
