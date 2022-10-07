function uniq(word) {
  let wordReverse = word.split("").reverse().join("");
  let result = "";
  for (let i = 0; i < wordReverse.length; i++) {
    if (wordReverse[i] === wordReverse[i + 1]) {
      continue;
    } else {
      result += wordReverse[i];
    }
  }
  return result;
}
