import { router } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/contexts/auth-context';
import { useThemeRuntime } from '@/contexts/theme-runtime-context';

const SafeAreaView = View;

export function AuthScreen({ mode }: { mode: 'login' | 'register' }) {
  const { signIn } = useAuth();
  const theme = useTheme();
  const { isDark: dark } = useThemeRuntime();
  const register = mode === 'register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async () => {
    setPending(true); setError('');
    try { await signIn(mode, email, password); router.replace('/projects'); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Connexion impossible.'); setPending(false); }
  };

  return <ThemedView style={styles.screen}><SafeAreaView style={styles.safe}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.safe}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
    <Image source={dark ? require('@/assets/images/logos/logo-dark.jpg') : require('@/assets/images/logos/logo-light.jpg')} style={styles.logo}/>
    <ThemedText readableOnBackground type="smallBold" style={{ color: theme.primary }}>{register ? 'CRÉER UN COMPTE' : 'BON RETOUR'}</ThemedText>
    <ThemedText readableOnBackground type="subtitle" style={styles.title}>{register ? 'Commencer à créer' : 'Se connecter'}</ThemedText>
    <ThemedText readableOnBackground themeColor="textSecondary">{register ? 'Un e-mail et un mot de passe suffisent pour commencer.' : 'Retrouvez vos projets et votre espace de création.'}</ThemedText>
    <View style={styles.form}><ThemedText type="smallBold">Adresse e-mail</ThemedText><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" style={[styles.input,{borderColor:theme.border,backgroundColor:theme.surface,color:theme.foreground}]} placeholder="vous@exemple.com" placeholderTextColor={theme.muted}/>
      <ThemedText type="smallBold">Mot de passe</ThemedText><TextInput value={password} onChangeText={setPassword} secureTextEntry autoComplete={register ? 'new-password' : 'current-password'} style={[styles.input,{borderColor:theme.border,backgroundColor:theme.surface,color:theme.foreground}]} placeholder="••••••••••••" placeholderTextColor={theme.muted}/>
      {error ? <ThemedText type="small" style={{ color: theme.danger }}>{error}</ThemedText> : null}
      <Pressable disabled={pending} onPress={submit} style={[styles.submit,{backgroundColor:theme.primary},pending&&styles.disabled]}><ThemedText type="smallBold" style={styles.white}>{pending ? 'Chargement…' : register ? 'Créer mon compte' : 'Se connecter'}</ThemedText></Pressable>
      <Pressable onPress={() => router.replace(register ? '/login' : '/register')}><ThemedText type="small" style={[styles.switch,{color:theme.primary}]}>{register ? 'Déjà un compte ? Se connecter' : 'Pas encore de compte ? S’inscrire'}</ThemedText></Pressable>
    </View>
  </ScrollView></KeyboardAvoidingView></SafeAreaView></ThemedView>;
}

const styles=StyleSheet.create({screen:{flex:1},safe:{flex:1},content:{flexGrow:1,justifyContent:'center',padding:Spacing.four,maxWidth:480,width:'100%',alignSelf:'center'},logo:{width:64,height:64,borderRadius:12,marginBottom:Spacing.four},title:{marginTop:8,marginBottom:10},form:{marginTop:Spacing.four,gap:10},input:{borderWidth:1,borderRadius:10,paddingHorizontal:14,paddingVertical:13,fontSize:16},submit:{marginTop:8,borderRadius:10,padding:14,alignItems:'center'},white:{color:'#fff'},disabled:{opacity:.6},switch:{textAlign:'center',padding:10}});
