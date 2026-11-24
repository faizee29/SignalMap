import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Screen = 'map' | 'contribute' | 'settings';

const COLORS = {
  ink: '#14251F',
  muted: '#718078',
  paper: '#F5F7F3',
  white: '#FFFFFF',
  green: '#23785B',
  paleGreen: '#E3F0E8',
  line: '#E4EAE4',
  amber: '#C79032',
};

function App() {
  const [screen, setScreen] = useState<Screen>('map');
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.paper} />
      <View style={styles.app}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>SIGNALMAP</Text>
            <Text style={styles.headerTitle}>{screenTitle(screen)}</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>PILOT</Text>
          </View>
        </View>

        <View style={styles.content}>
          {screen === 'map' && (
            <MapScreen
              introVisible={introVisible}
              onDismissIntro={() => setIntroVisible(false)}
              onContribute={() => setScreen('contribute')}
            />
          )}
          {screen === 'contribute' && <ContributeScreen />}
          {screen === 'settings' && <SettingsScreen />}
        </View>

        <View style={styles.tabBar}>
          <TabButton label="Map" symbol="⌖" active={screen === 'map'} onPress={() => setScreen('map')} />
          <TabButton label="Contribute" symbol="＋" active={screen === 'contribute'} onPress={() => setScreen('contribute')} />
          <TabButton label="Settings" symbol="☷" active={screen === 'settings'} onPress={() => setScreen('settings')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function MapScreen({
  introVisible,
  onDismissIntro,
  onContribute,
}: {
  introVisible: boolean;
  onDismissIntro: () => void;
  onContribute: () => void;
}) {
  return (
    <View style={styles.screen}>
      {introVisible && (
        <View style={styles.introCard}>
          <View style={styles.introTop}>
            <View style={styles.introIcon}><Text style={styles.introIconText}>i</Text></View>
            <TouchableOpacity onPress={onDismissIntro} accessibilityRole="button" accessibilityLabel="Dismiss introduction">
              <Text style={styles.dismiss}>×</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.introTitle}>A clearer picture of your signal.</Text>
          <Text style={styles.bodyText}>
            SignalMap compares real-world mobile signal readings. Add a reading to help build the map for your area.
          </Text>
          <TouchableOpacity style={styles.textButton} onPress={onDismissIntro} accessibilityRole="button">
            <Text style={styles.textButtonLabel}>Got it</Text>
            <Text style={styles.textButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.mapHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>YOUR AREA</Text>
          <Text style={styles.areaTitle}>Pilot area</Text>
        </View>
        <TouchableOpacity style={styles.filterButton} accessibilityRole="button">
          <Text style={styles.filterSymbol}>☷</Text>
          <Text style={styles.filterLabel}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapPanel}>
        <MapIllustration />
        <View style={styles.mapBadge}>
          <View style={styles.badgeDot} />
          <Text style={styles.mapBadgeText}>Coverage map</Text>
        </View>
        <View style={styles.mapEmpty}>
          <View style={styles.emptyMark}><Text style={styles.emptyMarkText}>⌖</Text></View>
          <Text style={styles.emptyTitle}>Your map starts here</Text>
          <Text style={styles.emptyCopy}>No readings in this area yet.</Text>
        </View>
        <View style={styles.mapAttribution}><Text style={styles.attributionText}>MAP PREVIEW</Text></View>
      </View>

      <View style={styles.legendRow}>
        <Text style={styles.legendTitle}>Signal strength</Text>
        <View style={styles.legendItems}>
          <LegendItem color="#5C9B70" label="Strong" />
          <LegendItem color={COLORS.amber} label="Fair" />
          <LegendItem color="#C77A68" label="Weak" />
        </View>
      </View>

      <View style={styles.bottomCallout}>
        <View style={styles.calloutCopy}>
          <Text style={styles.calloutTitle}>Help fill in the map</Text>
          <Text style={styles.calloutSub}>Share a reading from where you are.</Text>
        </View>
        <TouchableOpacity style={styles.roundButton} onPress={onContribute} accessibilityRole="button" accessibilityLabel="Add a signal reading">
          <Text style={styles.roundButtonText}>＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MapIllustration() {
  return (
    <View pointerEvents="none" style={styles.mapDrawing}>
      <View style={[styles.block, styles.blockA]} />
      <View style={[styles.block, styles.blockB]} />
      <View style={[styles.block, styles.blockC]} />
      <View style={[styles.block, styles.blockD]} />
      <View style={[styles.block, styles.blockE]} />
      <View style={[styles.block, styles.blockF]} />
      <View style={[styles.road, styles.roadHorizontal]} />
      <View style={[styles.road, styles.roadVertical]} />
      <View style={[styles.road, styles.roadDiagonal]} />
      <View style={styles.park}><View style={styles.parkDot} /><View style={styles.parkDotTwo} /></View>
      <View style={styles.mapPin}><View style={styles.pinCore} /></View>
    </View>
  );
}

function ContributeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.pageIntro}>
        <Text style={styles.sectionEyebrow}>COMMUNITY DATA</Text>
        <Text style={styles.pageTitle}>Contribute a reading</Text>
        <Text style={styles.bodyText}>A quick signal check helps others understand how their carrier performs nearby.</Text>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewGlyph}><Text style={styles.previewGlyphText}>⌖</Text></View>
        <Text style={styles.previewTitle}>Ready when you are</Text>
        <Text style={styles.previewCopy}>Location and signal details will appear here when capture is added.</Text>
        <View style={styles.previewDivider} />
        <View style={styles.previewRow}><Text style={styles.previewKey}>LOCATION</Text><Text style={styles.previewValue}>Not collected</Text></View>
        <View style={styles.previewRow}><Text style={styles.previewKey}>CARRIER</Text><Text style={styles.previewValue}>Not detected</Text></View>
        <View style={styles.previewRow}><Text style={styles.previewKey}>SIGNAL</Text><Text style={styles.previewValue}>Not measured</Text></View>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>You’re in control</Text>
        <Text style={styles.noteCopy}>This first version won’t collect anything until you choose to contribute.</Text>
      </View>
      <TouchableOpacity style={styles.disabledButton} disabled accessibilityRole="button">
        <Text style={styles.disabledButtonText}>Signal capture coming next</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.pageIntro}>
        <Text style={styles.sectionEyebrow}>PREFERENCES</Text>
        <Text style={styles.pageTitle}>Settings</Text>
        <Text style={styles.bodyText}>Choose how SignalMap works for you.</Text>
      </View>
      <View style={styles.settingsCard}>
        <SettingRow title="Pilot area" value="Choose later" />
        <View style={styles.settingDivider} />
        <SettingRow title="Carrier filters" value="All carriers" />
        <View style={styles.settingDivider} />
        <SettingRow title="Location sharing" value="Off until you contribute" />
      </View>
      <View style={styles.privacyCard}>
        <Text style={styles.privacyMark}>◌</Text>
        <View style={styles.privacyCopy}>
          <Text style={styles.noteTitle}>Privacy first</Text>
          <Text style={styles.noteCopy}>Your location is only relevant when you choose to share a signal reading. We’ll explain the details before collection is enabled.</Text>
        </View>
      </View>
      <View style={styles.versionRow}><Text style={styles.versionText}>SIGNALMAP</Text><Text style={styles.versionText}>EARLY BUILD · 0.1</Text></View>
    </View>
  );
}

