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
