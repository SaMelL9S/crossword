import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Slider, Switch, ScrollView } from 'react-native';
import WordForm from './WordForm';

const BuilderForm = ({
  size,
  words,
  clues,
  letters,
  loading,
  gridName,
  nextQuery,
  filledWords,
  suggestions,
  focusedCell,
  twoLetterWords,
  threeLetterWords,
  changeSizeMode,
  blankProbability,
  suggestionCounts,
  changename,
  changesize,
  density,
  rebuild,
}) => {
  const [name, setName] = useState('');
  const [width, setWidth] = useState(size.width);
  const [height, setHeight] = useState(size.height);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-names.herokuapp.com/names', {
          mode: 'no-cors',
        });

        const name = await response.text();
        setName(name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (value) => {
    setName(value);
    changename({ name: value });
  };

  const handleWidthChange = (value) => {
    setWidth(value);
    changesize({ width: value });
  };

  const handleHeightChange = (value) => {
    setHeight(value);
    changesize({ height: value });
  };

  const handleDensityChange = (value) => {
    density({ density: Number(value) });
  };

  const handleSizeChange = ({ width, height }) => {
    setWidth(width);
    setHeight(height);
    rebuild({ width: Number(width), height: Number(height) });
  };

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        {/* Controls Section */}
        <View style={{ marginBottom: 16 }}>
          <Text>Grid Name:</Text>
          <TextInput
            value={name}
            onChangeText={handleNameChange}
            maxLength={40}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />

          <Text>Grid Width:</Text>
          <TextInput
            value={width.toString()}
            onChangeText={handleWidthChange}
            keyboardType="numeric"
            maxLength={3}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />
          <Slider
            value={width}
            minimumValue={2}
            maximumValue={40}
            onValueChange={handleWidthChange}
            step={1}
          />

          <Text>Grid Height:</Text>
          <TextInput
            value={height.toString()}
            onChangeText={handleHeightChange}
            keyboardType="numeric"
            maxLength={3}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />
          <Slider
            value={height}
            minimumValue={2}
            maximumValue={40}
            onValueChange={handleHeightChange}
            step={1}
          />

          <Text>Density: 1 /</Text>
          <TextInput
            value={density.toString()}
            onChangeText={handleDensityChange}
            keyboardType="numeric"
            maxLength={3}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />
          <Slider
            value={density}
            minimumValue={4}
            maximumValue={40}
            onValueChange={handleDensityChange}
            step={1}
          />
        </View>

        {/* Horizontal Questions Section */}
        {!changeSizeMode && (
          <View style={{ marginBottom: 16 }}>
            <Text>Horizontal questions:</Text>
            <ScrollView horizontal>
              <View style={{ flexDirection: 'row' }}>
                {horizontalWords.map((word, index) => (
                  <WordForm
                    key={`h${index}`}
                    x={word.x}
                    y={word.y}
                    clues={clues}
                    letters={letters}
                    loading={loading}
                    index={word.index}
                    length={word.length}
                    isVertical={false}
                    nextQuery={nextQuery}
                    suggestions={suggestions}
                    filledWords={filledWords}
                    focusedCell={focusedCell}
                    suggestionCounts={suggestionCounts}
                    onInput={(payload) => $emit('input', payload)}
                    onFocusCell={(x, y) => $emit('focus-cell', x, y)}
                    onPasteClue={(payload) => $emit('paste-clue', payload)}
                    onPasteWord={(payload) => $emit('paste-word', payload)}
                    onRemoveWord={(payload) => $emit('remove-word', payload)}
                    onLettersUpdate={(payload) => $emit('letters-update', payload)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Vertical Questions Section */}
        {!changeSizeMode && (
          <View style={{ marginBottom: 16 }}>
            <Text>Vertical questions:</Text>
            <ScrollView horizontal>
              <View style={{ flexDirection: 'row' }}>
                {verticalWords.map((word, index) => (
                  <WordForm
                    key={`v${index}`}
                    x={word.x}
                    y={word.y}
                    clues={clues}
                    letters={letters}
                    loading={loading}
                    length={word.length}
                    index={word.index}
                    isVertical={true}
                    nextQuery={nextQuery}
                    suggestions={suggestions}
                    filledWords={filledWords}
                    focusedCell={focusedCell}
                    suggestionCounts={suggestionCounts}
                    onInput={(payload) => $emit('input', payload)}
                    onFocusCell={(x, y) => $emit('focus-cell', x, y)}
                    onPasteClue={(payload) => $emit('paste-clue', payload)}
                    onPasteWord={(payload) => $emit('paste-word', payload)}
                    onRemoveWord={(payload) => $emit('remove-word', payload)}
                    onLettersUpdate={(payload) => $emit('letters-update', payload)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BuilderForm;
