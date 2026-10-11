import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';

export function ScreenSafeArea({edges: _edges,...props}:SafeAreaViewProps){return <SafeAreaView {...props} edges={['left','right']}/>}
