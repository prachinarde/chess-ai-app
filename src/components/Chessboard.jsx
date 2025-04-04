import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { fetchAIMove } from "../api";
import { toast } from "react-toastify";

const ChessGame = ({ selectedAI, apiKey }) => {
  const [game, setGame] = useState(new Chess());
  const [isAIThinking, setIsAIThinking] = useState(false);

  const getTurnMessage = () => {
    const turn = game.turn();
    return turn === "w"
      ? "Your turn!"
      : `${selectedAI ? `${selectedAI}'s` : "AI's"} turn...`;
  };

  const makeAIMove = async () => {
    if (game.turn() === "w" || !selectedAI) return;

    setIsAIThinking(true);
    const fen = game.fen();
    console.log("AI Turn: Fetching move for position ->", fen);

    try {
      const aiMove = await fetchAIMove(fen, selectedAI, apiKey);
      console.log("AI Response:", aiMove);

      if (!aiMove || !aiMove.from || !aiMove.to) {
        console.error("AI returned an invalid move:", aiMove);
        toast.error("AI returned an invalid move!");
        setIsAIThinking(false);
        return;
      }

      const newGame = new Chess(game.fen());
      const validMove = newGame.move({
        from: aiMove.from,
        to: aiMove.to,
        promotion: aiMove.promotion || "q",
      });

      if (!validMove) {
        console.error("AI attempted an illegal move:", aiMove);
        toast.error("AI attempted an illegal move!");
        setIsAIThinking(false);
        return;
      }

      setGame(newGame);
      console.log("AI Move Played:", validMove);
    } catch (error) {
      console.error("Error fetching AI move:", error);
      toast.error("Error fetching AI move!");
    } finally {
      setIsAIThinking(false);
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    const newGame = new Chess(game.fen());
    const piece = newGame.get(sourceSquare);

    if (!piece) {
      console.error("No piece at source:", sourceSquare);
      toast.error("Invalid move! No piece at source.");
      return false;
    }

    const isPromotion =
      piece.type === "p" &&
      ((piece.color === "w" && targetSquare[1] === "8") ||
        (piece.color === "b" && targetSquare[1] === "1"));

    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: isPromotion ? "q" : undefined,
    });

    if (!move) {
      console.error(`Invalid move: { from: ${sourceSquare}, to: ${targetSquare} }`);
      toast.error("Invalid move! Please try again.");
      return false;
    }

    setGame(newGame);

    if (newGame.turn() !== "w") {
      setTimeout(() => makeAIMove(), 1000);
    }

    return true;
  };

  useEffect(() => {
    if (game.turn() !== "w" && selectedAI) {
      makeAIMove();
    }
  }, [game, selectedAI]);

  return (
    <div className="chess-container">
      <h2>Chess Game: {selectedAI ? `Playing against ${selectedAI}` : "2 Players"}</h2>
      <p className="turn-indicator">{getTurnMessage()}</p>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      {isAIThinking && <p>AI is thinking...</p>}
    </div>
  );
};

export default ChessGame;
