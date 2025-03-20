# Alchemy-Code


# Challenge 2
Given the following poem:
```text
"Still flows the Icy Lethe, Veiling all 'neath Eldritch Rime"
```
We can see that the uppercase stands out and make a word out of it.

Tasked at hand:
- [x] **Extracts only the uppercase letters from the poem**
- [x] **Combines the extracted letter into a single word**
- [x] **Sends the answer to /answer**

## Approach

The poem is stored as a string variable

```Javascript
const poem = "Still flows the Icy Lethe, Veiling all ’neath Eldritch Rime";
```

We use a RegExp to find all uppercase letters (A-Z) in the given text

```javascript
const extractedWord = poem.match(/A-Z/g).join('');
```

**Explanation of ```/[A-Z]/g```** 

- [A-Z] -> Matches any single uppercase letter
- g (Global flag) -> Ensures the search continues throughout the entire string instead stopping at first found.

The output from match() and join('') should return:
```Javascript
['SILVER']
```
