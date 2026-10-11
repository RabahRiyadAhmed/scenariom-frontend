import type { ComponentProps } from 'react';
import { TextInput, useColorScheme } from 'react-native';

export function ThemeTextInput({placeholderTextColor,...props}:ComponentProps<typeof TextInput>){const scheme=useColorScheme();const explicit=typeof placeholderTextColor==='string'&&!placeholderTextColor.startsWith('var(')?placeholderTextColor:undefined;return <TextInput {...props} placeholderTextColor={explicit??(scheme==='dark'?'#A8B3C5':'#64748B')}/>}
