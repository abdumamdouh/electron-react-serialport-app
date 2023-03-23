export const writeToFile = async (data) => {
  try {
    await window.electron.fileSystem.writeFile(
      'data.json',
      JSON.stringify(data)
    );
  } catch (err) {
    console.error(err);
  }
};

export const readFromFile = async () => {
  try {
    const data = await window.electron.fileSystem.readFile('data.json');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};
