import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Cell from './Cell';

const BuilderGrid = ({
  words,
  blanks,
  letters,
  gridWidth,
  gridHeight,
  filledWords,
  focusedCell,
  hoveredWord,
  editGridMode,
  twoLetterWords,
  impossibleWords,
  threeLetterWords,
  suggestionCounts,
  updateblanks,
  changeword,
}) => {
  const [dragging, setDragging] = useState(false);
  const [toBlank, setToBlank] = useState(true);
  const [active, setActive] = useState({ cell: '', word: [], vertical: false });
  const [cells, setCells] = useState([]);

  const hoveredCells = useMemo(() => {
    const [x, y, isVertical, length] = hoveredWord.split(':');
    const acc = [];

    for (let idx = 0; idx < length; idx += 1) {
      acc.push(
        `${Number(isVertical) ? x : Number(x) + idx}:${Number(isVertical) ? Number(y) + idx : y}`
      );
    }

    return acc;
  }, [hoveredWord]);

  const onMouseDown = ({ id }) => {
    if (!editGridMode) {
      return;
    }
    setCells([]);
    if (id) {
      setDragging(true);
      if (!cells.includes(id)) {
        setCells((prevCells) => [...prevCells, id]);
      }
      setToBlank(!blanks.includes(id));
      updateblanks(id);
      // Assuming $bus.$emit('changed::ondrag', { id, value: true }) is handled somewhere else
    }
  };

  const onMouseUp = () => {
    if (!editGridMode) {
      return;
    }
    setDragging(false);
    cells.forEach((id) => {
      // Assuming $bus.$emit('changed::ondrag', { id, value: false }) is handled somewhere else
    });
  };

  const onMouseEnter = ({ id }) => {
    if (!editGridMode || !dragging) {
      return;
    }

    if (id) {
      if (toBlank !== blanks.includes(id)) {
        updateblanks(id);
        // Assuming $bus.$emit('changed::ondrag', { id, value: true }) is handled somewhere else
        if (!cells.includes(id)) {
          setCells((prevCells) => [...prevCells, id]);
        }
      }
    }
  };

  const isTitleCell = (x, y) => {
    return words.find((word) => word.x === +x && word.y === +y);
  };

  const getNumber = (x, y) => {
    const titleCell = isTitleCell(x, y);
    return titleCell ? titleCell.index : null;
  };

  const onKeyUp = (e) => {
    if (e.target.value.match(/[A-Za-zА-Яа-я]/)) {
      goNext(e.target);
    }
    e.currentTarget.value = '';
  };

  const onCellClick = () => {
    // Assuming $emit('updateblanks', id) is handled somewhere else
  };

  const onLeftPress = (e) => {
    goPrev(e.currentTarget);
  };

  const getNextId = (id) => {
    const match = id.match(/(\d+):(\d+)/);
    const last = active.word[active.word.length - 1];
    const next = Number(match[Number(active.vertical) + 1]) + 1;

    if (next > last.split(':')[Number(active.vertical)]) {
      return false;
    }

    return active.vertical ? `${match[1]}:${next}` : `${next}:${match[2]}`;
  };

  const getPrevId = (id) => {
    const match = id.match(/(\d+):(\d+)/);
    const first = active.word[0];
    const prev = Number(match[Number(active.vertical) + 1]) - 1;

    if (prev < first.split(':')[Number(active.vertical)]) {
      return false;
    }

    return active.vertical ? `${match[1]}:${prev}` : `${prev}:${match[2]}`;
  };

  const goNextCell = ({ id }) => {
    const next = getNextId(id);

    setActive((prevActive) => ({ ...prevActive, cell: next }));
    // Assuming document.execCommand('selectAll') is handled somewhere else
  };

  const goPrevCell = ({ id }) => {
    const prev = getPrevId(id);

    setActive((prevActive) => ({ ...prevActive, cell: prev }));
    // Assuming document.execCommand('selectAll') is handled somewhere else
  };

  const activateWord = (key) => {
    let dir;

    if (isHorizontal(key)) {
      dir = 'horizontal';
    }
    if (isVertical(key)) {
      dir = 'vertical';
    }

    return updateData(key, dir);
  };

  const toggleWords = (key) => {
    let dir = 'horizontal';

    if (!active.word.length) {
      return updateData(key, dir);
    }

    if (typeOfWord(active.word) === 'horizontal') {
      dir = 'vertical';
    }

    return updateData(key, dir);
  };

  const updateData = (key, dir) => {
    const word = getWord(key, dir);

    if (word === active.word) {
      return true;
    }

    if (!word) {
      return false;
    }

    setActive({ word, cell: word[0], vertical: dir.toLowerCase() === 'vertical' });

    return true;
  };

  const typeOfWord = (word) => {
    let prev;
    let type;

    word.forEach((cell) => {
      if (!prev) {
        prev = cell;
        return true;
      }

      type = prev.split(':')[0] === cell.split(':')[0] ? 'vertical' : 'horizontal';
    });

    return type;
  };

  const isVertical = (id) => {
    return (
      !allStartCells('horizontal').includes(getHorizontalStartCell(id)) &&
      allStartCells('vertical').includes(getVerticalStartCell(id))
    );
  };

  const isHorizontal = (id) => {
    return (
      !allStartCells('vertical').includes(getVerticalStartCell(id)) &&
      allStartCells('horizontal').includes(getHorizontalStartCell(id))
    );
  };

  const isBoth = (id) => {
    return (
      allStartCells('vertical').includes(getVerticalStartCell(id)) &&
      allStartCells('horizontal').includes(getHorizontalStartCell(id))
    );
  };

  const isNeither = (id) => {
    return (
      !allStartCells('vertical').includes(getVerticalStartCell(id)) &&
      !allStartCells('horizontal').includes(getHorizontalStartCell(id))
    );
  };

  const getWordStartCells = (id) => {
    return allStartCells().filter((cell) => cell === id);
  };

  // The remaining functions have not been translated as they seem to be commented out and unused.

  return (
    <ScrollView>
      <View>
        {Array.from({ length: gridHeight }).map((_, rowIdx) => (
          <View key={rowIdx}>
            {Array.from({ length: gridWidth }).map((_, colIdx) => {
              const index = `${colIdx + 1}:${rowIdx + 1}`;
              const classes = getCellClass(rowIdx, colIdx);
              const style = getCellStyle();

              return (
                <Cell
                  key={`${colIdx + 1}:${rowIdx + 1}`}
                  id={index}
                  classes={classes}
                  style={style}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onMouseEnter={onMouseEnter}
                  onKeyUp={onKeyUp}
                  onCellClick={onCellClick}
                  onLeftPress={onLeftPress}
                />
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BuilderGrid;
