import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';

const BuilderPage = () => {
  const [lang, setLang] = useState('ru');
  const [editGridMode, setEditGridMode] = useState(true);
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [blanks, setBlanks] = useState([]);
  const [letters, setLetters] = useState({});
  const [loading, setLoading] = useState(false);
  const [gridName, setGridName] = useState('');
  const [prevWord, setPrevWord] = useState(null);
  const [filledWords, setFilledWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [crosswordId, setCrosswordId] = useState(null);
  const [focusedCell, setFocusedCell] = useState('0:0');
  const [hoveredWord, setHoveredWord] = useState('0:0:0');
  const [autoFillMode, setAutoFillMode] = useState(false);
  const [blankProbability, setBlankProbability] = useState(1 / 3);
  const [suggestionCounts, setSuggestionCounts] = useState([]);
  const [verticalSym, setVerticalSym] = useState(true);
  const [horizontalSym, setHorizontalSym] = useState(true);
  const YourComponent = () => {
    const [editGridMode, setEditGridMode] = useState(true); // Используйте useState для управления состоянием
  }
  const switchLang = () => {
    this.lang = this.lang === 'en' ? 'ru' : 'en'
  };

  const changeSizeClick = () => {
    this.editGridMode = !this.editGridMode
      if (!this.editGridMode) {
        this.updateSuggestions()
      }
  };

  const generateGrid = (horizontalSym, verticalSym, blankProbability) => {
    this.blanks = []
      let fillWidth
      let fillHeight

      if (this.horizontalSym && this.verticalSym) {
        fillWidth = Math.round(this.width / 2)
        fillHeight = Math.round(this.height / 2)
      }
      else {
        fillWidth = this.horizontalSym ? this.width : Math.round(this.width / 2)
        fillHeight = this.verticalSym ? this.height : Math.round(this.height / 2)
      }

      for (let x = 1; x <= fillWidth; x += 1) {
        for (let y = 1; y <= fillHeight; y += 1) {
          if (Math.random() > this.blankProbability) {
            continue
          }

          this.blanksUpdate(`${x}:${y}`)
        }
      }

      this.addCrossClasses()
  };

  const horizontalSymetria = () => {
    this.horizontalSym = !this.horizontalSym
  };

  const verticalSymetria = () => {
    this.verticalSym = !this.verticalSym
  };

  const clearGrid = () => {
      this.blanks = []
      this.letters = {}
      this.filledWords = []
  };

  const newCrossword = () => {
    fetch(
        'https://crossword.teacherlight.ru:3443/crossword/create',
        {
          method: 'POST',
          data: {
            name: 'Test',
            description: '',
            words: '[]',
            blanks: '[]',
            width: this.width,
            height: this.height,
          },
        },
      )
        .then((response) => {
          if (!response.success) {
            return
          }

          const indexes = Object.keys(this.letters)

          for (let idx = indexes.length - 1; idx >= 0; idx -= 1) {
            this.letters[indexes[idx]] = ''
          }

          this.crosswordId = response.data.id
          this.blanks = JSON.parse(response.data.blanks)
          this.filledWords = JSON.parse(response.data.words)
        })
  };

  const saveCrossword = () => {
    fetch(
        `edit/${this.crosswordId}`,
        {
          data: {
            words: JSON.stringify(this.filledWords),
            blanks: JSON.stringify(this.blanks),
            width: this.width,
            height: this.height,
          },
        },
      )
  };

  const saveGrid = () => {
    const params = {
        name: this.generateName(),
        description: this.statsView,
        width: this.width,
        height: this.height,
        blanks: JSON.stringify(this.blanks.sort()),
  };

  const refreshSuggestions = () => {
      this.suggestions = []
      this.suggestionCounts = []
      this.updateSuggestions(true)
  };

  const toggleAutoFill = () => {
      this.autoFillMode = !this.autoFillMode
      if (this.autoFillMode) {
        this.autoFill()
      }
  };

  const rotateGrid = ({ width, height, blanks }) => {
    this.width = height
      this.height = width
      this.blanks = blanks.map((blank) => blank
        .split(':')
        .reverse()
        .join(':'))
  };

  const statsView = ""; // Замените на ваш объект состояния
  const log = ""; // Замените на ваш объект состояния
  const autoFillMode = false; // Замените на ваш объект состояния
  const grids = []; // Замените на ваш объект состояния

  
  // Остальной код остается без изменений

  return (
    <View>
      {editGridMode && (
        <Button title={this.lang} onPress={switchLang} />
      )}
      <Button title={editGridMode ? 'Fill Words' : 'Edit Grid'} onPress={changeSizeClick} />
      {editGridMode && (
        <Button title="Generate Grid" onPress={() => generateGrid(horizontalSym, verticalSym, blankProbability)} />
      )}
      {editGridMode && (
        <Button title="Horizontal Symetria" onPress={horizontalSymetria} />
      )}
      {editGridMode && (
        <Button title="Vertical Symetria" onPress={verticalSymetria} />
      )}
      {editGridMode && (
        <Button title="Clear Grid" onPress={clearGrid} />
      )}
      <Button title="Create New Crossword" onPress={newCrossword} />
      <Button title="Save Crossword" onPress={saveCrossword} />
      <Button title="Save Grid" onPress={saveGrid} />
      {!editGridMode && (
        <Button title="Refresh Suggestions" onPress={refreshSuggestions} />
      )}
      {!editGridMode && (
        <Button title="Auto Fill" onPress={toggleAutoFill} />
      )}
      {editGridMode && (
        <Button title="Rotate Grid" onPress={() => rotateGrid({ width, height, blanks })} />
      )}
      <View>
        <Text>{statsView}</Text>
      </View>
      <View>
        <Text>{log}</Text>
      </View>
      {editGridMode && (
        <View>
          {/* Здесь разместите ваш код для компонента grid-list */}
        </View>
      )}
    </View>
  );
};
}
export default BuilderPage;
