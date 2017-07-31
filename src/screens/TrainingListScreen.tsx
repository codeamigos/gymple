import * as React from 'react'
import * as RN from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Swipeout from 'react-native-swipeout'
import * as moment from 'moment'
// import TrainingScreen from './TrainingScreen'
import * as Model from '../Model'

import { s, colors, sizes } from 'react-native-better-styles'

interface TrainingsListState {
  isScrollEnabled: boolean
}

interface TrainingsListProps {
  editingTrainingIndex: number | null
  finishedTrainings: Model.FinishedTraining[]
  onStartNewTraining: () => void
  onRemoveFinishedTraining: (i: number) => void
  onOpenTraining: (training: Model.FinishedTraining, i: number) => void
}

export default class TrainingsListScreen extends React.PureComponent<TrainingsListProps, TrainingsListState> {
  constructor() {
    super()
    this.state = {
      isScrollEnabled: true
    }
  }

  allowScroll = (isScrollEnabled: boolean) => {
    this.setState({ isScrollEnabled })
  }

  render() {
    const { isScrollEnabled } = this.state
    const { finishedTrainings, onStartNewTraining, onRemoveFinishedTraining, onOpenTraining } = this.props

    if (finishedTrainings.length === 0) {
      return (
        <RN.View style={[s.flx_i, s.pv4, s.jcc, s.aic, s.bg_blue]}>
          <RN.StatusBar barStyle="light-content" translucent={true} backgroundColor={colors.t} />
          <RN.Text style={[s.white_50, s.f3, s.fw2, s.tc, s.ph4, s.mb1]}>
            You haven't completed any traingins yet
          </RN.Text>
          <RN.TouchableOpacity
            style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
            onPress={onStartNewTraining}
          >
            <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Start First Training</RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    }

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar barStyle="light-content" translucent={true} backgroundColor={colors.t} />
        <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb1]}>
          <RN.Text style={[s.white, s.fw3, s.f4, s.mt05]}>My Trainigs</RN.Text>
        </RN.View>
        <RN.View style={[s.flx_i, s.jcsb]}>
          <RN.ScrollView style={[s.flx_i]} scrollEnabled={isScrollEnabled}>
            {finishedTrainings.map((training, i) =>
              <Swipeout
                autoClose={true}
                key={String(training.finishedAt)}
                backgroundColor={colors.t}
                scroll={isAllow => this.allowScroll(isAllow)}
                buttonWidth={sizes[5]}
                right={[
                  {
                    onPress: () => onRemoveFinishedTraining(i),
                    component: (
                      <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}>
                        <Icon name="md-trash" style={[s.white, s.f3, s.tc]} />
                      </RN.View>
                    )
                  }
                ]}
              >
                <RN.TouchableOpacity
                  onPress={() => {
                    onOpenTraining(training, i)
                  }}
                >
                  <TrainingsListItem training={training} />
                </RN.TouchableOpacity>
              </Swipeout>
            )}
          </RN.ScrollView>
          <RN.View style={s.pb175}>
            <RN.TouchableOpacity
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
              onPress={onStartNewTraining}
            >
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Start New Training</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      </RN.View>
    )
  }
}

const TrainingsListItem = ({ training }: { training: Model.FinishedTraining }) => {
  return (
    <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr1, s.ml125]}>
      <RN.View style={[s.flx_row, s.jcsb, s.aifs]}>
        <RN.Text style={[s.f3, s.fw2, s.bg_t, s.blue, s.flx_i, s.mb025]}>
          {training.title}
        </RN.Text>
      </RN.View>
      <RN.Text style={[s.f6, s.black_50, s.fw3]}>
        {moment(training.finishedAt).format('dddd (MMMM Do)')}
      </RN.Text>
    </RN.View>
  )
}
