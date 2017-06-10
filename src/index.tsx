import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

import bs, {Palette, Multiplicators, Options} from './styles';
import exerscisesData, {ExerciseData} from './exercises';
import musclesData, {MuscleData} from './muscles';

const shouldNeverHappen = (_: never): never => {throw new Error('Should never happen!'); };

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
  kind: 'NotStartedTraining',
  title: string,
  plannedExercises: Exercise[],
}

interface OngoingTraining {
  kind: 'OngoingTraining',
  title: string,
  startedAt: Date,
  plannedExercises: Exercise[],
  currentExerciseIndex: number | null,
  completedExercises: Exercise[],
}

/*
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
  training: NotStartedTraining | OngoingTraining,
  editingExercise: Exercise | null,
  isModalOpened: boolean,
  isScrollEnabled: boolean,
  editingExerciseIndex: number | null,
}

class TrainingScreen extends React.PureComponent<void, TrainingScreenState> {
  constructor(props: void) {
    super(props);

    this.state = {
      training: {
        kind: 'NotStartedTraining',
        title: 'New training',
        plannedExercises: [],
      },
      editingExerciseIndex: null,
      editingExercise: null,
      isModalOpened: true,
      isScrollEnabled: true,
    };
  }

  setEditingExercise = (editingExercise: Exercise, editingExerciseIndex: number | null = null) => {
    this.setState({
      editingExercise: {...editingExercise},
      editingExerciseIndex,
      isModalOpened: true,
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

  updateExercise = (updatedExercise: Exercise, editingExerciseIndex: number) => {
    const { training } = this.state;
    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.map((exercise, i) => i === editingExerciseIndex ? updatedExercise : exercise),
      },
      editingExercise: null,
      editingExerciseIndex: null,
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

  renderNotStartedTraining = (): JSX.Element => {
    const { training, isModalOpened, isScrollEnabled, editingExercise, editingExerciseIndex } = this.state;
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
            autoClose={true}
            key={exercise.title + i}
            backgroundColor={colors.t}
            scroll={isAllow => this.allowScroll(isAllow)}
            buttonWidth={sizes[7]}
            right={[
              {
                onPress: () => this.removeExercise(i),
                component: <RN.View style={[s.w7, s.bg_orange, s.jcc, s.flx_i]}><RN.Text style={[s.f5, s.tc, s.white]}>Remove</RN.Text></RN.View>,
              },
              {
                onPress: () => this.setEditingExercise(exercise, i),
                component: <RN.View style={[s.w7, s.bg_green, s.jcc, s.flx_i]}><RN.Text style={[s.f5, s.tc, s.white]}>Edit</RN.Text></RN.View>,
              },
            ]}
          >
            <ExerciseListItem exercise={exercise} />
          </Swipeout>,
        )}
        </RN.ScrollView>
        <RN.View style={s.pb175}>
          <RN.TouchableHighlight
            style={[s.asc, s.b_green, s.bw2, s.br2, s.h325, s.jcc, s.ph3]}
            onPress={() => this.setState({ isModalOpened: true })}
          >
            <RN.Text style={[s.f4, s.green, s.tc, s.b]}>
              Add Exercise
            </RN.Text>
          </RN.TouchableHighlight>
          {training.plannedExercises.length > 0 &&
            <RN.TouchableHighlight
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
              onPress={() => this.setState({ isModalOpened: true })}
            >
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                Start Training
              </RN.Text>
            </RN.TouchableHighlight>
          }
        </RN.View>
        <RN.Modal
          animationType="slide"
          transparent={false}
          visible={isModalOpened}
          onRequestClose={() => this.setState({ isModalOpened: false })}
        >
          {editingExercise ?
            <ExerciseSettings
              onUpdate={(exercise: Exercise) => this.setState({editingExercise: exercise})}
              onClose={() => this.setState({ editingExercise: null, isModalOpened: editingExerciseIndex === null })}
              onDone={() => editingExerciseIndex !== null ? this.updateExercise(editingExercise, editingExerciseIndex) : this.addExercise(editingExercise)}
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

  renderOngoingTraining = (): JSX.Element => {
    const { training } = this.state;
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
      </RN.View>
    );
  }

  render() {
    const {training} = this.state;
    switch (training.kind) {
      case 'NotStartedTraining': return this.renderNotStartedTraining();
      case 'OngoingTraining': return this.renderOngoingTraining();
      default:
        shouldNeverHappen(training);
        return null;
    }
  }
}

interface ExerciseListItemProps {
  exercise: Exercise,
}

const ExerciseListItem: React.StatelessComponent<ExerciseListItemProps> = ({exercise}) =>
  <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr1, s.ml125]}>
    <RN.View style={[s.flx_row, s.jcsb, s.aifs]}>
      <RN.Text style={[s.f4, s.bg_t, s.blue, s.flx_i, s.mb025, s.lh125]}>
        {exercise.title}
      </RN.Text>
      {exercise.attempts.length > 0 &&
        <RN.View style={[s.ml075, s.flx_row, s.aic, s.mt0125]}>
          <RN.Text style={[s.f6, s.b]}>{exercise.attempts.length}</RN.Text>
          <Icon name="md-close" color={colors.black_20} style={[s.f5, s.ph025]} />
          <RN.Text style={[s.f6, s.b]}>{Math.round(exercise.attempts.reduce((acc, a) => acc + a.repetitions, 0) / exercise.attempts.length)}</RN.Text>
          <Icon name="md-close" color={colors.black_20} style={[s.f5, s.ph025]} />
          <RN.Text style={[s.f6, s.b]}>{Math.round(exercise.attempts.reduce((acc, a) => acc + a.weight, 0) / exercise.attempts.length)}kg</RN.Text>
        </RN.View>
      }
    </RN.View>
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
  onUpdate: (exercise: Exercise) => void,
  onDone: () => void,
  exercise: Exercise,
}

const ExerciseSettings: React.StatelessComponent<ExerciseSettingsProps> = ({exercise, onClose, onDone, onUpdate}) => {

  const handleAddAttempt = () => {
    const attempts = exercise.attempts.length >= 1
      ? exercise.attempts.concat(exercise.attempts[exercise.attempts.length - 1])
      : exercise.attempts.concat({weight: 30, repetitions: 12});
    onUpdate({
      ...exercise,
      attempts,
    });
  };

  const handleRemoveAttempt = () => {
    if (exercise.attempts.length >= 2) {
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.slice(0, exercise.attempts.length - 1),
      });
    }
  };

  const handleChangeOverallWeight = (weightString: string) => {
    if (!isNaN(parseInt(weightString, 10)) && parseInt(weightString, 10) > 0) {
      const weight = parseInt(weightString, 10);
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, weight})),
      });
    }
    else {
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, weight: 0})),
      });
    }
  };

  const handleChangeOverallRepeats = (repeatsString: string) => {
     if (!isNaN(parseInt(repeatsString, 10)) && parseInt(repeatsString, 10) > 0) {
      const repetitions = parseInt(repeatsString, 10);
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, repetitions})),
      });
    }
    else {
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, repetitions: 1})),
      });
    }
  };

  const handleChangeRestSeconds = (restSecondsString: string) => {
    if (!isNaN(parseInt(restSecondsString, 10)) && parseInt(restSecondsString, 10) > 0) {
      const restSeconds: number = parseInt(restSecondsString, 10);
      onUpdate({
        ...exercise,
        restSeconds,
      });
    }
    else {
      onUpdate({
        ...exercise,
        restSeconds: 0,
      });
    }
  };

  const exerciseHasAttempts = exercise.attempts.length > 0;

  return (
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
      <RN.View style={[s.flx_i, s.bg_blueDark, s.jcsb, s.pb175, s.ph125]}>
        <RN.ScrollView contentContainerStyle={s.pt175} scrollEnabled={false }>
          <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
            <RN.Text style={[s.f3, s.white]}>Attempts</RN.Text>
            <RN.View style={[s.aic, s.flx_row]}>
              <RN.TouchableOpacity
                onPress={handleRemoveAttempt}
                disabled={exercise.attempts.length === 1}
                style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
                <Icon name="md-remove" size={sizes[175]} color={exercise.attempts.length <= 1 ? colors.blueDark : colors.white} />
              </RN.TouchableOpacity>
              <RN.Text style={[s.f2, s.white, s.bg_t, s.b, s.tc, s.w3]}>{exercise.attempts.length}</RN.Text>
              <RN.TouchableOpacity
                onPress={handleAddAttempt}
                disabled={exercise.attempts.length === 99}
                style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
                <Icon name="md-add" size={sizes[175]} color={exercise.attempts.length >= 99 ? colors.blueDark : colors.white} />
              </RN.TouchableOpacity>
            </RN.View>
          </RN.View>
          {exerciseHasAttempts &&
          <RN.View>
            <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
              <RN.Text style={[s.f3, s.white]}>Repeats</RN.Text>
              <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
                <RN.TextInput
                  value={String(exercise.attempts[exercise.attempts.length - 1].repetitions || '')}
                  keyboardType="numeric"
                  underlineColorAndroid={colors.t}
                  placeholderTextColor={colors.white_20}
                  style={[s.bg_t, s.f2, s.b, s.white, s.h3, s.tc]}
                  placeholder="12"
                  onChangeText={(repeatsString) => handleChangeOverallRepeats(repeatsString)}
                  onBlur={() => RN.Keyboard.dismiss()}
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
                  placeholder="25"
                  onChangeText={(weightString) => handleChangeOverallWeight(weightString)}
                  onBlur={() => RN.Keyboard.dismiss()}
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
                  placeholder="60"
                  onChangeText={(restSecondsString) => handleChangeRestSeconds(restSecondsString)}
                  onBlur={() => RN.Keyboard.dismiss()}
                />
              </RN.View>
            </RN.View>

          </RN.View>
          }
        </RN.ScrollView>
        <RN.View>
          <RN.TouchableHighlight
            disabled={!exerciseHasAttempts}
            style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph4, s.mb075, !exerciseHasAttempts ? s.o_50 : null]}
            onPress={onDone}>
            <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Done</RN.Text>
          </RN.TouchableHighlight>
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

RN.AppRegistry.registerComponent('Gymple', () => TrainingScreen);
