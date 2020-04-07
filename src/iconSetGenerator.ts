import { ReactNode } from "react";
import {
  library,
  IconDefinition,
  IconPrefix,
  IconPack,
} from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import emojiSet from "emoji-datasource/emoji.json";
import { convertIconToHTML } from "./utils";
type IconSet = { [name: string]: IconDefinition | IconPrefix | IconPack };

const icons: Array<Icon | undefined> | undefined = Object.keys(Icons as IconSet)
  .map((name: string) => {
    if (/^fa[A-Z]\w+/.test(name)) {
      let _name = name.slice(2);
      const tokens = _name.match(/[A-Z][a-z]+/g);
      if (tokens) _name = tokens.join(" ");
      const def: IconDefinition | IconPack | IconPrefix = (Icons as IconSet)[
        name
      ];
      library.add(def as IconDefinition);
      if ((def as IconDefinition).iconName) {
        return {
          name: _name,
          value: convertIconToHTML(def as IconDefinition),
          index: (def as IconDefinition).iconName,
        };
      }
    }
    return undefined;
  })
  .filter(Boolean);

const emojis: Array<Icon | undefined> | undefined = emojiSet
  .map((emoji) => {
    if (emoji.name && emoji.unified) {
      const codePoints = emoji.unified
        .split("-")
        .map((token) => Number("0x" + token));
      return {
        name: emoji.name,
        value: String.fromCodePoint(...codePoints),
        index: emoji.unified,
      };
    }
    return undefined;
  })
  .filter(Boolean);

export type Icon = {
  value: ReactNode;
  name: string;
  index: string;
};

export default [...emojis, ...icons];
