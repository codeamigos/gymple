import * as React from 'react'
import * as RN from 'react-native'

import { s } from 'react-native-better-styles'
const { height } = RN.Dimensions.get('window')

interface PopupState {
  isExpanded: boolean
  transition: RN.Animated.Value
}

interface PopupProps {
  isExpanded: boolean
  children: React.ReactNode
  style?: RN.StyleProp<RN.ViewStyle>
  contentContainerStyle?: RN.StyleProp<RN.ViewStyle>
  onOpen?: () => void
  onClose?: () => void
}

export default class Modal extends React.PureComponent<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props)
    this.state = {
      isExpanded: false,
      transition: new RN.Animated.Value(0)
    }
  }

  componentDidMount() {
    this.startAnimation(this.props.isExpanded)
  }

  componentWillReceiveProps(nextProps: PopupProps) {
    this.startAnimation(nextProps.isExpanded)
  }

  startAnimation = (expand: boolean) => {
    const { onClose, onOpen } = this.props
    const { transition, isExpanded } = this.state
    if (expand !== isExpanded) {
      this.setState({ isExpanded: expand })
      transition.stopAnimation()
      RN.Animated
        .timing(transition, {
          toValue: expand ? 1000 : 0,
          duration: 100
        })
        .start(() => {
          if (expand) !!onOpen && onOpen()
          else !!onClose && onClose()
        })
    }
  }

  render() {
    const { transition } = this.state
    const { style, children, contentContainerStyle } = this.props

    const animatedContainerStyle = {
      opacity: transition.interpolate({
        inputRange: [0, 1000],
        outputRange: [0, 1]
      }),
      transform: [
        {
          translateY: transition.interpolate({
            inputRange: [0, 1, 1000],
            outputRange: [height, 0, 0]
          })
        }
      ]
    }
    const animatedContentStyle = {
      transform: [
        {
          translateY: transition.interpolate({
            inputRange: [0, 1, 1000],
            outputRange: [height, 40, 0]
          })
        }
      ]
    }

    return (
      <RN.Animated.View style={[s.absolute, s.absolute__fill, animatedContainerStyle, style]}>
        <RN.Animated.View style={[s.flx_i, animatedContentStyle, contentContainerStyle]}>{children}</RN.Animated.View>
      </RN.Animated.View>
    )
  }
}
