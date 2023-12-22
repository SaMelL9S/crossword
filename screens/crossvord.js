import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Slider, ScrollView } from 'react-native';

const WordForm = ({ /* ... пропсы WordForm, если таковые нужны ... */ }) => {
  // Адаптируйте WordForm, если необходимо
  return (
    <View>
      {/* ... JSX для WordForm ... */}
    </View>
  );
};

const BuilderForm = (props) => {
  const [name, setName] = useState('');
  const [width, setWidth] = useState(props.size.width);
  const [height, setHeight] = useState(props.size.height);
  const [density, setDensity] = useState(props.blankProbability);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-names.herokuapp.com/names', { mode: 'no-cors' });
        const data = await response.text();
        setName(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (value) => {
    setName(value);
    props.changename({ name: value });
  };

  const handleSizeChange = (value) => {
    setWidth(value);
    setHeight(value);
    props.changesize({ width: value, height: value });
  };

  const handleDensityChange = (value) => {
    setDensity(value);
    props.density({ density: Number(value) });
  };

  return (
    <ScrollView>
      <View>
        <Text>Grid Name:</Text>
        <TextInput
          value={name}
          onChangeText={handleNameChange}
          maxLength={40}
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
        />

        <Text>Grid Width:</Text>
        <TextInput
          value={width.toString()}
          onChangeText={(value) => handleSizeChange(Number(value))}
          keyboardType="numeric"
          maxLength={3}
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
        />
        <Slider
          value={width}
          minimumValue={2}
          maximumValue={40}
          onValueChange={handleSizeChange}
          step={1}
        />

        <Text>Density:</Text>
        <TextInput
          value={density.toString()}
          onChangeText={(value) => handleDensityChange(Number(value))}
          keyboardType="numeric"
          maxLength={3}
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
        />
        <Slider
          value={density}
          minimumValue={4}
          maximumValue={40}
          onValueChange={handleDensityChange}
          step={1}
        />
      </View>

      {/* Адаптировать код для компонентов WordForm */}
      {props.changeSizeMode ? (
        <View>
          {/* ... JSX для первого состояния ... */}
        </View>
      ) : (
        <View>
          <View>
            <Text>Horizontal questions:</Text>
            <ScrollView>
              {props.horizontalWords.map((word, index) => (
                <WordForm
                  key={`h${index}`}
                  x={word.x}
                  y={word.y}
                  clues={props.clues}
                  letters={props.letters}
                  loading={props.loading}
                  index={word.index}
                  length={word.length}
                  isVertical={false}
                  nextQuery={props.nextQuery}
                  suggestions={props.suggestions}
                  filledWords={props.filledWords}
                  focusedCell={props.focusedCell}
                  suggestionCounts={props.suggestionCounts}
                  input={(payload) => props.input(payload)}
                  focusCell={(x, y) => props.focusCell(x, y)}
                  pasteClue={(payload) => props.pasteClue(payload)}
                  pasteWord={(payload) => props.pasteWord(payload)}
                  removeWord={(payload) => props.removeWord(payload)}
                  lettersUpdate={(payload) => props.lettersUpdate(payload)}
                />
              ))}
            </ScrollView>
          </View>

          <View>
            <Text>Vertical questions:</Text>
            <ScrollView>
              {props.verticalWords.map((word, index) => (
                <WordForm
                  key={`v${index}`}
                  x={word.x}
                  y={word.y}
                  clues={props.clues}
                  letters={props.letters}
                  loading={props.loading}
                  index={word.index}
                  length={word.length}
                  isVertical={true}
                  nextQuery={props.nextQuery}
                  suggestions={props.suggestions}
                  filledWords={props.filledWords}
                  focusedCell={props.focusedCell}
                  suggestionCounts={props.suggestionCounts}
                  input={(payload) => props.input(payload)}
                  focusCell={(x, y) => props.focusCell(x, y)}
                  pasteClue={(payload) => props.pasteClue(payload)}
                  pasteWord={(payload) => props.pasteWord(payload)}
                  removeWord={(payload) => props.removeWord(payload)}
                  lettersUpdate={(payload) => props.lettersUpdate(payload)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default BuilderForm;
