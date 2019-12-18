"use strict";

module.exports = async (
  text = "ASCII THEME",
  font = "Slant Relief",
  themeName = "Monokai Dimmed",
  horizontalLayout = "default",
  verticalLayout = "default"
) => {
  let coloredData = "";
  let colorsIndex = 0;
  const theme = themes[themeName];
  let data;

  if (!themes[themeName]) {
    throw `"${themeName}" is not a supported theme. You can add it at https://github.com/AlexLakatos/ascii-themes.`;
  }

  data = await figlet.textSync(text, {
    font: font,
    horizontalLayout: horizontalLayout,
    verticalLayout: verticalLayout
  });

  if (themeName === "plain") {
    return data;
  }

  for (let i = 0; i < data.length; i++) {
    let character = data.charAt(i);
    if (character !== "_") {
      if (
        data.charAt(i - 1) == "_" ||
        data.charAt(i - 1) == " " ||
        data.charAt(i - 1) == "."
      ) {
        colorsIndex++;
        if (colorsIndex >= theme.colors.length) {
          colorsIndex = 0;
        }
      }
      coloredData += chalk
        .hex(theme.colors[colorsIndex])
        .bgHex(theme.background)(data.charAt(i));
    } else {
      coloredData += chalk.hex(theme.foreground).bgHex(theme.background)(
        data.charAt(i)
      );
    }
  }
  return coloredData;
};
