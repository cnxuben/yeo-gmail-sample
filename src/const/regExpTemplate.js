export default {
  trelloCardOnBoard: {
    startMode: /the card.*?on/,
    endMode: /the card.*?on.*?\(/
  },
  trelloBoard: {
    startMode: /to the board/,
    endMode: /to the board.*?\(/
  }
}
