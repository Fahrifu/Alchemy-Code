export const alchemicalSymbols = [
    { name: "Gold", symbol: "☉", atomicNumber: 79 },
    { name: "Silver", symbol: "☽", atomicNumber: 47 },
    { name: "Mercury", symbol: "☿", atomicNumber: 80 },
    { name: "Copper", symbol: "♀", atomicNumber: 29 },
    { name: "Iron", symbol: "♂", atomicNumber: 26 },
    { name: "Tin", symbol: "♃", atomicNumber: 50 },
    { name: "Lead", symbol: "♄", atomicNumber: 82 },
    { name: "Antimony", symbol: "🜲", atomicNumber: 51 },
    { name: "Arsenic", symbol: "🜺", atomicNumber: 33 },
    { name: "Sulfur", symbol: "🜍", atomicNumber: 16 },
    { name: "Salt", symbol: "🜔", atomicNumber: null }, 
    { name: "Aqua Regia", symbol: "🜆", atomicNumber: null }, // mixture
    { name: "Aqua Fortis", symbol: "🜅", atomicNumber: null }, // nitric acid
    { name: "Vitriol", symbol: "🜖", atomicNumber: null }, 
    { name: "Earth", symbol: "🜃", atomicNumber: null }, 
    { name: "Air", symbol: "🜁", atomicNumber: null },
    { name: "Fire", symbol: "🜂", atomicNumber: null },
    { name: "Water", symbol: "🜄", atomicNumber: null },
    { name: "Helium", symbol: "He", atomicNumber: 2 },
    { name: "Argon", symbol: "Ar", atomicNumber: 18 }

  ];
  

  export const symbolMap = Object.fromEntries(
    alchemicalSymbols.map(entry => [entry.name.toLowerCase(), entry.symbol])
  );
  
  export default alchemicalSymbols & symbolMap;