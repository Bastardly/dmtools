import random from "random";

interface IGenerateNameResponse {
  firstNames: string[];
  lastNames: string[];
}

const SPECIAL = "XXX";
const list = ["a", "e", "i", "o", "q", "u", "y", SPECIAL];
const specialList = ["ä", "á", "é", "ü"];

const getVowel = (omitQ?: boolean): string => {
  let char = list[random.int(0, list.length - 1)];

  if (omitQ && char === "q") {
    return getVowel(omitQ);
  }

  if (char === SPECIAL) {
    char = specialList[random.int(0, specialList.length - 1)];
  }

  return char;
};

const qFirstParts = [
  `Quin`,
  `Quid`,
  `Quad`,
  `Qual`,
  `Quest`,
  `Tiq`,
  `Taq`,
  `Toq`,
  `Qauk`,
  `Quan`,
  `Qua`,
  `Qul`,
];

const sharedFirstParts = (vowel: string) => [
  "Cher",
  "Lin",
  "Lan",
  "Theo",
  "Thor",
  "Char",
  "Chan",
  "Flem",
  "Sam",
  "Flag",
  "Tan",
  "Elo",
  "Ela",
  "Wad",
  "Gal",
  "Beo",
  "Khel",
  "Gan",
  `Fr${vowel}`,
  `L${vowel}ns`,
  `Od${vowel}n`,
  `L${vowel}ak`,
  `Fr${vowel}k`,
  `Fr${vowel}n`,
  `F${vowel}l`,
  `F${vowel}n`,
  `V${vowel}n`,
  `W${vowel}n`,
  `H${vowel}n`,
  `H${vowel}l`,
  `B${vowel}l`,
  `N${vowel}r`,
  `G${vowel}rk`,
  `Tr${vowel}`,
  `Tr${vowel}n`,
  `Tr${vowel}l`,
  `Th${vowel}n`,
  `V${vowel}`,
  `Tr${vowel}r`,
  `Thr${vowel}`,
  `Gr${vowel}`,
  `Ba${vowel}n`,
  `Ba${vowel}l`,
  `Fa${vowel}n`,
  `F${vowel}an`,
  `Fir${vowel}`,
  `Mir${vowel}`,
  `Mi`,
  `Mi${vowel}k`,
  `H${vowel}r`,
  `M${vowel}r`,
  `Ch${vowel}r`,
  `R${vowel}n`,
  `R${vowel}rz`,
  `W${vowel}l`,
  `Li${vowel}`,
  `Li${vowel}n`,
  `Li${vowel}k`,
];

const firstNameLast = (vowel: string) => [
  `k${vowel}n`,
  `k${vowel}nli`,
  `k${vowel}nlia`,
  `l${vowel}ia`,
  `v${vowel}ia`,
  `v${vowel}ck`,
  `w${vowel}ck`,
  `l${vowel}ck`,
  `b${vowel}`,
  `b${vowel}n`,
  `d${vowel}l`,
  `s${vowel}`,
  `s${vowel}l`,
  `l${vowel}w`,
  `r${vowel}w`,
  `r${vowel}k`,
  `r${vowel}l`,
  `r${vowel}n`,
  "lindria",
  "dria",
  "dra",
  "ben",
  "is",
  "ra",
  "do",
  "na",
  "ral",
  "rak",
  "ward",
  "ran",
  "ron",
  "sia",
  "lia",
  "lin",
  "ming",
  "lor",
  "ron",
  "dalf",
  "mia",
  "drian",
  "droan",
];

