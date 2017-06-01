import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import bs, {Palette, Multiplicators, Options} from './styles';
import exerscisesData, {ExerciseData} from './exercises';
import musclesData, {MuscleData} from './muscles';

const palette: Palette = {
  greyDarkest: '#2e333d',
  greyDarker: '#434b55',
  greyDark: '#555b65',
  grey: '#8a949d',
  greyLight: '#d2dadd',
  greyLighter: '#e5eaee',
  greyLightest: '#fafafa',
  white: '#ffffff',
  black: '#000000',
  blueDark: '#2b55e4',
  blue: '#2c5cff',
  blueLight: '#587eff',
  red: '#ff2b71',
  orange: '#ff605e',
  yellow: '#fbcf00',
  green: '#0cddae',
  t: 'rgba(0,0,0,0)',
};

const headings: Multiplicators = {
  '7': 0.75,
  '6': 0.85,
  '5': 1,
  '4': 1.2,
  '3': 1.6,
  '2': 2,
  '1': 3.25,
};

bs.build({
  remSize: 15,
  palette,
  headings,
} as Options);
const {styles: s, sizes, colors} = bs;

// import * as ReactIntl from 'react-intl';
// import 'intl';

// import localizations from './localizations';

/*
const en = require('react-intl/locale-data/en');
const ru = require('react-intl/locale-data/ru');

ReactIntl.addLocaleData([...en, ...ru]);


interface Profile {
  active: NotStartedTraining | OngoingTraining | null,
  history: FinishedTraining[],
}

type Training = NotStartedTraining | OngoingTraining | FinishedTraining;
*/

interface NotStartedTraining {
  title: string,
  plannedExercises: Exercise[],
}

/*
interface OngoingTraining {
  title: string,
  startedAt: Date,
  plannedExercises: Exercise[],
  currentExerciseIndex: number | null,
  completedExercises: Exercise[],
}

interface FinishedTraining {
  title: string,
  startedAt: Date,
  finishedAt: Date,
  completedExercises: Exercise[],
}
*/

interface Exercise {
  title: string,
  restSeconds: number,
  attempts: Array<{
    weight: number,
    repititions: number,
  }>,
  targetMuscles: Muscle[]
}

interface Muscle {
  id: number,
  title: string,
}


interface TrainingScreenState {
  training: NotStartedTraining,
  isModalOpened: boolean,
  filter: string | null,
}

class TrainingScreen extends React.PureComponent<void, TrainingScreenState> {
  constructor(props: void) {
    super(props);

    this.state = {
      training: {
        title: 'New training',
        plannedExercises: [],
      },
      isModalOpened: false,
      filter: null,
    };
  }

  addExercise = (exercise: Exercise) => {
    const { training } = this.state;

    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.concat(exercise),
      },
      isModalOpened: false,
      filter: null,
    });
  }

  render() {
    const { training, isModalOpened, filter } = this.state;
    const defaultExercises = generateDefaultExersices(exerscisesData, musclesData);

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={colors.t}
          />
        <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb05]}>
          <RN.Text style={[s.white, s.fw3, s.f2]}>
            {training.title}
          </RN.Text>
          <RN.Text style={[s.white, s.f5, s.mb05]}>
            Today
          </RN.Text>
        </RN.View>
        <RN.ScrollView style={[s.flx_i]} contentContainerStyle={[s.pl125]}>
          {training.plannedExercises.map((exercise, i) => <ExerciseListItem key={exercise.title + i} exercise={exercise} />)}
        </RN.ScrollView>
        <RN.View style={[s.ph125, s.pb175]}>
          <RN.TouchableHighlight
            style={[s.ass, s.bg_green, s.br2, s.h325, s.jcc, s.ph1]}
            onPress={() => this.setState({ isModalOpened: true })}
          >
            <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
              Add Exercise
            </RN.Text>
          </RN.TouchableHighlight>
        </RN.View>
        <RN.Modal
          animationType="slide"
          transparent={false}
          visible={isModalOpened}
          onRequestClose={() => this.setState({ isModalOpened: false })}
        >
          <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
            <RN.View style={[s.bg_blue, s.pt2, s.ph05, s.pb05]}>
              <RN.TouchableOpacity onPress={() => this.setState({isModalOpened: false})}>
                <Icon name="md-close" size={sizes[175]} color={colors.white} style={s.ml075} />
              </RN.TouchableOpacity>
              <RN.View style={[s.mv05, s.bg_blueDark, s.ph075, s.h3, s.flx_row, s.br025]}>
                <RN.View style={[s.w2, s.jcc]} >
                  <Icon name="ios-search" size={sizes[175]} color={colors.white_20} />
                </RN.View>
                <RN.TextInput
                  underlineColorAndroid={colors.t}
                  placeholderTextColor={colors.white_20}
                  style={[s.bg_t, s.f4, s.flx_i, s.white, s.h3, s.jcc]}
                  placeholder="Search through exercises"
                  onChangeText={(text) => this.setState({ filter: text })}
                />
              </RN.View>
            </RN.View>
            <RN.ScrollView style={[s.flx_i]} contentContainerStyle={[s.pl125]}>
              {defaultExercises
                .filter(exercise => filter
                  ? exercise.title.includes(filter)
                  : true,
                )
                .map(exercise =>
                  <RN.TouchableOpacity key={exercise.title} onPress={() => this.addExercise(exercise)}>
                    <ExerciseListItem exercise={exercise} />
                  </RN.TouchableOpacity>,
                )
              }
            </RN.ScrollView>
          </RN.View>
        </RN.Modal>
      </RN.View>
    );
  }
}

interface ExerciseListItemProps {
  exercise: Exercise,
}

const ExerciseListItem: React.StatelessComponent<ExerciseListItemProps> = ({exercise}) =>
  <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr05]}>
    <RN.Text style={[s.f4, s.bg_t, s.blue]}>
      {exercise.title}
    </RN.Text>
    <RN.Text style={[s.f6]}>
      {exercise.targetMuscles.map(({ title }) => title).join(', ')}
    </RN.Text>
  </RN.View>;

function generateDefaultExersices(
    exerscsesData: ExerciseData[],
    musclesData: MuscleData[],
  ): Exercise[] {

 return exerscsesData.map(({title, targetMusclesIds, additionalMusclesIds}) => {
    const targetMuscles = [...targetMusclesIds, ...additionalMusclesIds]
      .reduce((acc, muscleId) => {
        const muscleData = musclesData.find(muscle => muscle.id === muscleId);
        if (muscleData) { return [...acc, muscleData]; }
        return acc;
      }, [] as MuscleData[]);

    return {
      title,
      restSeconds: 90,
      attempts: [],
      targetMuscles,
    };
  });
}

RN.AppRegistry.registerComponent('Gymple', () => TrainingScreen);
