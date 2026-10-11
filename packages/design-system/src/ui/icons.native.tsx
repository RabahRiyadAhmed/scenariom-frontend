import { useColorScheme } from 'react-native';
import {
  Plus, Minus, Check, X, Send, Trash2, Copy, Mail, Info, TriangleAlert,
  ArrowRight, ArrowLeft, ChevronDown, ChevronUp, ChevronRight, ChevronLeft,
  Search, Settings, User, Bell, Download, Upload, Pencil, Eye, EyeOff,
  Lock, Star, Heart, Share2, Menu, X as Close, Filter, MoreHorizontal,
  RefreshCw, Save, Calendar, Clock, Link as LinkIcon, ExternalLink,
  Play, Pause, Undo2,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { colorTokens } from '../tokens';
import { useUiThemeColors } from '../ui-theme';
import type { UiIconName } from './types';

const iconMap: Record<UiIconName, LucideIcon> = {
  'plus': Plus, 'minus': Minus, 'check': Check, 'x': X, 'send': Send, 'trash': Trash2,
  'copy': Copy, 'mail': Mail, 'info': Info, 'warning': TriangleAlert,
  'arrow-right': ArrowRight, 'arrow-left': ArrowLeft, 'chevron-down': ChevronDown,
  'chevron-up': ChevronUp, 'chevron-right': ChevronRight, 'chevron-left': ChevronLeft,
  'search': Search, 'settings': Settings, 'user': User, 'bell': Bell,
  'download': Download, 'upload': Upload, 'edit': Pencil, 'eye': Eye,
  'eye-off': EyeOff, 'lock': Lock, 'star': Star, 'heart': Heart,
  'share': Share2, 'menu': Menu, 'close': Close, 'filter': Filter,
  'more': MoreHorizontal, 'refresh': RefreshCw, 'save': Save,
  'calendar': Calendar, 'clock': Clock, 'link': LinkIcon,
  'external': ExternalLink, 'play': Play, 'pause': Pause, 'undo': Undo2,
};

const iconSize: Record<'sm' | 'md' | 'lg', number> = { sm: 14, md: 16, lg: 18 };

export function UiIcon({ name, size = 'md', tintColor }: { name: UiIconName; size?: 'sm' | 'md' | 'lg'; tintColor?: string }) {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const runtimeColors = useUiThemeColors();
  const Icon = iconMap[name];
  if (!Icon) return null;
  const resolvedTintColor = tintColor ?? runtimeColors?.foreground ?? colorTokens[scheme].foreground;
  return <Icon size={iconSize[size]} color={resolvedTintColor} />;
}
