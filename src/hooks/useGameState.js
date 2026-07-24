import { useCallback, useMemo, useState, useRef } from 'react'
import { checkWinner, isDraw } from '../utils/gameLogic'
import runConfetti from '../utils/confetti'

const emptyBoard = () => Array(9).fill(null)

export default function useGameState() {
  const [history, setHistory] = useState([emptyBoard()])
  const [currentMove, setCurrentMove] = useState(0)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0, total: 0 })
  const [soundEnabled, setSoundEnabled] = useState(false)

  const previewIndexRef = useRef(null)
  const [previewIndex, setPreviewIndex] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(0)

  const currentBoard = history[currentMove]

  const currentPlayer = useMemo(() => {
    const moves = history[currentMove].filter(Boolean).length
    return moves % 2 === 0 ? 'X' : 'O'
  }, [history, currentMove])

  const { winner, line } = useMemo(() => checkWinner(currentBoard), [currentBoard])
  const draw = useMemo(() => isDraw(currentBoard), [currentBoard])
  const isOver = Boolean(winner) || draw

  const canUndo = currentMove > 0 && !isOver

  const playClick = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = 600
      g.gain.value = 0.02
      o.connect(g)
      g.connect(ctx.destination)
      o.start()
      setTimeout(() => { o.stop(); ctx.close() }, 90)
    } catch (_) {}
  }, [soundEnabled])

  const playWin = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sawtooth'
      o.frequency.value = 220
      g.gain.value = 0.04
      o.connect(g)
      g.connect(ctx.destination)
      o.start()
      setTimeout(() => { o.stop(); ctx.close() }, 250)
    } catch (_) {}
  }, [soundEnabled])

  const makeMove = useCallback((index) => {
    if (isOver) return
    if (currentBoard[index]) return
    const player = currentPlayer
    const next = currentBoard.slice()
    next[index] = player
    const newHistory = history.slice(0, currentMove + 1).concat([next])
    setHistory(newHistory)
    setCurrentMove(newHistory.length - 1)
    playClick()
  }, [currentBoard, currentPlayer, history, currentMove, isOver, playClick])

  const undo = useCallback(() => {
    if (currentMove === 0) return
    setCurrentMove(m => Math.max(0, m - 1))
  }, [currentMove])

  const resetBoard = useCallback(() => {
    setHistory([emptyBoard()])
    setCurrentMove(0)
  }, [])

  const resetScores = useCallback(() => {
    setScores({ X: 0, O: 0, draws: 0, total: 0 })
  }, [])

  const jumpTo = useCallback((moveIndex) => {
    setCurrentMove(moveIndex)
  }, [])

  // watch for a winner/draw and update scores automatically
  const finishedRef = useRef({ lastProcessed: -1 })
  if ((winner || draw)) {
    const last = history.length - 1
    // only process the final move once
    if (currentMove === last && finishedRef.current.lastProcessed !== last) {
      finishedRef.current.lastProcessed = last
      if (winner) {
        setScores(s => ({ ...s, [winner]: s[winner] + 1, total: s.total + 1 }))
        playWin()
        // run confetti visual effect
        try { runConfetti() } catch (_) {}
      } else if (draw) {
        setScores(s => ({ ...s, draws: s.draws + 1, total: s.total + 1 }))
      }
    }
  }

  return {
    history,
    currentMove,
    currentBoard,
    currentPlayer,
    makeMove,
    undo,
    resetBoard,
    resetScores,
    jumpTo,
    winner,
    winningLine: line,
    isDraw: draw,
    isOver,
    scores,
    soundEnabled,
    toggleSound: () => setSoundEnabled(v => !v),
    previewIndex,
    setPreviewIndex: (i) => { previewIndexRef.current = i; setPreviewIndex(i) },
    previewIndexRef,
    focusedIndex,
    setFocusedIndex,
    playClick,
    playWin,
    canUndo
  }
}
