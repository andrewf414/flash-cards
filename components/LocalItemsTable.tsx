import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardData } from '../interfaces/FlashCard';

const TableStyle = styled.table`
  width: 100%;
`;

const ButtonContainerStyle = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const ButtonStyle = styled.button`
  border: solid 1px var(--color-secondary);
  border-radius: 3px;
  padding: 5px;
  background-color: inherit;
  &.selected {
    background-color: var(--color-secondary);
    color: var(--color-text-light);
  }
`;

interface Props {
  lists: string[];
}

export function LocalItemsTable({ lists }: Props) {
  const [activeList, setActiveList] = useState(lists[0]);
  const [existingItems, setExistingItems] = useState<CardData[]>([]);

  const handleDelete = (item: CardData) => {
    const existingString = localStorage.getItem(activeList);
    if (existingString) {
      const existing = JSON.parse(existingString) as CardData[];
      const index = existing.findIndex(i => i.term === item.term && i.definition === item.definition && i.description === item.description);
      if (index > -1) {
        existing.splice(index, 1);
        setExistingItems(existing);
        localStorage.setItem(activeList, JSON.stringify(existing));
      }
    }
  }

  // on selection get items
  useEffect(() => {
    const existingString = localStorage.getItem(activeList);
    if (existingString) {
      const existing = JSON.parse(existingString);
      setExistingItems(existing);
    } else {
      setExistingItems([])
    }
  }, [activeList]);

  return <>
    <ButtonContainerStyle>
      {lists.map(list => (<ButtonStyle key={list} type="button" onClick={() => setActiveList(list)} className={list === activeList ? 'selected' : ''}>{list}</ButtonStyle>))}
    </ButtonContainerStyle>
    <TableStyle>
      <thead>
        <tr>
          <th>Word</th>
          <th>Definition</th>
          <th>Description</th>
          <th>Remove?</th>
        </tr></thead>
      <tbody>
        {existingItems.map((word, idx) => (
          <tr key={`${word.definition}${idx}`}>
            <td>{word.term}</td>
            <td>{word.definition}</td>
            <td>{word.description}</td>
            <td><button onClick={() => handleDelete(word)}>❌</button></td>
          </tr>
        ))}
      </tbody>
    </TableStyle>
  </>
}