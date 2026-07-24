import React, { useEffect, useState } from 'react'
import styles from './styles/App.module.css'
import Board from './components/Board'
import Scoreboard from './components/Scoreboard'
import Controls from './components/Controls'
import MoveHistory from './components/MoveHistory'
import TurnIndicator from './components/TurnIndicator'
import ThemeToggle from './components/ThemeToggle'
import Modal from './components/Modal'
import useGameState from './hooks/useGameState'

export default function App() {
  const game = useGameState()
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = highContrast ? 'high-contrast' : 'default'
  }, [highContrast])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tic Tac Toe</h1>
        <div className={styles.headerControls}>
          <ThemeToggle highContrast={highContrast} onToggle={() => setHighContrast(v => !v)} />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.left}>
          <TurnIndicator current={game.currentPlayer} />
          <Board
            board={game.currentBoard}
            onSquareClick={game.makeMove}
            previewIndex={game.previewIndex}
            setPreviewIndex={game.setPreviewIndex}
            disabled={game.isOver}
            focusedIndex={game.focusedIndex}
            setFocusedIndex={game.setFocusedIndex}
          />
          <MoveHistory history={game.history} jumpTo={game.jumpTo} currentMove={game.currentMove} />
        </section>

        <aside className={styles.right}>
          <Scoreboard scores={game.scores} />
          <Controls
            onNewGame={game.resetBoard}
            onUndo={game.undo}
            onResetScores={game.resetScores}
            soundEnabled={game.soundEnabled}
            toggleSound={game.toggleSound}
            canUndo={game.canUndo}
          />
        </aside>
      </main>

      <Modal open={game.winner || game.isDraw} onClose={() => {}}>
        {game.winner ? (
          <div className={styles.modalContent}>
            <h2>Winner: {game.winner}</h2>
            <p>Congratulations to {game.winner}!</p>
            <button onClick={game.resetBoard}>New Game</button>
          </div>
        ) : null}
        {game.isDraw ? (
          <div className={styles.modalContent}>
            <h2>Draw</h2>
            <p>It's a tie — well played!</p>
            <button onClick={game.resetBoard}>New Game</button>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
