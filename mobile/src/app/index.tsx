import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const features = [
  ['Organiser', 'Scènes, personnages et branches réunis dans un seul univers.'],
  ['Écrire', 'Un espace calme pour rédiger sans perdre le contexte.'],
  ['Créer', 'Du récit linéaire à l’expérience interactive.'],
];

export default function HomeScreen() {
  const theme = useTheme();
  return <ThemedView style={styles.screen}>
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: BottomTabInset + 40 }]}>
        <View style={styles.brandRow}><ThemedText type="smallBold" style={styles.brand}>Scenariom<TextAccent /></ThemedText><ThemedText type="small" themeColor="textSecondary">Studio narratif</ThemedText></View>
        <View style={styles.hero}>
          <View style={[styles.pill, { borderColor: theme.border, backgroundColor: theme.surface }]}><ThemedText type="small" themeColor="textSecondary">Votre univers commence ici</ThemedText></View>
          <ThemedText type="title" style={styles.title}>Les histoires méritent plus qu’une page blanche.</ThemedText>
          <ThemedText style={styles.lead} themeColor="textSecondary">Écrivez, organisez et transformez vos récits en expériences interactives.</ThemedText>
          <View style={styles.actions}><Pressable onPress={() => router.push('/projects')} style={[styles.primaryButton, { backgroundColor: theme.primary }]}><ThemedText type="smallBold" style={styles.white}>Voir mes projets</ThemedText></Pressable><Pressable onPress={() => router.push('/editor')} style={[styles.secondaryButton, { borderColor: theme.border, backgroundColor: theme.surface }]}><ThemedText type="smallBold">Tester l’éditeur</ThemedText></Pressable></View>
        </View>
        <View style={styles.features}>{features.map(([title, description], index) => <ThemedView type="surface" style={[styles.feature, { borderColor: theme.border }]} key={title}><ThemedText type="smallBold" style={{ color: theme.primary }}>0{index + 1}</ThemedText><ThemedText type="subtitle" style={styles.featureTitle}>{title}</ThemedText><ThemedText themeColor="textSecondary">{description}</ThemedText></ThemedView>)}</View>
      </ScrollView>
    </SafeAreaView>
  </ThemedView>;
}

function TextAccent() { const theme = useTheme(); return <ThemedText style={{ color: theme.accent }}>.</ThemedText>; }

const styles = StyleSheet.create({ screen:{flex:1}, safe:{flex:1}, content:{paddingHorizontal:Spacing.four, maxWidth:920, width:'100%', alignSelf:'center'}, brandRow:{paddingVertical:Spacing.four, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}, brand:{fontSize:20}, hero:{paddingVertical:Spacing.six, alignItems:'flex-start'}, pill:{borderWidth:1, borderRadius:999, paddingHorizontal:Spacing.three, paddingVertical:Spacing.two}, title:{marginTop:Spacing.four, maxWidth:720, fontSize:46, lineHeight:50}, lead:{marginTop:Spacing.four, maxWidth:600, fontSize:18, lineHeight:28}, actions:{marginTop:Spacing.four, flexDirection:'row', flexWrap:'wrap', gap:Spacing.two}, primaryButton:{paddingHorizontal:Spacing.four, paddingVertical:Spacing.three, borderRadius:10}, secondaryButton:{paddingHorizontal:Spacing.four, paddingVertical:Spacing.three, borderRadius:10, borderWidth:1}, white:{color:'#FFFFFF'}, features:{gap:Spacing.three}, feature:{borderWidth:1, borderRadius:16, padding:Spacing.four}, featureTitle:{fontSize:24, lineHeight:32, marginTop:Spacing.two, marginBottom:Spacing.one} });
