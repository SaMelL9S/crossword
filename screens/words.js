import React from 'react';
import { ScrollView } from 'react-native'; // Импортируйте ScrollView из react-native
import Crossword from './Crossword';

const App = () => {
  const russianWords = [
    'яблоко',
    'банан',
    'мороженое',
    'печенье',
    'картопля',
    'компьютер',
    'программа',
    'поэзия',
    'гитара',
    'книга',
    'рисунок',
    'лето',
    'зима',
    'весна',
    'осень',
    'автомобиль',
    'телефон',
    'солнце',
    'луна',
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}> {/* Добавьте ScrollView и установите flexGrow: 1 */}
      <Crossword words={russianWords} />
      {/* Другие компоненты вашего приложения */}
    </ScrollView>
  );
};

export default App;
