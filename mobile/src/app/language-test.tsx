import { useFonts } from 'expo-font';
import { ScrollView, Text, View } from 'react-native';
import { supportedLocales, translate, type Locale } from '@scenariom/i18n';
import { UiButton, UiCard, UiCardBody, UiCardHeader } from '@scenariom/design-system/ui';
import { apiUrl, useThemeRuntime } from '@/contexts/theme-runtime-context';

const labels: Record<Locale, string> = { en:'English',fr:'Français',es:'Español',de:'Deutsch',pt:'Português',it:'Italiano',ja:'日本語',ko:'한국어',zh:'中文',ar:'العربية',hi:'हिन्दी',tr:'Türkçe',ru:'Русский' };

const writingSamples = [
  { language: 'English', lang: 'en', rtl: false, text: 'Every story begins with a world waiting to be imagined.' },
  { language: 'Français', lang: 'fr', rtl: false, text: 'Chaque histoire commence par un monde qui attend d’être imaginé.' },
  { language: '中文', lang: 'zh', rtl: false, text: '每个故事都始于一个等待被想象的世界。' },
  { language: '日本語', lang: 'ja', rtl: false, text: 'すべての物語は、想像されるのを待つ世界から始まります。' },
  { language: '한국어', lang: 'ko', rtl: false, text: '모든 이야기는 상상되기를 기다리는 세계에서 시작됩니다.' },
  { language: 'বাংলা', lang: 'bn', rtl: false, text: 'প্রতিটি গল্প শুরু হয় এমন একটি জগৎ দিয়ে, যা কল্পিত হওয়ার অপেক্ষায় থাকে।' },
  { language: 'Русский', lang: 'ru', rtl: false, text: 'Каждая история начинается с мира, который ждёт, чтобы его представили.' },
  { language: 'Türkçe', lang: 'tr', rtl: false, text: 'Her hikâye, hayal edilmeyi bekleyen bir dünyayla başlar.' },
  { language: 'العربية', lang: 'ar', rtl: true, text: 'تبدأ كل قصة بعالم ينتظر أن نتخيله.' },
  { language: 'Հայերեն', lang: 'hy', rtl: false, text: 'Յուրաքանչյուր պատմություն սկսվում է մի աշխարհից, որը սպասում է երևակայվելուն։' },
  { language: 'ܐܪܡܝܐ — Araméen', lang: 'syr', rtl: true, text: 'ܟܠ ܫܘܥܝܬܐ ܫܪܝܐ ܒܥܠܡܐ ܕܡܣܟܐ ܠܕܡܝܢܘܬܐ.' },
] as const;

export default function LanguageTestScreen() {
  const { language, setLanguage, isRTL } = useThemeRuntime();
  const locale = language as Locale;
  const [fontsLoaded] = useFonts({
    ScenariomSans: `${apiUrl}/assets/fonts/noto-sans-regular.ttf`,
    ScenariomArabic: `${apiUrl}/assets/fonts/noto-sans-arabic-regular.ttf`,
  });
  const t = (key: Parameters<typeof translate>[0]) => translate(key, {}, locale);
  const fontFamily = locale === 'ar' ? 'ScenariomArabic' : 'ScenariomSans';
  const textStyle = { fontFamily, textAlign: (isRTL ? 'right' : 'left') as 'right'|'left', writingDirection: (isRTL ? 'rtl' : 'ltr') as 'rtl'|'ltr' };

  return <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-5 p-4 pb-28" contentContainerStyle={{direction:isRTL?'rtl':'ltr'}}>
    <View className="gap-3"><Text style={textStyle} className="text-sm font-bold uppercase text-primary">Unicode · LTR · RTL</Text><Text style={textStyle} className="text-4xl font-bold text-foreground">{t('languageTest.title')}</Text><Text style={textStyle} className="text-base leading-7 text-muted">{t('languageTest.description')}</Text></View>
    <View className="flex-row flex-wrap gap-2">{supportedLocales.map(item=><UiButton key={item} variant={locale===item?'solid':'outline'} onPress={()=>setLanguage(item)}>{labels[item]}</UiButton>)}</View>
    <UiCard><UiCardHeader>{t('languageTest.interfaceSample')}</UiCardHeader><UiCardBody><Text style={textStyle} className="text-muted">{t('languageTest.direction')}</Text><Text style={textStyle} className="text-primary">{fontsLoaded?t('languageTest.fontReady'):t('languageTest.fontFallback')}</Text></UiCardBody></UiCard>
    <UiCard><UiCardHeader>{t('languageTest.storySample')}</UiCardHeader><UiCardBody><Text style={textStyle} className="text-xl leading-9 text-foreground">{t('languageTest.story')}</Text></UiCardBody></UiCard>
    <UiCard><UiCardHeader>{t('languageTest.characters')}</UiCardHeader><UiCardBody><Text style={textStyle} className="text-xl leading-9 text-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · АБВГДЕЖЗИЙК · абвгдежзийк · ابتثجحخدذرزسشصضطظعغفقكلمنهوي · 0123456789 · !؟«»—</Text></UiCardBody></UiCard>
    <Text className="text-2xl font-bold text-foreground">Test de plusieurs écritures</Text>
    {writingSamples.map(sample=><UiCard key={sample.lang}><UiCardHeader>{sample.language} · {sample.rtl?'RTL':'LTR'}</UiCardHeader><UiCardBody><Text accessibilityLanguage={sample.lang} style={{fontFamily: sample.lang==='ar'?'ScenariomArabic':'ScenariomSans',textAlign:sample.rtl?'right':'left',writingDirection:sample.rtl?'rtl':'ltr'}} className="text-xl leading-9 text-foreground">{sample.text}</Text></UiCardBody></UiCard>)}
  </ScrollView>;
}
