import Discord from "discord.js";

import emojis from "./emojis.js";

export const defaultMessage = (supportedGames) => {
    return new Discord.MessageEmbed()
        .setColor("#669900")
        .attachFiles(["./img/yorvex_logo.png"])
        .setAuthor("YorVeX Mitspielersuche", "attachment://yorvex_logo.png")
        .setTitle("Lobby creator")
        .setDescription("Type 'lobby <game>' to create a game lobby")
        .addField(
            "Available games:",
            `${supportedGames.map((game) => `${game.name} ${game.message}`).join("\n")}\n\n${emojis.clock} 
      Each lobby is valid for 30 minutes or until lobby creator doesn't remove it\n\n${emojis.smiley}`,
            true
        );
};

export const lobbyMessage = (game, players) => {
    const {displayName, name, size} = game;

    return new Discord.MessageEmbed()
        .setColor("#669900")
        .attachFiles(["./img/yorvex_logo.png", `./img/${name}.png`])
        .setThumbnail(`attachment://${name}.png`)
        .setAuthor("YorVeX Mitspielersuche", "attachment://yorvex_logo.png")
        .setTitle(`${displayName} lobby`)
        .addField("--------------------------", createLobbyList(size, players))
        .addField(`--------------------------`,
            `React with ${emojis.thumbsUp} to join the lobby.
            React with ${emojis.thumbsDown} to leave the lobby.
            Lobby creator react with ${emojis.checkMark} to ping players`
        );
};

export const startMessage = (game, players) => {
    game.displayName = game.name === "custom" ? "" : game.displayName;
    const {name, displayName, size} = game;

    players.slice(0, size - 1);

    return `Time to play ${displayName} ${players
        .map((player) => `<@${player}>`)
        .join(" ")}`;
};

export const cancelMessage = () => "Lobby was cancelled!";

const createLobbyList = (size, players) => {
    let text = "";
    for (let i = 0; i < size; i++) {
        text += `${emojis[i + 1]} `;

        if (players[i]) {
            text += `<@${players[i]}>`;
        }

        if (i + 1 !== size) {
            text += `\n`;
        }
    }

    return text;
};
