let characterIndex = 0;

const useCharacterIndex = () =>
  ({
    getNextIndex: () => {
      characterIndex += 2;
      console.log("from hook", characterIndex);
      alert(characterIndex);
      return characterIndex;
    },
    resetIndex: () => {
      characterIndex = 0;
    },
  } as const);

export default useCharacterIndex;
