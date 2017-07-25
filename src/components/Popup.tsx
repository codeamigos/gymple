import * as React from 'react'
import * as RN from 'react-native'

import { s } from './../styles'
const { height } = RN.Dimensions.get('window')

interface PopupState {
  isExpanded: boolean
  transition: RN.Animated.Value
}

interface PopupProps {
  isExpanded: boolean
  children: React.ReactNode
  style?: RN.StyleProp<RN.ViewStyle>
  fade?: boolean
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

  startCloseAnimation = (expand: boolean) => {
    const { transition, isExpanded } = this.state
    if (expand !== isExpanded) {
      this.setState({ isExpanded: expand })
      transition.stopAnimation()
      RN.Animated
        .timing(transition, {
          toValue: expand ? 1000 : 0,
          duration: 100
        })
        .start()
    }
  }

  render() {
    const { transition } = this.state
    const { fade, style, children } = this.props

    const animatedStyle = fade
      ? {
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
      : {
          opacity: transition.interpolate({
            inputRange: [0, 1000],
            outputRange: [0, 1]
          }),
          transform: [
            {
              translateY: transition.interpolate({
                inputRange: [0, 1, 1000],
                outputRange: [height, 20, 0]
              })
            }
          ]
        }

    return (
      <RN.Animated.View style={[s.absolute, s.absolute__fill, animatedStyle, style]}>
        {children}
      </RN.Animated.View>
    )
  }
}
