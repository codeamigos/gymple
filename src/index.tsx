import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

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
    repetitions: number,
  }>,
  targetMuscles: Muscle[]
}

interface Muscle {
  id: number,
  title: string,
}


interface TrainingScreenState {
  training: NotStartedTraining,
  editingExercise: Exercise | null,
  isModalOpened: boolean,
  isScrollEnabled: boolean,
}

class TrainingScreen extends React.PureComponent<void, TrainingScreenState> {
  constructor(props: void) {
    super(props);

    this.state = {
      training: {
        title: 'New training',
        plannedExercises: [],
      },
      editingExercise: null,
      isModalOpened: true,
      isScrollEnabled: true,
    };
  }

  setEditingExercise = (editingExercise: Exercise) => {
    this.setState({
      editingExercise: {...editingExercise},
    });
  }

  addExercise = (exercise: Exercise) => {
    const { training } = this.state;

    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.concat(exercise),
      },
      editingExercise: null,
      isModalOpened: false,
    });
  }

  removeExercise = (index: number) => {
    const { training } = this.state;
    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.filter((_, i) => i !== index),
      },
    });
  }

  allowScroll = (isScrollEnabled: boolean) => {
    this.setState({isScrollEnabled});
  }

  render() {
    const { training, isModalOpened, isScrollEnabled, editingExercise } = this.state;

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={colors.t}
          />
        <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb05]}>
          <RN.Text style={[s.white, s.fw3, s.f2, s.mb05, s.lh2]}>
            {training.title}
          </RN.Text>
          <RN.Text style={[s.white, s.f5, s.mb05]}>
            Today
          </RN.Text>
        </RN.View>
        <RN.ScrollView style={[s.flx_i]} scrollEnabled={isScrollEnabled}>
          {training.plannedExercises.map((exercise, i) =>
          <Swipeout
            key={exercise.title + i}
            backgroundColor={colors.t}
            scroll={isAllow => this.allowScroll(isAllow)}
            buttonWidth={sizes[7]}
            right={[
              {
                onPress: () => this.removeExercise(i),
                component: <RN.View style={[s.w7, s.bg_orange, s.jcc, s.flx_i]}><RN.Text style={[s.f5, s.tc, s.white]}>Remove</RN.Text></RN.View>,
              },
            ]}
          >
            <ExerciseListItem exercise={exercise} />
          </Swipeout>,
        )}
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
          {editingExercise ?
            <ExerciseSettings
              onClose={() => this.setState({ editingExercise: null })}
              onAdd={() => this.addExercise(editingExercise)}
              onStart={() => this.addExercise(editingExercise)}
              exercise={editingExercise}
            />
            :
            <ExerciseList
              onSelect={this.setEditingExercise}
              onClose={() => this.setState({ isModalOpened: false })}
              exercises={generateDefaultExersices(exerscisesData, musclesData)}
            />
          }
        </RN.Modal>
      </RN.View>
    );
  }
}

interface ExerciseListItemProps {
  exercise: Exercise,
}

const ExerciseListItem: React.StatelessComponent<ExerciseListItemProps> = ({exercise}) =>
  <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr05, s.ml125]}>
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
      attempts: [{
        weight: 50,
        repetitions: 8,
      }],
      targetMuscles,
    };
  });
}

interface ExerciseListProps {
  onClose: () => void,
  onSelect: (exercise: Exercise) => void,
  exercises: Exercise[],
}

interface ExerciseListState {
  filter: string | null,
}

class ExerciseList extends React.PureComponent<ExerciseListProps, ExerciseListState> {
  constructor(props: ExerciseListProps) {
    super(props);
    this.state = {
      filter: null,
    };
  }
  render() {
    const {filter} = this.state;
    const {exercises, onClose, onSelect} = this.props;
    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.View style={[s.bg_blue, s.pt2, s.ph05, s.pb05]}>
          <RN.TouchableOpacity onPress={onClose}>
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
        <RN.ScrollView style={[s.flx_i]}>
          {exercises
            .filter(exercise => filter
              ? exercise.title.includes(filter)
              : true,
            )
            .map(exercise =>
              <RN.TouchableOpacity key={exercise.title} onPress={() => onSelect(exercise)}>
                <ExerciseListItem exercise={exercise} />
              </RN.TouchableOpacity>,
            )
          }
        </RN.ScrollView>
      </RN.View>
    );
  }
}

