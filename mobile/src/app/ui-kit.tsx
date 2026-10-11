import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  UiAccordion, UiAlert, UiAvatar, UiBadge, UiBreadcrumb, UiButton, UiCard, UiCardBody,
  UiCardFooter, UiCardHeader, UiCheckbox, UiDivider, UiDropdownMenu, UiEmptyState, UiFormField,
  UiIconButton, UiKbd, UiList, UiListItem, UiModal, UiPageHeader, UiPagination, UiPasswordField,
  UiProgress, UiRadioGroup, UiSearchField, UiSelect, UiSkeleton, UiSpinner, UiStatCard, UiSwitch,
  UiTabs, UiTextarea, UiTextField,
} from '@scenariom/design-system/ui';
import { translate as t } from '@scenariom/i18n';

export default function UiKitScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('draft');
  const [access, setAccess] = useState('private');
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [tab, setTab] = useState('preview');
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(2);

  return <SafeAreaView className="flex-1 bg-background" edges={['left', 'right']}>
    <ScrollView contentContainerClassName="gap-5 p-4 pb-24">
      <UiBreadcrumb accessibilityLabel={t('uiKit.breadcrumb.current')} items={[{ label: t('uiKit.breadcrumb.home') }, { label: t('uiKit.breadcrumb.current'), current: true }]}/>
      <UiPageHeader eyebrow={t('uiKit.eyebrow')} title={t('uiKit.title')} description={t('uiKit.description')} actions={<UiDropdownMenu accessibilityLabel={t('uiKit.actions.preview')} closeLabel={t('common.close')} trigger="•••" onSelect={() => undefined} items={[{ value: 'edit', label: t('uiKit.actions.edit') }, { value: 'archive', label: t('uiKit.actions.archive') }, { value: 'delete', label: t('uiKit.actions.delete'), tone: 'danger' }]}/>}/>

      <UiCard><UiCardHeader>{t('uiKit.section.buttons')}</UiCardHeader><UiCardBody><View className="flex-row flex-wrap gap-2"><UiButton>{t('uiKit.button.primary')}</UiButton><UiButton tone="accent" variant="soft">{t('uiKit.button.accent')}</UiButton><UiButton tone="danger" variant="outline">{t('uiKit.button.delete')}</UiButton><UiButton loading>{t('uiKit.button.loading')}</UiButton></View><View className="flex-row flex-wrap gap-2"><UiBadge>{t('uiKit.badge.active')}</UiBadge><UiBadge tone="success" variant="soft" pill>{t('uiKit.badge.published')}</UiBadge><UiBadge tone="warning" variant="outline">{t('uiKit.badge.draft')}</UiBadge></View></UiCardBody><UiCardFooter>{t('uiKit.buttons.footerNative')}</UiCardFooter></UiCard>
      <UiCard><UiCardHeader>{t('uiKit.section.alerts')}</UiCardHeader><UiCardBody><UiAlert title={t('uiKit.alert.infoTitle')}>{t('uiKit.alert.infoBody')}</UiAlert><UiAlert title={t('uiKit.alert.warningTitle')} tone="warning" dismissible dismissLabel={t('common.close')}>{t('uiKit.alert.warningBody')}</UiAlert></UiCardBody></UiCard>
      <UiCard><UiCardHeader>{t('uiKit.section.form')}</UiCardHeader><UiCardBody><UiTextField label={t('uiKit.form.name')} value={name} onChangeText={setName} placeholder={t('uiKit.form.namePlaceholder')} description={t('uiKit.form.nameDescription')}/><UiCheckbox label={t('uiKit.form.comments')} description={t('uiKit.form.commentsDescription')} checked={checked} onCheckedChange={setChecked}/><UiSwitch label={t('uiKit.form.publication')} description={t('uiKit.form.publicationDescription')} checked={enabled} onCheckedChange={setEnabled}/></UiCardBody></UiCard>
      <UiCard><UiCardHeader>{t('uiKit.section.navigation')}</UiCardHeader><UiCardBody><UiProgress label={t('uiKit.progress.label')} value={68}/><UiTabs value={tab} onValueChange={setTab} items={[{ value: 'preview', label: t('uiKit.tabs.preview'), content: <Text className="leading-6 text-muted">{t('uiKit.tabs.previewBody')}</Text> }, { value: 'members', label: t('uiKit.tabs.members'), content: <Text className="leading-6 text-muted">{t('uiKit.tabs.membersBody')}</Text> }, { value: 'history', label: t('uiKit.tabs.history'), content: <Text className="leading-6 text-muted">{t('uiKit.tabs.historyBody')}</Text> }]}/><UiButton onPress={() => setModal(true)}>{t('uiKit.modal.open')}</UiButton></UiCardBody></UiCard>
      <UiCard><UiCardHeader>{t('uiKit.section.fields')}</UiCardHeader><UiCardBody><UiTextarea label={t('uiKit.fields.description')} value={description} onChangeText={setDescription} placeholder={t('uiKit.fields.descriptionPlaceholder')} description={t('uiKit.fields.descriptionHelp')}/><UiSelect label={t('uiKit.fields.status')} placeholder={t('common.select')} value={status} onValueChange={setStatus} options={[{ value: 'draft', label: t('uiKit.badge.draft') }, { value: 'review', label: t('uiKit.fields.review') }, { value: 'published', label: t('uiKit.badge.published') }]}/><UiRadioGroup label={t('uiKit.fields.visibility')} value={access} onValueChange={setAccess} options={[{ value: 'private', label: t('uiKit.fields.private'), description: t('uiKit.fields.privateHelp') }, { value: 'team', label: t('uiKit.fields.organization'), description: t('uiKit.fields.organizationHelp') }]}/></UiCardBody></UiCard>
      <UiCard><UiCardHeader>{t('uiKit.section.content')}</UiCardHeader><UiCardBody><View className="flex-row items-center gap-3"><UiAvatar name={t('uiKit.owner.name')}/><View><Text className="font-medium text-foreground">{t('uiKit.owner.name')}</Text><Text className="text-xs text-muted">{t('uiKit.owner.role')}</Text></View></View><UiDivider label={t('uiKit.information')}/><UiAccordion defaultValue={['permissions']} items={[{ value: 'permissions', title: t('uiKit.permissions.title'), content: t('uiKit.permissions.body') }, { value: 'sharing', title: t('uiKit.sharing.title'), content: t('uiKit.sharing.body') }]}/><View className="flex-row items-center gap-5"><UiSpinner label={t('uiKit.sync')}/><View className="w-32 gap-2"><UiSkeleton height={12}/><UiSkeleton width="70%" height={12}/></View></View></UiCardBody></UiCard>

      <View className="gap-4"><UiStatCard label={t('uiKit.stats.projects')} value="12" description={t('uiKit.stats.period')} trend={<UiBadge tone="success" variant="soft">+3</UiBadge>}/><UiStatCard label={t('uiKit.stats.members')} value="28" description={t('uiKit.stats.period')}/><UiStatCard label={t('uiKit.stats.progress')} value="68%" description={t('uiKit.stats.period')}/></View>
      <UiCard><UiCardHeader>{t('uiKit.list.title')}</UiCardHeader><UiCardBody><UiList><UiListItem title={t('uiKit.list.first')} description={t('uiKit.list.firstDescription')} leading={<UiAvatar name={t('uiKit.list.first')}/>} trailing={<UiBadge variant="soft">68%</UiBadge>} onPress={() => undefined}/><UiListItem title={t('uiKit.list.second')} description={t('uiKit.list.secondDescription')} leading={<UiAvatar name={t('uiKit.list.second')}/>} trailing={<UiBadge tone="warning" variant="soft">42%</UiBadge>} onPress={() => undefined}/></UiList></UiCardBody></UiCard>
      <UiCard><UiCardHeader>{t('uiKit.pagination.label')}</UiCardHeader><UiCardBody><UiPagination page={page} pageCount={8} onPageChange={setPage} labels={{ previous: t('common.previous'), next: t('common.next'), page: value => t('common.page', { page: value }) }}/></UiCardBody></UiCard>
      <UiCard><UiCardHeader>{t('uiKit.section.inputs')}</UiCardHeader><UiCardBody><UiSearchField label={t('uiKit.search.label')} value={search} onChangeText={setSearch} placeholder={t('uiKit.search.placeholder')} description={t('uiKit.search.description')} clearLabel={t('uiKit.search.clear')} submitLabel={t('uiKit.search.submit')}/><UiPasswordField label={t('uiKit.password.label')} value={password} onChangeText={setPassword} placeholder={t('uiKit.password.placeholder')} description={t('uiKit.password.description')} showPasswordLabel={t('uiKit.password.show')} hidePasswordLabel={t('uiKit.password.hide')}/><View className="flex-row items-end justify-between gap-4"><UiFormField label={t('uiKit.keyboard.hint')}><View className="flex-row gap-1"><UiKbd>Ctrl</UiKbd><UiKbd>K</UiKbd></View></UiFormField><UiIconButton accessibilityLabel={t('uiKit.icon.settings')} icon="settings"/></View></UiCardBody></UiCard>
      <UiEmptyState icon={<Text className="text-3xl text-muted">◇</Text>} title={t('uiKit.empty.title')} description={t('uiKit.empty.description')} action={<UiButton>{t('uiKit.empty.action')}</UiButton>}/>
    </ScrollView>
    <UiModal open={modal} onClose={() => setModal(false)} closeLabel={t('common.close')} title={t('uiKit.modal.title')} footer={<><UiButton variant="ghost" onPress={() => setModal(false)}>{t('common.cancel')}</UiButton><UiButton onPress={() => setModal(false)}>{t('common.confirm')}</UiButton></>}><Text className="leading-6 text-muted">{t('uiKit.modal.nativeBody')}</Text></UiModal>
  </SafeAreaView>;
}
