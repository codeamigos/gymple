import * as Model from './models'

export const exercises: Model.RemoteDataExercise[] = [
  {
    id: '1',
    title: 'Сгибание рук со штангой стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/биц11.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: ['1'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '2',
    title: 'Сгибание рук на скамье Скотта',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/бицупор1.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: ['1'],
    inventoryIds: ['1', '2', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '3',
    title: 'Сгибание шеи лёжа на скамье',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/60847fe1d3487906ee8a58ca75aa4797e9104f62.jpg',
    primaryMusclesIds: ['2'],
    secondaryMusclesIds: [],
    inventoryIds: ['3'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '4',
    title: 'Разгибание шеи лёжа на скамье',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/6fdc5435350e442aa4e7a03f5e0a7e98b2d59cf9.jpg',
    primaryMusclesIds: ['2'],
    secondaryMusclesIds: [],
    inventoryIds: ['3'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '5',
    title: 'Жим штанги из-за головы стоя или сидя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/75ee6a19cbd024b94c5bf54f65d02ee173a092d3.jpeg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['4'],
    inventoryIds: ['4', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '6',
    title: 'Шраги с гантелями стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/шраги1.jpg',
    primaryMusclesIds: ['5'],
    secondaryMusclesIds: [],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '7',
    title: 'Разгибание запястий сидя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/прдплечья1.jpg',
    primaryMusclesIds: ['1'],
    secondaryMusclesIds: [],
    inventoryIds: ['1', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '8',
    title: 'Отжимания на брусьях',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/брусья1.jpg',
    primaryMusclesIds: ['6', '4'],
    secondaryMusclesIds: ['3'],
    inventoryIds: ['3'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '9',
    title: 'Пуловер лежа с гантелей',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/пуловер1.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '4', '7'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '10',
    title: 'Скручивания лёжа',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/прес1.jpg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: [],
    inventoryIds: ['5'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '11',
    title: 'Отжимания одной рукой в петлях',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/10a3da1a3c06b6fe4aed8b5d6744e981e36b169a.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '8', '4', '9'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '12',
    title: 'Подтягивания в петлях',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/3d87eec197383a12eb43352580f5eeeda3c79c55.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '6', '8'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '13',
    title: 'Y - разводка на петлях',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/6f38698e7ff3786c9b2c7e0fa9848768f71a0458.jpg',
    primaryMusclesIds: ['9'],
    secondaryMusclesIds: ['3', '4'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '14',
    title: 'Тяга одной рукой в петлях',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/b985c8d2689d6f1cd0a7b6906035867b90e001b7.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '3'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '15',
    title: 'Разведение рук с петлями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/7cb8f15008d4eb9dadbe9ac8a9d059ca3eac9a46.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['8', '4', '7', '9', '10'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '16',
    title: 'Сгибание ног с петлями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/c72a307b3748bb2c72e61a422f6c0c61c3067e5e.jpg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: ['11', '12', '13'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '17',
    title: 'Пика',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/232ffc0534a626065015b997b9cf08e9ffc65c9d.jpg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: ['1'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '18',
    title: 'Приседания пистолет c петлями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/513dff2432bfb7d07e2b3415b18ee16c7dd4dbd3.jpg',
    primaryMusclesIds: ['1', '2'],
    secondaryMusclesIds: ['0', '11', '12', '13'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '19',
    title: 'Спринт с петлями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/849f8e72278cea5f465e7ce9e936b8a86d5575d6.jpg',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['0', '11', '12', '14'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '20',
    title: 'Сгибание рук стоя с петлями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/fa08299f51b3737bfee38045201754fa9c982f63.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: ['8', '9'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '21',
    title: 'Трицепсовые экстензии с петлями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/333f8fd66a53d97e37f6b1c8ac168378c1f9f109.jpg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: ['8', '9'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '22',
    title: 'Приседания с петлями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/4c45c2c73b4cd9717489614f93f7b6696f062c89.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['0', '11', '13'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '23',
    title: 'Разводка (Т) в петлях на спину',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/e9992edc1c31429e51a2c23344c095932a59ed61.jpg',
    primaryMusclesIds: ['9'],
    secondaryMusclesIds: ['3', '8'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '24',
    title: 'Разведение рук V-образно в петлях',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/ed5b11aa824f651dcf14e68d8deb53689764fcd9.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['8', '9'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '25',
    title: 'Тяга на спину в петлях (гребля)',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/926386256471c20afaeeadf872162b115808353d.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '3', '8'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '26',
    title: 'Отжимания в петлях',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/d334e0e6a1bde5f30235abb2bd67dd7102cbc1e0.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '8', '4', '7'],
    inventoryIds: ['6'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '27',
    title: 'Жим штанги узким хватом',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/42c5c080441aecb616284f671168c7f4de95da08.jpeg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: ['6', '3'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '28',
    title: 'Подтягивания обратным хватом',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/ff89a0c39059116a92f50daed3c90e7c9bff3ff5.jpeg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '1', '9'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '29',
    title: 'Отжимания в стойке на руках',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/2fff47711142bd1ce0963d0d351a8d7ebb6214de.jpeg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['4'],
    inventoryIds: [],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '30',
    title: 'Ходьба на беговой дорожке',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/579adc982a4d29a7bf14af4a8a59cbe01a6a0531.jpeg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '13'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '31',
    title: 'Прыжки на скакалке',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/3831a5b3fd4dc61c921327661cab692d35a24fcc.jpeg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['13', '14'],
    inventoryIds: ['3'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '32',
    title: 'Плавание вольным стилем (кроль)',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/3ae0d350fb3efd01a1860292b04933c01555b0b3.jpg',
    primaryMusclesIds: ['3', '4', '7'],
    secondaryMusclesIds: ['11', '12', '13'],
    inventoryIds: ['5'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '33',
    title: 'Занятия на эллиптическом тренажере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/9d87b3a25dfe66485bf7a2c8924662f04466a029.jpeg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '13', '14'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '34',
    title: 'Занятия на велотренажере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/85ffda31d42b747265efc5a0e959eefa9278c3c1.jpeg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '14'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '35',
    title: 'Бег на беговой дорожке',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/248800847a8c2c6f7a22a2bac0b90d70e364676a.jpeg',
    primaryMusclesIds: ['14'],
    secondaryMusclesIds: ['13'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '36',
    title: 'Подъем таза лежа',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/e39a98ca9f9c6a10b9069aec7b49115e2950f080.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['13'],
    inventoryIds: [],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '37',
    title: 'Жим штанги широким хватом',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/fd17b345f4e352454ca1aa1e8c1cede27c3ab1b1.jpeg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '4'],
    inventoryIds: ['0', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '38',
    title: 'Подъем гантелей через стороны сидя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/462e9c7c5b28d426143bf1889b216d7587760576.jpeg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['5'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '39',
    title: 'Тяги за спиной',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/aa2c18cdc43142c49447130a305cd5b32f81d3eb.jpg',
    primaryMusclesIds: ['5'],
    secondaryMusclesIds: ['3'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '40',
    title: 'Жим Арнольда',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/b1051269362d716f689583f9eef0ce520e882d58.jpg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['4'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '41',
    title: 'Концентрированные сгибания на бицепс',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/e0d4f0e370994bcb0fc8f45392ef933b5012c0e2.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: ['1'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '42',
    title: 'Жим в рычажном тренажере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/69001c5fb990123ec795ce0b77153003efdb726b.jpeg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '4'],
    inventoryIds: ['8'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '43',
    title: 'Тяга верхнего блока с прямыми руками',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/65395915df233ca9086e1711350558132ee63acf.jpeg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['6'],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '44',
    title: 'Обратные скручивания',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/2c03d0c41187966ece7f475732f0d0b4fb6d3f9e.jpeg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: [],
    inventoryIds: [],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '45',
    title: 'Французский жим стоя со штангой ',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/9d47d5b75e7d81eefa748d14612023b8f94e75b9.jpeg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: [],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '46',
    title: 'Сгибания рук стоя или сидя у верхних блоков',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/cfd5f257885699d8637fcd9fbe534e0edb4a59c9.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: [],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '47',
    title: 'Наклоны с гантелей в сторону стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/37309c3188ec0a7b746be56006b3087f50c801c4.jpg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: [],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '48',
    title: 'Французский жим с гантелями сидя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/9dabdc8d6976ab9afc0e7e012e83e1f2c4ba5291.jpeg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: [],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '49',
    title: 'Обратные отжимания',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/781198ed07703bfb729c2f816e4a258535fdf6a7.jpeg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: ['6', '3'],
    inventoryIds: ['7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '50',
    title: 'Приседание плие с гантелей',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/dbd8bab00d9dc0dc5047b52b0fd670865dff2bf8.jpeg',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['11', '12'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '51',
    title: 'Тяга гантелей стоя в наклоне',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/1ff21d36a790bc4842d5b90c7ceaec4f57620960.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '3'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '52',
    title: 'Приседание плие со штангой',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/6b70a3fb69d3a5ef074dc6fb07146e99b7050496.png',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['11', '12'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '53',
    title: 'Разведения рук с гантелями лежа на наклонной скамье лицом вниз',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/c74e7f39a24472cf4a2688a45634dc7620c4cac3.jpeg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['5'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '54',
    title: 'Отведение руки с гантелей в наклоне',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/152d9b6100b336bf1ec93b59edc289ff8099f310.jpeg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: ['3', '7'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '55',
    title: 'Подъем ног в висе',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/9b3fdb8c39e9ea30afc13ce3fca00402cf55e00e.jpg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: ['10'],
    inventoryIds: ['3'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '56',
    title: 'Жим штанги лежа на наклонной скамье',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/7213ad81bbeb0e65069024f7a3a8be0f75c6df3b.jpeg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '4'],
    inventoryIds: ['10', '0', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '57',
    title: 'Жим гантелей стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/79b3ec94b77338c75996613e1d7ec8ee5843dd8c.jpeg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['4'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '58',
    title: 'Сгибание рук с гантелями стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/7929ece4d8326ea24f747eeb9200fd9c342427d6.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: ['1'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '59',
    title: 'Выпады со штангой',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/83a366d4aef48261f5b07dff1007d0ecc1ca0145.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['11'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '60',
    title: 'Подтягивания прямым хватом',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/e29b22ca3504c729d0c86130353f29c28b27bb38.jpeg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '6'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '61',
    title: 'Тяга гантелей лежа на скамье на животе',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/cdee43ae75fea9bccb9449edb95b717e3f39ea87.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['3'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '62',
    title: 'Скручивания на верхнем блоке',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/94d0ac5bb028d4841f30270c504465c9a9949f73.jpeg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: [],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '63',
    title: 'Подъем на носки стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/93d5b47fbb0dffc6c9cd18aadd7c8e35fc82ad28.jpg',
    primaryMusclesIds: ['14'],
    secondaryMusclesIds: [],
    inventoryIds: ['1', '4', '10', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '64',
    title: 'Шраги со штангой стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/4255a3e324f5ace32ffee6e11915a6a2246dd954.jpg',
    primaryMusclesIds: ['5'],
    secondaryMusclesIds: [],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '65',
    title: 'Болгарские выпады',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/bolgarskie-vypady.jpg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '13', '14'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '66',
    title: 'Подъем таза одной ногой',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/podem-taza-odnoi-nogoi.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['13'],
    inventoryIds: ['5'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '67',
    title: 'Зашагивания на скамью',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/zashagivaniua-na-skamu.jpg',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['12'],
    inventoryIds: ['1', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '68',
    title: 'Подъем ягодиц со штангой на полу',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/podem-yagodic-so-shtangoi-na-poly.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['13'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '69',
    title: 'Отведение ноги в сторону в кроссовере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/otvedenie-nogi-v-storonu.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['13'],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '70',
    title: 'Подъем ягодиц со штангой опираясь на скамью',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/podem-uagodic-so-shtangoi.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['13'],
    inventoryIds: ['0', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '71',
    title: 'Сгибание рук на нижнем блоке в кроссовере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/sgibanie-ruk-na-nizgnem-bloke.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: [],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '72',
    title: 'Подъем гантелей перед собой',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/podem-gantelei-pered-soboi.jpg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['6'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '73',
    title: 'Жим штанги головой вниз',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/zhim-golovoi-vniz.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '5'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '74',
    title: 'Сгибание ног в тренажёре сидя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/sgibanie-nog-v-trenazgere.jpg',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['14'],
    inventoryIds: ['8'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '75',
    title: 'Разведение гантелей стоя в наклоне',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/razvedenie-ruk-v-naklone.jpg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['5'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '76',
    title: 'Тяга т-грифа в наклоне',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/tuaga-t-grifa.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '3'],
    inventoryIds: ['2', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '77',
    title: 'Разведение рук назад в кроссовере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/razvedenie-ruk-nazad-v-krossovere_790407.jpg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['5'],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '78',
    title: 'Разгибание ног в тренажере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/f7f43d277cddbdadd9e6f41d40390570ed20e656.jpg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: [],
    inventoryIds: ['8'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '79',
    title: 'Сгибание рук с гантелями хватом «молот»',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/sgibanie-ruk-molot.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: ['1'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '80',
    title: 'Сведение рук в кроссовере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/krossover.jpeg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3'],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '81',
    title: 'Сгибание рук с гантелями на наклонной скамье',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/sgibanie-ruk-ganteli-naklonnaua_1.jpg',
    primaryMusclesIds: ['0'],
    secondaryMusclesIds: ['3'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '82',
    title: 'Сведение ног в тренажере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/153_1.jpg',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['12'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '83',
    title: 'Разведение ног в тренажере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/154_1.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['13'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '84',
    title: 'Тяга за голову верхнего блока',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/tjaga-za-golovu-verhnego-bloka.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '3'],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '85',
    title: 'Подъем ног в упоре',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/podem-nog-v-upore.jpeg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: ['10'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '86',
    title: 'Тяга штанги к подбородку',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/тягаподбородок2.jpg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['5'],
    inventoryIds: ['4', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '87',
    title: 'Сгибание ног в тренажере лежа',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/сгиб1.jpg',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['14'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '88',
    title: 'Приседания со штангой',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/присед1.jpg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '13'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '89',
    title: 'Жим гантелей сидя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/plechisidya.jpeg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['4'],
    inventoryIds: ['1', '7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '90',
    title: 'Разгибание рук на блоке стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/tricepsblock.jpeg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: [],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '91',
    title: 'Скручивания на наклонной скамье',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/ckruchnanaklon.jpeg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: ['10'],
    inventoryIds: ['7'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '92',
    title: 'Сведение рук в тренажере (бабочка)',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/babochka.jpeg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: [],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '93',
    title: 'Подъемы гантелей через стороны стоя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/махи1.jpg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['5'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '94',
    title: 'Отжимания от пола',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/отж1.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '4'],
    inventoryIds: ['5'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '95',
    title: 'Планка',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/planka.jpeg',
    primaryMusclesIds: ['8'],
    secondaryMusclesIds: ['3', '5', '10'],
    inventoryIds: ['5'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '96',
    title: 'Жим ногами в тренажёре',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/жимногами1.jpg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '13'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '97',
    title: 'Французский жим лёжа',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/француз1.jpg',
    primaryMusclesIds: ['4'],
    secondaryMusclesIds: ['3'],
    inventoryIds: ['1', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '98',
    title: 'Армейский жим (жим штанги стоя/сидя)',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/жим стоя1.jpg',
    primaryMusclesIds: ['3'],
    secondaryMusclesIds: ['6', '5', '4'],
    inventoryIds: ['1', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '99',
    title: 'Тяга штанги в наклоне',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/тяга в наклоне2.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '3', '9', '10'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '100',
    title: 'Тяга верхнего блока к груди',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/тяга блока к груди.jpeg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '3', '9'],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '101',
    title: 'Тяга нижнего (горизонтального) блока',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/горблок1.jpg',
    primaryMusclesIds: ['9'],
    secondaryMusclesIds: ['0', '3', '7'],
    inventoryIds: ['9'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '102',
    title: 'Разведение рук с гантелями лежа ',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/разводка1.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: [],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '103',
    title: 'Жим гантелей лежа',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/Жим гантелей1.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '5'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '104',
    title: 'Становая тяга классическая',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/Становая1.jpg',
    primaryMusclesIds: ['10'],
    secondaryMusclesIds: ['1', '11', '5', '7', '12', '13'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '105',
    title: 'Приседания в гакк-тренажере',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/гакк приседания.jpeg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '13'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '106',
    title: 'Жим штанги лёжа',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/жим лежа2.jpg',
    primaryMusclesIds: ['6'],
    secondaryMusclesIds: ['3', '4'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '107',
    title: 'Приседания с гантелями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/Присед с гантелями1.jpg',
    primaryMusclesIds: ['12'],
    secondaryMusclesIds: ['11', '13'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '108',
    title: 'Тяга одной гантели в наклоне',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/гант1.jpg',
    primaryMusclesIds: ['9'],
    secondaryMusclesIds: ['0', '3', '7'],
    inventoryIds: ['1'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '109',
    title: 'Подтягивания широким хватом',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/широкийхват1.jpg',
    primaryMusclesIds: ['7'],
    secondaryMusclesIds: ['0', '9'],
    inventoryIds: ['2'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '110',
    title: 'Выпады с гантелями',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/выпгант1.jpg',
    primaryMusclesIds: ['11'],
    secondaryMusclesIds: ['12', '13', '14'],
    inventoryIds: ['1', '5'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '111',
    title: 'Становая тяга со штангой на прямых ногах',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/на прямых ногах1.jpg',
    primaryMusclesIds: ['13'],
    secondaryMusclesIds: ['10', '12'],
    inventoryIds: ['0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '112',
    title: 'Подъём на икры сидя',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/икры1.jpg',
    primaryMusclesIds: ['14'],
    secondaryMusclesIds: [],
    inventoryIds: ['1', '4', '2', '0'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  },
  {
    id: '113',
    title: 'Гиперэкстензия',
    imgSrc: '//iq-body.ru/uploads/ra/185x158/training/original/гиперэкстензия2.jpg',
    primaryMusclesIds: ['10'],
    secondaryMusclesIds: ['12', '13'],
    inventoryIds: ['3'],
    weight: 0,
    type: {
      kind: 'repetitions',
      count: 10
    }
  }
]

export const muscles: Model.RemoteDataMuscle[] = [
  {
    id: '0',
    title: 'Biceps',
    bodyPart: 'upper'
  },
  {
    id: '1',
    title: 'Forearm',
    bodyPart: 'upper'
  },
  {
    id: '2',
    title: 'Neck',
    bodyPart: 'upper'
  },
  {
    id: '3',
    title: 'Shoulders',
    bodyPart: 'upper'
  },
  {
    id: '4',
    title: 'Triceps',
    bodyPart: 'upper'
  },
  {
    id: '5',
    title: 'Trapezius',
    bodyPart: 'upper'
  },
  {
    id: '6',
    title: 'Chest',
    bodyPart: 'upper'
  },
  {
    id: '7',
    title: 'Lats',
    bodyPart: 'upper'
  },
  {
    id: '8',
    title: 'Abs',
    bodyPart: 'upper'
  },
  {
    id: '9',
    title: 'Back',
    bodyPart: 'upper'
  },
  {
    id: '10',
    title: 'Lower back',
    bodyPart: 'upper'
  },
  {
    id: '11',
    title: 'Quads',
    bodyPart: 'lower'
  },
  {
    id: '12',
    title: 'Glutes',
    bodyPart: 'lower'
  },
  {
    id: '13',
    title: 'Thighs',
    bodyPart: 'lower'
  },
  {
    id: '14',
    title: 'Calves',
    bodyPart: 'lower'
  }
]

export const inventory: Model.RemoteDataInventory[] = [
  {
    id: '0',
    title: 'Штанга'
  },
  {
    id: '1',
    title: 'Гантели'
  },
  {
    id: '2',
    title: 'Другие тренажеры'
  },
  {
    id: '3',
    title: 'Другое'
  },
  {
    id: '4',
    title: 'Машина Смита'
  },
  {
    id: '5',
    title: 'Отсутствует'
  },
  {
    id: '6',
    title: 'TRX петли'
  },
  {
    id: '7',
    title: 'Силовая скамья'
  },
  {
    id: '8',
    title: 'Рычажные тренажеры'
  },
  {
    id: '9',
    title: 'Тросовые тренажеры'
  },
  {
    id: '10',
    title: 'Силовая рама'
  }
]
