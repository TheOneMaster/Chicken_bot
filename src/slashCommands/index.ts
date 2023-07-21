import { Collection } from "discord.js"

import { SlashCommand } from "../types"

import getAccount from "./getAccount"
import addAccount from "./addAccount"

// Collection used to store and get commands using the command name
export const slashCommands = new Collection<string, SlashCommand>();


// Explicitly set all commands being currently allowed instead of dynamically loading all files in the directory.
// IE: this insanity https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

slashCommands.set(getAccount.command.name, getAccount);
// slashCommands.set(addAccount.command.name, addAccount);
