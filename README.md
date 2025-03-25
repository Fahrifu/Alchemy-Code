# 🧪 Alchemy-Code Challenge Series

This repository documents solutions for four cryptographic challenges involving decoding alchemical symbols, cipher texts, poetic clues, and symbolic grid scanning.

---

## Challenge 1 – Alchemical Symbol Decoder

**Goal:**  
Translate a string of alchemical symbols into their metal names and submit the decoded string.

### ✅ Tasks
- Map each alchemical symbol to its corresponding metal name.
- Construct a comma-separated string of these names.
- Submit the result to the API.

### Code Logic
```javascript
const code = ["☉", "☿", "☽", "♂", "☉"];
const alchemical_map = {
  "☉": "Gold",
  "☿": "Quicksilver",
  "☽": "Silver",
  "♂": "Iron"
};
const decoded = [];
for (let i = 0; i < code.length; i++) {
  const symbol = code[i];
  const element = alchemical_map[symbol];
  decoded.push(element);
}
const decodedSequence = decoded.join(",");
```
**Result:**  
`"Gold,Quicksilver,Silver,Iron,Gold"`

---

## Challenge 2 – Poetic Uppercase Extraction

**Goal:**  
Extract a hidden word formed by uppercase letters in a poem.

### ✅ Tasks
- Extract all uppercase letters.
- Combine into a single word.
- Submit the word as the answer.

### Code Logic
```javascript
const poem = "Still flows the Icy Lethe, Veiling all ’neath Eldritch Rime";
const extractedWord = poem.match(/[A-Z]/g).join('');
```
**Explanation:**  
- `[A-Z]`: Matches any uppercase character.
- `.join('')`: Combines them into a word.

**Result:**  
`"SILVER"`

---

## Challenge 3 – Cipher to Alchemical Symbols

**Goal:**  
Convert a numeric cipher to letters, form words, match them to alchemical symbols, and submit.

### ✅ Tasks
- Use a map to decode numbers into characters.
- Construct a sentence from the characters.
- Convert alchemical terms into symbols.
- Submit the result.

### Code Logic
```javascript
const words = cipher.split(/\s+/).map(n => {
  if (n === ',' || n === ';') return n;
  const num = parseInt(n, 10);
  return isNaN(num) ? n : (numberToChar[num] ?? '?');
});

let sentence = words.join('');
sentence = sentence.replace(/([a-z])([,.])/g, '$1$2')
                   .replace(/([,.])/g, '$1 ')
                   .replace(/\s+/g, ' ').trim();

const symbols = sentence.toLowerCase()
  .replace(/[.,;]/g, '')
  .split(/\s+/)
  .map(word => symbolMap[word] || null)
  .filter(Boolean)
  .join('');
```

**Result:**  
A string of alchemical symbols like `🜂☉🜄...`

---

## Challenge 4 – Cipher Grid Search

**Goal:**  
Decode a grid cipher using capital letters from a poem, search a symbol pattern, compute its atomic number, and find the corresponding alchemical element.

### ✅ Tasks
- Build a substitution cipher from poem capital letters.
- Decode an encrypted block.
- Convert words to alchemical symbols.
- Search for the pattern in a symbol grid.
- Compute the atomic number from position and submit the corresponding element.

### Code Logic Summary

**Extracting capital letters:**
```javascript
const capitalLetters = [...text].filter(char => /[A-Z]/.test(char)).join('');
```

**Building decryption map:**
```javascript
const decryptionMap = Object.fromEntries(
  capitalLetters.split('').map((c, i) => [c, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]])
);
```

**Decoding encrypted block:**
```javascript
const decoded = encodedBlock.trim().split('\n')
  .map(line => line.split(' ')
  .map(word => word.split('').map(char => decryptionMap[char] || char).join(''))
  .join(' '))
  .join('\n');
```

**Search pattern in grid and compute index:**
```javascript
const hIndex = (hMatch.row - 1) * maxCols + (hMatch.col - 1);
const vIndex = (vMatch.row - 1) * maxCols + (vMatch.col - 1);
const atomicNumber = hIndex + vIndex + 2;
const result = alchemicalSymbols.find(e => e.atomicNumber === atomicNumber)?.name;
```

**Result:**  
Element name (e.g., `"Gold"`) submitted as the final answer.

---

## Summary

| Challenge | Focus                             | Techniques                     |
|-----------|-----------------------------------|--------------------------------|
| 1         | Symbol Mapping                    | Object lookup, iteration       |
| 2         | Hidden Word Extraction            | Regex, pattern matching        |
| 3         | Numeric Cipher & Symbol Matching  | Mapping, string transformation |
| 4         | Substitution + Grid Search        | Cipher, 2D search, logic       |

This project demonstrates practical applications of ciphers, pattern recognition, symbol translation, and logic-based algorithms.