const surNameFirst = (vowel: string) => [
  "Battle",
  "Fire",
  "Stone",
  "Mist",
  "Rock",
  "War",
  "Blood",
  "Earth",
  "Sand",
  "Cliff",
  "Sin",
  "Ale",
  "Mead",
  "Vow",
  "Bond",
  "Gem",
  "Pike",
  "Oath",
  "Tree",
  "Leaf",
  "Silver",
  "Green",
  "Gold",
  "Dread",
  "Mana",
  "Night",
  "Knight",
  "Coffin",
  "Star",
  "Sea",
  "Orc",
  "Dragon",
  "Dead",
  "Death",
  "Hat",
  "Lich",
  "Thunder",
  "Steel",
  "Black",
  "White",
  "Axe",
  "Sun",
  "Lark",
  "Bird",
  "Tune",
  "Ice",
  "Frost",
  "Front",
  "Bright",
  "Swan",
  "Harp",
  "Blade",
  "Ara",
  "Ana",
  "Vale",
  "Valir",
  "Valen",
  `Fir${vowel}`,
  `Ur${vowel}`,
  `Ar${vowel}`,
  `Or${vowel}`,
  `Ir${vowel}`,
  `Er${vowel}`,
  `H${vowel}n`,
  `H${vowel}l`,
  `H${vowel}m`,
  `H${vowel}sh`,
  `D${vowel}`,
  `D${vowel}n`,
  `D${vowel}m`,
  `D${vowel}l`,
  `Dr${vowel}n`,
  `Dr${vowel}m`,
  `S${vowel}n`,
  `S${vowel}l`,
  `V${vowel}n`,
  `M${vowel}`,
];

const surNameLast = (vowel: string) => [
  // ...firstNameLast(vowel),
  "cutter",
  "crusher",
  "weaver",
  "dancer",
  "singer",
  "song",
  "smasher",
  "breaker",
  "hand",
  "keeper",
  "cleaver",
  "burn",
  "fall",
  "born",
  "son",
  "wood",
  "breath",
  "root",
  "daugther",
  "moon",
  "rose",
  "lily",
  "hammer",
  "bred",
  "walker",
  "breath",
  "forge",
  "ming",
  "nen",
  "ren",
  "ril",
  "er",
  "ward",
  "lick",
  "slayer",
  "tongue",
  "t",
  "s",
  "ish",
  `c${vowel}p`,
  `er${vowel}k`,
  `er${vowel}l`,
  `${vowel}k`,
  `fir${vowel}`,
  `${vowel}k`,
  `r${vowel}k`,
  `r${vowel}l`,
  `s${vowel}n`,
  `j${vowel}ro`,
  `j${vowel}ri`,
  `j${vowel}li`,
  `s${vowel}li`,
  `n${vowel}li`,
  `n${vowel}ri`,
];

const getFirstName = (): string => {
  const hasEnding = random.int(1, 20) > 1;
  let vowel = getVowel();
  let firstPart = "bob";

  if (vowel === "q") {
    // These names aren't singular names
    const qTemplates = [`Quinn`, `Quill`, ...qFirstParts];

    firstPart = qTemplates[random.int(0, qTemplates.length - 1)];
  } else {
    const templates = [
      ...sharedFirstParts(vowel),
      ...(!hasEnding
        ? []
        : [`S${vowel}nn`, `S${vowel}ll`, `C${vowel}ll`, `C${vowel}nn`]),
    ];

    firstPart = templates[random.int(0, templates.length - 1)];
  }

  if (!hasEnding) return firstPart;

  const endVowel = getVowel(true);
  const endings = firstNameLast(endVowel);

  return firstPart + endings[random.int(0, endings.length - 1)];
};

const getLastName = (): string => {
  let firstVowel = getVowel(true);
  const hasEnding = random.int(1, 20) > 1;

  const fistParts = surNameFirst(firstVowel);
  const firstPart = fistParts[random.int(0, fistParts.length - 1)];

  if (!hasEnding) return firstPart;

  let lastVowel = getVowel(true);

  const lastParts = surNameLast(lastVowel);
  const lastPart = lastParts[random.int(0, lastParts.length - 1)];

  return firstPart + lastPart;
};

export function generateNames(): IGenerateNameResponse {
  const firstNames: string[] = [];
  const lastNames: string[] = [];

  for (let i = 0; i < 11; i++) {
    // undgå dubletter
    let firstName = getFirstName();
    while (firstNames.includes(firstName)) {
      firstName = getFirstName();
    }

    let lastName = getLastName();

    while (lastNames.includes(lastName)) {
      lastName = getLastName();
    }

    firstNames.push(firstName);
    lastNames.push(lastName);
  }

  return {
    firstNames,
    lastNames,
  };
}