function SettingRow({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingValueRow}><Text style={styles.settingValue}>{value}</Text><Text style={styles.settingArrow}>›</Text></View>
    </View>
  );
}

function TabButton({
  label,
  symbol,
  active,
  onPress,
}: {
  label: string;
  symbol: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: active }}>
      <Text style={[styles.tabSymbol, active && styles.tabActive]}>{symbol}</Text>
      <Text style={[styles.tabLabel, active && styles.tabActive]}>{label}</Text>
      {active && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

function screenTitle(screen: Screen) {
  if (screen === 'contribute') return 'Contribute';
  if (screen === 'settings') return 'Settings';
  return 'Signal map';
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.paper },
  app: { flex: 1, backgroundColor: COLORS.paper },
  header: { minHeight: 76, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: COLORS.green, fontSize: 10, letterSpacing: 2.1, fontWeight: '800' },
  headerTitle: { color: COLORS.ink, fontSize: 21, fontWeight: '700', marginTop: 4, letterSpacing: -0.4 },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.paleGreen, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20, gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.green },
  statusText: { color: COLORS.green, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  content: { flex: 1 },
  screen: { flex: 1, paddingHorizontal: 20, paddingBottom: 10 },
  introCard: { backgroundColor: COLORS.white, borderRadius: 18, padding: 16, marginBottom: 18, borderWidth: 1, borderColor: COLORS.line },
  introTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  introIcon: { width: 23, height: 23, borderRadius: 12, backgroundColor: COLORS.paleGreen, alignItems: 'center', justifyContent: 'center' },
  introIconText: { fontSize: 13, color: COLORS.green, fontWeight: '700' },
  dismiss: { fontSize: 23, color: COLORS.muted, lineHeight: 25, paddingHorizontal: 4 },
  introTitle: { color: COLORS.ink, fontSize: 17, lineHeight: 22, fontWeight: '700', marginBottom: 5 },
  bodyText: { color: COLORS.muted, fontSize: 13, lineHeight: 19 },
  textButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 11 },
  textButtonLabel: { color: COLORS.green, fontSize: 13, fontWeight: '700' },
  textButtonArrow: { color: COLORS.green, fontSize: 17 },
  mapHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 },
  sectionEyebrow: { color: COLORS.muted, fontSize: 9, letterSpacing: 1.5, fontWeight: '800' },
  areaTitle: { color: COLORS.ink, fontSize: 17, fontWeight: '700', marginTop: 3 },
  filterButton: { flexDirection: 'row', gap: 6, alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.white },
  filterSymbol: { fontSize: 13, color: COLORS.ink },
  filterLabel: { fontSize: 11, color: COLORS.ink, fontWeight: '600' },
  mapPanel: { flex: 1, minHeight: 190, overflow: 'hidden', borderRadius: 18, backgroundColor: '#EAEFE8', borderWidth: 1, borderColor: '#E0E7DF' },
  mapDrawing: { ...StyleSheet.absoluteFillObject, opacity: 0.95 },
  block: { position: 'absolute', backgroundColor: '#DDE7D9', borderRadius: 12 },
  blockA: { width: '38%', height: '27%', left: '-4%', top: '8%' },
  blockB: { width: '34%', height: '29%', left: '43%', top: '-5%' },
  blockC: { width: '35%', height: '32%', right: '-7%', top: '26%' },
  blockD: { width: '31%', height: '26%', left: '8%', bottom: '3%' },
  blockE: { width: '27%', height: '24%', left: '50%', bottom: '4%' },
  blockF: { width: '22%', height: '19%', right: '2%', bottom: '-3%' },
  road: { position: 'absolute', backgroundColor: '#F8FAF6' },
  roadHorizontal: { left: '-5%', right: '-5%', top: '45%', height: 17, transform: [{ rotate: '-8deg' }] },
  roadVertical: { width: 17, top: '-8%', bottom: '-8%', left: '38%', transform: [{ rotate: '13deg' }] },
  roadDiagonal: { height: 12, width: '120%', top: '74%', left: '-7%', transform: [{ rotate: '-27deg' }] },
  park: { position: 'absolute', width: 67, height: 51, left: '58%', top: '12%', backgroundColor: '#C9DDC6', borderRadius: 14, transform: [{ rotate: '-8deg' }] },
  parkDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A5C19F', position: 'absolute', top: 12, left: 17 },
  parkDotTwo: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#A5C19F', position: 'absolute', bottom: 12, right: 15 },
  mapPin: { position: 'absolute', left: '49%', top: '34%', width: 25, height: 25, borderRadius: 15, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: COLORS.green, alignItems: 'center', justifyContent: 'center' },
  pinCore: { width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.green },
  mapBadge: { position: 'absolute', top: 12, left: 12, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.9)' },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.amber },
  mapBadgeText: { color: COLORS.ink, fontSize: 9, fontWeight: '700' },
  mapEmpty: { position: 'absolute', alignSelf: 'center', top: '39%', width: 194, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 15, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' },
  emptyMark: { width: 27, height: 27, borderRadius: 14, backgroundColor: COLORS.paleGreen, alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  emptyMarkText: { color: COLORS.green, fontSize: 16 },
  emptyTitle: { color: COLORS.ink, fontSize: 12, fontWeight: '700' },
  emptyCopy: { color: COLORS.muted, fontSize: 10, marginTop: 2 },
  mapAttribution: { position: 'absolute', bottom: 9, right: 10 },
  attributionText: { fontSize: 8, color: '#65756A', letterSpacing: 0.9, fontWeight: '700' },
  legendRow: { paddingTop: 13, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  legendTitle: { color: COLORS.ink, fontSize: 11, fontWeight: '700', marginBottom: 8 },
  legendItems: { flexDirection: 'row', alignItems: 'center', gap: 17 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { color: COLORS.muted, fontSize: 10 },
  bottomCallout: { minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 },
  calloutCopy: { flex: 1 },
  calloutTitle: { color: COLORS.ink, fontSize: 13, fontWeight: '700' },
  calloutSub: { color: COLORS.muted, fontSize: 11, marginTop: 3 },
  roundButton: { width: 42, height: 42, borderRadius: 22, backgroundColor: COLORS.green, alignItems: 'center', justifyContent: 'center' },
  roundButtonText: { color: COLORS.white, fontSize: 26, lineHeight: 29, fontWeight: '400' },
  tabBar: { height: 67, borderTopWidth: 1, borderTopColor: COLORS.line, backgroundColor: COLORS.white, flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 13 },
  tab: { minWidth: 75, alignItems: 'center', justifyContent: 'center', gap: 3, position: 'relative' },
  tabSymbol: { color: '#8A9890', fontSize: 18, lineHeight: 22 },
  tabLabel: { color: '#8A9890', fontSize: 9, fontWeight: '600' },
  tabActive: { color: COLORS.green, fontWeight: '800' },
  tabIndicator: { position: 'absolute', bottom: 0, width: 17, height: 2, borderRadius: 2, backgroundColor: COLORS.green },
  pageIntro: { paddingTop: 10, paddingBottom: 21 },
  pageTitle: { color: COLORS.ink, fontSize: 25, letterSpacing: -0.6, fontWeight: '700', marginTop: 6, marginBottom: 7 },
  previewCard: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, borderRadius: 19, padding: 18 },
  previewGlyph: { width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.paleGreen, alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  previewGlyphText: { color: COLORS.green, fontSize: 22 },
  previewTitle: { color: COLORS.ink, fontSize: 17, fontWeight: '700' },
  previewCopy: { color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  previewDivider: { height: 1, backgroundColor: COLORS.line, marginTop: 16, marginBottom: 4 },
  previewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9 },
  previewKey: { color: COLORS.muted, fontSize: 9, letterSpacing: 1, fontWeight: '700' },
  previewValue: { color: '#929E97', fontSize: 11 },
  noteCard: { backgroundColor: '#ECF3ED', borderRadius: 15, padding: 15, marginTop: 15 },
  noteTitle: { color: COLORS.ink, fontSize: 12, fontWeight: '700', marginBottom: 4 },
  noteCopy: { color: COLORS.muted, fontSize: 11, lineHeight: 17 },
  disabledButton: { minHeight: 49, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DCE6DF', marginTop: 16 },
  disabledButtonText: { color: '#60756A', fontSize: 12, fontWeight: '700' },
  settingsCard: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line, borderRadius: 17, paddingHorizontal: 15 },
  settingRow: { minHeight: 57, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingTitle: { color: COLORS.ink, fontSize: 12, fontWeight: '600' },
  settingValueRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  settingValue: { color: COLORS.muted, fontSize: 10 },
  settingArrow: { color: '#9BA79F', fontSize: 21, lineHeight: 22 },
  settingDivider: { height: 1, backgroundColor: COLORS.line },
  privacyCard: { flexDirection: 'row', gap: 11, backgroundColor: '#ECF3ED', borderRadius: 15, padding: 14, marginTop: 16 },
  privacyMark: { color: COLORS.green, fontSize: 22, lineHeight: 24 },
  privacyCopy: { flex: 1 },
  versionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', paddingVertical: 14 },
  versionText: { color: '#9BA79F', fontSize: 8, fontWeight: '700', letterSpacing: 1.1 },
});

export default App;
