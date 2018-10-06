
/**
 * 
 * @param {array} words 
 */
function uniqueMorseRepresentation(words) {

  var morseArr = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
  var set = new Set();
  var code = '';
  for (var word of words) {
    for (var i = 0; i < word.length; i++) {
      code += morseArr[word.charCodeAt(i) - 'a'.charCodeAt()];
    }
    set.add(code);
    code = '';
  }

  console.log(set);
  return set.size;
}

console.log(uniqueMorseRepresentation(['abb', 'bcc', 'abb']));
