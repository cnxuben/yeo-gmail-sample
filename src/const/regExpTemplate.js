export default {
  trelloCardOnBoard: {
    startMode: /the card.*?on/,
    endMode: /the card.*?on.*?\(/
  },
  trelloBoard: {
    startMode: /to the board/,
    endMode: /to the board.*?\(/
  },
  trelloInvite: {
    // 2 \s as 1 carriage return, meaning: \s\s = carriage return
    startMode: /--\s\s\s\s.*?.\s\s/,
    endMode: /--\s\s\s\s.*?.\s\s/
  }
}
