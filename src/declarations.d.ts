declare module "react-native-vector-icons/Ionicons" {
  import * as R from 'react';
  import * as RN from 'react-native';

  interface Props {
    size?: number;
    name?: string;
    color?: string;
    style?: RN.TextStyle,
  }

  export default class Button extends R.Component<Props, any> {}
}

declare module "react-native-swipeout" {
  import * as R from 'react';
  import * as RN from 'react-native';

  interface SwipeoutButton {
    backgroundColor?: string,
    color?: string,
    component?: R.ReactElement<any>,
    onPress?: () => any,
    text?: string,
    type?: 'default' | 'primary' | 'secondary',
    underlayColor?: string,
    disabled?: boolean,
  }

  interface Props {
    autoClose?: boolean,
    backgroundColor?: string,
    close?: boolean,
    disabled?: boolean,
    left?: SwipeoutButton[],
    onOpen?: (sectionID: number, rowId: number, direction: string) => void,
    onClose?: (sectionID: number, rowId: number, direction: string) => void,
    right?: SwipeoutButton[],
    scroll?:	(isScrollAllowed: boolean) => void,
    style?: RN.ViewStyle,
    sensitivity?: number,
    buttonWidth?: number,
  }

  export default class Swipeout extends R.Component<Props, any> {}
}
