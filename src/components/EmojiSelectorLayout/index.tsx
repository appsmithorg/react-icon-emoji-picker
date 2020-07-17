import React, { useState } from 'react';
import styled from "styled-components";
import iconSet, { Icon } from "../../iconSetGenerator";
import Fuse, { FuseResult } from "fuse.js";
import debounce from "lodash/debounce";

const IconContainer = styled.div`
  display: inline-block;
  overflow: hidden;
  float: left;
  margin: 10px;
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid #eee;
  padding: 20px;
`;

const IconSetWrapper = styled.div`
  overflow: auto;
  margin-top: 30px;
  height: calc(100% - 100px);
`;

const SearchInput = styled.input`
  height: 25px;
  width: calc(100% - 25px);
  padding: 5px 10px;
`;

const Selected = styled.div`
  height: 40px;
`;

const options = {
  keys: ["name"],
  threshold: 0.6,
};

const fuse = new Fuse(iconSet as Array<Icon | undefined>, options);

const renderDropdownItem = (
  icon: FuseResult<Icon | undefined>,
  select: (value: Icon) => void
) => {
  return (
    icon.item && (
      <IconContainer
        key={icon.item.index}
        onClick={() => icon.item && select(icon.item)}
      >
        {icon.item.value}
      </IconContainer>
    )
  );
};

type EmojiSelectorLayoutProps = {
  onSelectIcon?: (selected: React.ReactNode) => void,
};

const EmojiSelectorLayout = ({ onSelectIcon }: EmojiSelectorLayoutProps) => {
  const [list, updateList] = useState(fuse.search("india"));
  const [selected, selectIcon] = useState<React.ReactNode | undefined>();
  const search = debounce((keyword: string) => {
    const results = fuse.search(keyword);
    updateList(results);
  }, 100);
  const onIconSearch = (e: any) => {
    search(e.target.value);
  };
  const onSelect = (icon: Icon) => {
    if (onSelectIcon) {
      onSelectIcon(icon.value);
    }
    selectIcon(icon.value);
  };

  return (
      <DropdownWrapper>
        <Selected>{selected}</Selected>
        <SearchInput
          type="text"
          placeholder="Search 2300+ icons and emojis"
          onChange={onIconSearch}
        />
        <IconSetWrapper>
          {list.map((icon: FuseResult<Icon | undefined>) =>
            renderDropdownItem(icon, onSelect)
          )}
        </IconSetWrapper>
      </DropdownWrapper>
  );
}

export default EmojiSelectorLayout;
