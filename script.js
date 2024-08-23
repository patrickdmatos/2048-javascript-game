const gameBoard = document.getElementById("game-board");
const scoreContainer = document.getElementById("score");
let score = 0;

function createTile(value) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.textContent = value === 0 ? "" : value;
  tile.setAttribute("data-value", value);
  return tile;
}

function initializeBoard() {
  for (let i = 0; i < 16; i++) {
    const tile = createTile(0);
    gameBoard.appendChild(tile);
  }
}

function addRandomTile() {
  const emptyTiles = Array.from(
    document.querySelectorAll(".tile[data-value='0']")
  );
  if (emptyTiles.length > 0) {
    const randomTile =
      emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    randomTile.textContent = value;
    randomTile.setAttribute("data-value", value);
  }
}

function updateScore(newPoints) {
  score += newPoints;
  scoreContainer.textContent = score;
}

function slideTiles(row) {
  const tiles = row.filter((tile) => tile !== 0);
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] === tiles[i + 1]) {
      tiles[i] *= 2;
      updateScore(tiles[i]);
      tiles[i + 1] = 0;
    }
  }
  return tiles.filter((tile) => tile !== 0);
}

function moveTiles(direction) {
  let tiles = Array.from(document.querySelectorAll(".tile")).map((tile) =>
    Number(tile.getAttribute("data-value"))
  );
  let moved = false;

  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      let index;
      if (direction === "left") {
        index = i * 4 + j;
      } else if (direction === "right") {
        index = i * 4 + (3 - j);
      } else if (direction === "up") {
        index = j * 4 + i;
      } else if (direction === "down") {
        index = (3 - j) * 4 + i;
      }
      row.push(tiles[index]);
    }

    let newRow = slideTiles(row);
    while (newRow.length < 4) {
      newRow.push(0);
    }

    for (let j = 0; j < 4; j++) {
      let index;
      if (direction === "left") {
        index = i * 4 + j;
      } else if (direction === "right") {
        index = i * 4 + (3 - j);
      } else if (direction === "up") {
        index = j * 4 + i;
      } else if (direction === "down") {
        index = (3 - j) * 4 + i;
      }
      if (tiles[index] !== newRow[j]) {
        moved = true;
        tiles[index] = newRow[j];
      }
    }
  }

  document.querySelectorAll(".tile").forEach((tile, index) => {
    tile.textContent = tiles[index] === 0 ? "" : tiles[index];
    tile.setAttribute("data-value", tiles[index]);
  });

  if (moved) addRandomTile();
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveTiles("left");
      break;
    case "ArrowRight":
      moveTiles("right");
      break;
    case "ArrowUp":
      moveTiles("up");
      break;
    case "ArrowDown":
      moveTiles("down");
      break;
  }
}

initializeBoard();
addRandomTile();
addRandomTile();
document.addEventListener("keydown", handleKeyPress);