interface ExerciseSettingsProps {
  onClose: () => void,
  onStart: () => void,
  onAdd: () => void,
  exercise: Exercise,
}

const ExerciseSettings: React.StatelessComponent<ExerciseSettingsProps> = ({exercise, onClose, onAdd, onStart}) =>
  <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
    <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb05]}>
      <RN.TouchableOpacity onPress={onClose}>
        <Icon name="md-arrow-back" size={sizes[175]} color={colors.white} />
      </RN.TouchableOpacity>
      <RN.Text style={[s.white, s.fw3, s.f2, s.mv05, s.lh2]}>
        {exercise.title}
      </RN.Text>
      <RN.Text style={[s.white, s.f5, s.mb05]}>
        {exercise.targetMuscles.map(({ title }) => title).join(', ')}
      </RN.Text>
    </RN.View>
    <RN.View style={[s.flx_i, s.bg_blueDark, s.jcsb, s.pv175, s.ph125]}>
      <RN.View>

        <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
          <RN.Text style={[s.f3, s.white]}>Attempts</RN.Text>
          <RN.View style={[s.aic, s.flx_row]}>
            <RN.TouchableOpacity
              disabled={exercise.attempts.length === 1}
              style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
              <Icon name="md-remove" size={sizes[175]} color={colors.white} />
            </RN.TouchableOpacity>
            <RN.Text style={[s.f2, s.white, s.bg_t, s.b, s.tc, s.w3]}>{exercise.attempts.length}</RN.Text>
            <RN.TouchableOpacity
              disabled={exercise.attempts.length === 99}
              style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
              <Icon name="md-add" size={sizes[175]} color={colors.white} />
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>

        <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
          <RN.Text style={[s.f3, s.white]}>Repeats</RN.Text>
          <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
            <RN.TextInput
              value={String(exercise.attempts[exercise.attempts.length - 1].repetitions || '')}
              keyboardType="numeric"
              underlineColorAndroid={colors.t}
              placeholderTextColor={colors.white_20}
              style={[s.bg_t, s.f2, s.b, s.white, s.h3, s.tc]}
              placeholder="3"
              onChangeText={() => {}}
            />
          </RN.View>
        </RN.View>

        <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
          <RN.View style={[s.flx_row, s.aife]}>
            <RN.Text style={[s.f3, s.white]}>Weight</RN.Text>
            <RN.Text style={[s.f4, s.white_20]}>, kg</RN.Text>
          </RN.View>
          <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
            <RN.TextInput
              value={String(exercise.attempts[exercise.attempts.length - 1].weight || '')}
              keyboardType="numeric"
              underlineColorAndroid={colors.t}
              placeholderTextColor={colors.white_20}
              style={[s.bg_t, s.f2, s.b, s.white, s.h3, s.tc]}
              placeholder="3"
              onChangeText={() => {}}
            />
          </RN.View>
        </RN.View>

        <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
          <RN.View style={[s.flx_row, s.aife]}>
            <RN.Text style={[s.f3, s.white]}>Rest</RN.Text>
            <RN.Text style={[s.f4, s.white_20]}>, sec</RN.Text>
          </RN.View>
          <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
            <RN.TextInput
              value={String(exercise.restSeconds || '')}
              keyboardType="numeric"
              underlineColorAndroid={colors.t}
              placeholderTextColor={colors.white_20}
              style={[s.bg_t, s.f2, s.b, s.white, s.h3, s.tc]}
              placeholder="3"
              onChangeText={() => {}}
            />
          </RN.View>
        </RN.View>

      </RN.View>
      <RN.View>
        <RN.TouchableHighlight
          style={[s.ass, s.bg_green, s.br2, s.h325, s.jcc, s.ph1, s.mb075]}
          onPress={onStart}>
          <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
            Do it now
          </RN.Text>
        </RN.TouchableHighlight>
        <RN.TouchableHighlight
          style={[s.ass, s.bg_t, s.br2, s.h325, s.jcc, s.bw2, s.ph1, s.b_white_10]}
          onPress={onAdd}>
          <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
            Just add
          </RN.Text>
        </RN.TouchableHighlight>
      </RN.View>
    </RN.View>
  </RN.View>;

RN.AppRegistry.registerComponent('Gymple', () => TrainingScreen);
