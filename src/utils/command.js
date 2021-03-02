const chalk = require("chalk");
const command = () => {
  try {
    if (process.argv.length < 4) {
      throw new Error("not enough argument!");
    }
    if (process.argv[2] !== "weather") {
      throw new Error("Enter a valid command");
    }
    const option = process.argv[3].split("");
    const optionLabel = option
      .slice(
        2,
        option.findIndex((el) => el === "=")
      )
      .join("");

    const optionValue = option
      .slice(option.findIndex((el) => el === "=") + 1)
      .join("");
    if (optionLabel !== "address" || optionValue === "") {
      throw new Error("Enter an adress or a valid adress");
    }
    return optionValue;
  } catch (error) {
    console.log(`${chalk.bgRed("error :")} ${chalk.red(error)}`);
  }
};

module.exports = command;
