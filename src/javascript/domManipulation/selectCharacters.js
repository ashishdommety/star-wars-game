import { state } from "../state";
import { createHealthBars } from "../render/createHealthBars";
import { checkWin } from "../gameLogic/checkWin";

export let selectCharacters = (character, container) => {
  container.addEventListener("click", function () {
    if (
      !state.characterSelected &&
      !state.opponentSelected &&
      state.selected === 0
    ) {
      let arena = document.getElementById("arena");
      arena.appendChild(container);
      let attackBtn = document.createElement("button");
      attackBtn.setAttribute("id", "attack-btn");
      attackBtn.innerText = "Attack";

      attackBtn.addEventListener("click", () => {
        state.opponent.health = state.opponent.health - state.user.attack;

        state.user.health = state.user.health - state.opponent.attack;

        let userHealth = document.getElementById("user-health");
        userHealth.innerText = state.user.health;
        let opponentHealth = document.getElementById("opponent-health");
        opponentHealth.innerText = state.opponent.health;

        checkWin();
      });

      arena.appendChild(attackBtn);
      state.characterSelected = true;
      state.selected = state.selected + 1;
      console.log(character);
      state.user = character;
      document.getElementById("notification").innerHTML = "Choose an opponent";
    } else if (
      state.characterSelected &&
      !state.opponentSelected &&
      state.selected === 1
    ) {
      let arena = document.getElementById("arena");
      arena.appendChild(container);
      state.opponentSelected = true;
      state.selected = state.selected + 1;
      console.log(character);
      state.opponent = character;
      document.getElementById("notification").innerHTML =
        "Begin the duel! May the force be with you.";
      document.getElementById("all-characters").style.display = "none";
      createHealthBars();
    }
  });
};
