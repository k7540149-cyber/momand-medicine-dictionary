import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Linking,
  StatusBar,
  Animated,
} from 'react-native';

// ==================== د درملو ټول فایلونه ====================
import { medicines1 } from './medicines1';
import { medicines2 } from './medicines2';
import { medicines3 } from './medicines3';
import { medicines4 } from './medicines4';
import { medicines5 } from './medicines5';
import { medicines6 } from './medicines6';
import { medicines7 } from './medicines7';
import { medicines8 } from './medicines8';
import { medicines9 } from './medicines9';
import { medicines10 } from './medicines10';
import { medicines11 } from './medicines11';
import { medicines12 } from './medicines12';
import { medicines13 } from './medicines13';
import { medicines14 } from './medicines14';
import { medicines15 } from './medicines15';
import { medicines16 } from './medicines16';
import { medicines17 } from './medicines17';
import { medicines18 } from './medicines18';
import { medicines19 } from './medicines19';

// ==================== ټول درمل یوځای کول ====================
const allMedicines = [
  ...medicines1,
  ...medicines2,
  ...medicines3,
  ...medicines4,
  ...medicines5,
  ...medicines6,
  ...medicines7,
  ...medicines8,
  ...medicines9,
  ...medicines10,
  ...medicines11,
  ...medicines12,
  ...medicines13,
  ...medicines14,
  ...medicines15,
  ...medicines16,
  ...medicines17,
  ...medicines18,
  ...medicines19,
];

// ==================== د Duplicate درملو مخنیوی ====================
const normalizeMedicineName = (value) => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
};

const uniqueMedicines = [];
const seenMedicines = new Set();

for (const medicine of allMedicines) {
  const medicineName = normalizeMedicineName(medicine.name);

  // بې نومه ریکارډ مه حذفوه
  if (!medicineName) {
    uniqueMedicines.push(medicine);
    continue;
  }

  // که نوم مخکې موجود وي، دا Duplicate دی
  if (seenMedicines.has(medicineName)) {
    continue;
  }

  seenMedicines.add(medicineName);
  uniqueMedicines.push(medicine);
}

const medicines = uniqueMedicines;

// ==================== وروستی پاک لیست ====================
const medicines = uniqueMedicines;

// ==================== رنګونه ====================
const COLORS = {
  primary: '#0B6E4F',
  primaryLight: '#E8F5F0',
  primaryDark: '#064A34',
  secondary: '#0A4D68',
  secondaryLight: '#E0EEF5',
  danger: '#C0392B',
  dangerLight: '#FADBD8',
  warning: '#E67E22',
  warningLight: '#FDEBD0',
  success: '#27AE60',
  background: '#F0F4F8',
  card: '#FFFFFF',
  text: '#1B2A41',
  textLight: '#6B7C8F',
  border: '#E1E8ED',
};

// ==================== خطرناک ترکیبونه ====================
const interactions = [
  { id: 'i1', med1: 'Warfarin', med2: 'Aspirin', severity: '🔴 خورا خطرناک', effect: 'د وینې بهېدنه ډېره زیاته کېږي.', advice: 'یوځای مه استعمالوئ.' },
  { id: 'i2', med1: 'Warfarin', med2: 'Ibuprofen', severity: '🔴 خورا خطرناک', effect: 'د معدې د وینې بهېدنې خطر ډېر زیاتېږي.', advice: 'د NSAID پر ځای Paracetamol وکاروئ.' },
  { id: 'i3', med1: 'Warfarin', med2: 'Diclofenac', severity: '🔴 خورا خطرناک', effect: 'د معدې او کولمو د وینې بهېدنې خطر.', advice: 'له یوځای استعمال څخه ډډه وکړئ.' },
  { id: 'i4', med1: 'Aspirin', med2: 'Ibuprofen', severity: '🟠 خطرناک', effect: 'د معدې زخم او د وینې بهېدنې خطر زیاتېږي.', advice: 'یوځای مه استعمالوئ.' },
  { id: 'i5', med1: 'Aspirin', med2: 'Clopidogrel', severity: '🟠 خطرناک', effect: 'د وینې بهېدنې خطر زیاتېږي.', advice: 'یوازې د ډاکټر تر څارنې لاندې.' },
  { id: 'i6', med1: 'Clopidogrel', med2: 'Omeprazole', severity: '🟡 احتیاط', effect: 'Omeprazole د Clopidogrel اغېزه کموي.', advice: 'د Omeprazole پر ځای Pantoprazole وکاروئ.' },
  { id: 'i7', med1: 'Metformin', med2: 'الکول', severity: '🔴 خورا خطرناک', effect: 'د lactic acidosis خطر.', advice: 'د Metformin پر مهال الکول مه څښئ.' },
  { id: 'i8', med1: 'Lisinopril', med2: 'Spironolactone', severity: '🟠 خطرناک', effect: 'د وینې پوتاشیم ډېر زیاتېږي.', advice: 'یوازې د ډاکټر تر څارنې لاندې.' },
  { id: 'i9', med1: 'Lisinopril', med2: 'Ibuprofen', severity: '🟠 خطرناک', effect: 'د پښتورګو زیان او د وینې فشار ټیټوالی.', advice: 'یوځای مه استعمالوئ.' },
  { id: 'i10', med1: 'Atorvastatin', med2: 'Clarithromycin', severity: '🟠 خطرناک', effect: 'د عضلاتو زیان خطر.', advice: 'یوځای مه استعمالوئ.' },
  { id: 'i11', med1: 'Simvastatin', med2: 'Amlodipine', severity: '🟡 احتیاط', effect: 'د عضلاتو درد او د عضلاتو زیان خطر.', advice: 'د Simvastatin اندازه باید د ۲۰ mg څخه کمه وي.' },
  { id: 'i12', med1: 'Ciprofloxacin', med2: 'Ferrous Sulfate', severity: '🟡 احتیاط', effect: 'د اوسپنې درمل د Ciprofloxacin جذب کموي.', advice: 'دواړه باید د ۲ ساعتونو واټن سره وکارول شي.' },
  { id: 'i13', med1: 'Doxycycline', med2: 'Calcium Carbonate', severity: '🟡 احتیاط', effect: 'د کلسیم درمل د Doxycycline جذب کموي.', advice: 'دواړه باید د ۲ ساعتونو واټن سره وکارول شي.' },
  { id: 'i14', med1: 'Fluconazole', med2: 'Warfarin', severity: '🔴 خورا خطرناک', effect: 'د وینې بهېدنې خطر ډېر زیاتېږي.', advice: 'یوځای مه استعمالوئ.' },
  { id: 'i15', med1: 'Metronidazole', med2: 'الکول', severity: '🟠 خطرناک', effect: 'د زړه بدوالي، کانګې، سرخوږی.', advice: 'د Metronidazole پر مهال الکول مه څښئ.' },
  { id: 'i16', med1: 'Diazepam', med2: 'Morphine', severity: '🔴 خورا خطرناک', effect: 'د تنفس ټیټوالی، کوما او د مرګ خطر.', advice: 'یوازې د روغتون په څارنه کې.' },
  { id: 'i17', med1: 'Tramadol', med2: 'Fluoxetine', severity: '🟠 خطرناک', effect: 'د serotonin syndrome خطر.', advice: 'یوځای مه استعمالوئ.' },
  { id: 'i18', med1: 'Sertraline', med2: 'Aspirin', severity: '🟠 خطرناک', effect: 'د معدې وینه بهېدنې خطر زیاتېږي.', advice: 'یوازې د ډاکټر تر څارنې لاندې.' },
  { id: 'i19', med1: 'Digoxin', med2: 'Furosemide', severity: '🟡 احتیاط', effect: 'د پوتاشیم کمښت د Digoxin زهرجنیت زیاتوي.', advice: 'د پوتاشیم کچه وڅارئ.' },
  { id: 'i20', med1: 'Carbamazepine', med2: 'Phenytoin', severity: '🟠 خطرناک', effect: 'د دواړو درملو کچه بدلېږي.', advice: 'یوازې د متخصص تر څارنې لاندې.' },
  { id: 'i21', med1: 'Rifampicin', med2: 'Warfarin', severity: '🟠 خطرناک', effect: 'Rifampicin د Warfarin اغېزه کموي.', advice: 'د Warfarin اندازه باید تنظیم شي.' },
  { id: 'i22', med1: 'Isoniazid', med2: 'Rifampicin', severity: '🟠 خطرناک', effect: 'د ځیګر زیان خطر زیاتېږي.', advice: 'د ځیګر فعالیت منظم وڅارئ.' },
  { id: 'i23', med1: 'Amiodarone', med2: 'Warfarin', severity: '🟠 خطرناک', effect: 'د وینې بهېدنې خطر زیاتېږي.', advice: 'INR وڅارئ.' },
  { id: 'i24', med1: 'Haloperidol', med2: 'Lithium', severity: '🟠 خطرناک', effect: 'د زړه د دربې ستونزې او د NMS خطر.', advice: 'یوازې د متخصص تر څارنې لاندې.' },
  { id: 'i25', med1: 'Prednisolone', med2: 'Ibuprofen', severity: '🟠 خطرناک', effect: 'د معدې زخم او د وینې بهېدنې خطر زیاتېږي.', advice: 'یوځای مه استعمالوئ.' },
  { id: 'i26', med1: 'Phenobarbital', med2: 'Diazepam', severity: '🟠 خطرناک', effect: 'د تنفس ټیټوالی او د کوما خطر.', advice: 'یوازې د روغتون په څارنې کې.' },
];

// ==================== د اپلیکیشن اصلي برخه ====================
export default function App() {
  const [activeMenu, setActiveMenu] = useState('home');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [symptom, setSymptom] = useState('');
  const [interactionSearch, setInteractionSearch] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowWelcome(false);
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (selected) { setSelected(null); return true; }
      if (activeMenu !== 'home') { setActiveMenu('home'); return true; }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [selected, activeMenu]);

  const filtered = search.trim()
    ? medicines.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.generic.toLowerCase().includes(search.toLowerCase()) ||
        m.category.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const symptomResults = symptom.trim()
    ? medicines.filter((m) =>
        m.uses.toLowerCase().includes(symptom.toLowerCase()) ||
        m.name.toLowerCase().includes(symptom.toLowerCase()) ||
        m.category.toLowerCase().includes(symptom.toLowerCase()))
    : [];

  const interactionResults = interactionSearch.trim()
    ? interactions.filter((i) =>
        i.med1.toLowerCase().includes(interactionSearch.toLowerCase()) ||
        i.med2.toLowerCase().includes(interactionSearch.toLowerCase()))
    : interactions;

  // ==================== د ښه راغلاست سکرین ====================
  if (showWelcome) {
    return (
      <SafeAreaView style={styles.welcomeContainer}>
        <StatusBar barStyle="light-content" />
        <Animated.View style={[styles.welcomeContent, { opacity: fadeAnim }]}>
          <View style={styles.welcomeIconCircleBig}>
            <Text style={styles.welcomeIconBig}>💊</Text>
          </View>
          <Text style={styles.welcomeTitleBig}>ښه راغلاست!</Text>
          <Text style={styles.welcomeAppNameBig}>MOMAND Medicine Dictionary</Text>
          <View style={styles.welcomeDivider} />
          <Text style={styles.welcomeMessageBig}>
            خوښ يم چې دا برنامه دې شروع کړي، او په دې هیله يم چې د استعمال او د ګټي اخيستنې وړ دې وګرځي.
          </Text>
          <View style={styles.welcomeDivider} />
          <Text style={styles.welcomeFromBig}>— له طرفه د امید مومند —</Text>
        </Animated.View>
      </SafeAreaView>
    );
  }

  // ==================== د درملو تفصیلات ====================
  if (selected) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
            <Text style={styles.backText}>← بیرته</Text>
          </TouchableOpacity>
          <View style={styles.detailHeader}>
            <View style={styles.detailIconCircle}>
              <Text style={styles.detailIcon}>💊</Text>
            </View>
            <Text style={styles.detailName}>{selected.name}</Text>
            <Text style={styles.detailGeneric}>{selected.generic}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>📂 کټګوري</Text>
            <Text style={styles.detailValue}>{selected.category}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>🎯 کارول</Text>
            <Text style={styles.detailValue}>{selected.uses}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>💊 شکلونه</Text>
            <View style={styles.formsRow}>
              {selected.forms.map((f, idx) => (
                <View key={idx} style={styles.formChip}>
                  <Text style={styles.formChipText}>{f}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={[styles.detailSection, styles.detailWarning]}>
            <Text style={styles.detailLabel}>⚠️ عوارض</Text>
            <Text style={styles.detailValue}>{selected.side_effects}</Text>
          </View>
          <View style={[styles.detailSection, styles.detailDanger]}>
            <Text style={styles.detailLabel}>🚨 خبرداری</Text>
            <Text style={styles.detailValue}>{selected.warning}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==================== مینو ۱: درمل ====================
  if (activeMenu === 'medicines') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveMenu('home')} style={styles.headerBack}>
            <Text style={styles.headerBackText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>💊 د درملو ډیکشنري</Text>
        </View>
        <TextInput
          style={styles.search}
          placeholder="د درملو نوم ولیکه..."
          placeholderTextColor={COLORS.textLight}
          value={search}
          onChangeText={setSearch}
        />
        {search.trim() === '' ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>د درملو نوم ولیکه</Text>
            <Text style={styles.emptyHint}>لکه: Paracetamol، Ibuprofen</Text>
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>😔</Text>
            <Text style={styles.emptyText}>دا درمل پیدا نشو</Text>
            <Text style={styles.emptyHint}>بله لیکنه هڅه وکړه</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => setSelected(item)}>
                <View style={styles.cardRow}>
                  <View style={styles.cardIconBox}>
                    <Text style={styles.cardIcon}>💊</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardCategory}>{item.category}</Text>
                  </View>
                  <Text style={styles.cardArrow}>›</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    );
  }

  // ==================== مینو ۲: خوندیتوب ====================
  if (activeMenu === 'interactions') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveMenu('home')} style={styles.headerBack}>
            <Text style={styles.headerBackText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>🛡️ د درملو خوندیتوب</Text>
        </View>
        <Text style={styles.subtitle}>هغه درمل چې یوځای استعمال یې خطر لري</Text>
        <TextInput
          style={styles.search}
          placeholder="د درملو نوم ولیکه..."
          placeholderTextColor={COLORS.textLight}
          value={interactionSearch}
          onChangeText={setInteractionSearch}
        />
        <FlatList
          data={interactionResults}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isHigh = item.severity.includes('🔴');
            const isMed = item.severity.includes('🟠');
            return (
              <View style={[styles.interactionCard, isHigh ? styles.interactionHigh : isMed ? styles.interactionMed : styles.interactionLow]}>
                <View style={styles.interactionHeader}>
                  <Text style={styles.interactionMeds}>{item.med1} + {item.med2}</Text>
                  <Text style={styles.interactionSeverity}>{item.severity}</Text>
                </View>
                <Text style={styles.interactionEffect}>
                  <Text style={styles.bold}>اغېزه: </Text>
                  {item.effect}
                </Text>
                <View style={styles.adviceBox}>
                  <Text style={styles.interactionAdvice}>
                    <Text style={styles.bold}>✅ سلا: </Text>
                    {item.advice}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  }

  // ==================== مینو ۳: لارښود ====================
  if (activeMenu === 'symptoms') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveMenu('home')} style={styles.headerBack}>
            <Text style={styles.headerBackText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>💡 د نښو لارښود</Text>
        </View>
        <Text style={styles.subtitle}>نښه ولیکه (لکه: سر درد، تبه، د پښتورګو درد)</Text>
        <TextInput
          style={styles.search}
          placeholder="نښه ولیکه..."
          placeholderTextColor={COLORS.textLight}
          value={symptom}
          onChangeText={setSymptom}
        />
        {symptom.trim() === '' ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>💡</Text>
            <Text style={styles.emptyText}>د نښې نوم ولیکه</Text>
            <Text style={styles.emptyHint}>لکه: سر درد، تبه، ټوخی</Text>
          </View>
        ) : symptomResults.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>😔</Text>
            <Text style={styles.emptyText}>د دې نښې لپاره درمل پیدا نشول</Text>
            <Text style={styles.emptyHint}>بله نښه هڅه وکړه</Text>
          </View>
        ) : (
          <FlatList
            data={symptomResults}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => setSelected(item)}>
                <View style={styles.cardRow}>
                  <View style={styles.cardIconBox}>
                    <Text style={styles.cardIcon}>💊</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardUses}>{item.uses}</Text>
                  </View>
                  <Text style={styles.cardArrow}>›</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    );
  }

  // ==================== مینو ۴: زما ====================
  if (activeMenu === 'about') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveMenu('home')} style={styles.headerBack}>
            <Text style={styles.headerBackText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>👤 زما په اړه</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.aboutHeader}>
            <View style={styles.aboutLogo}>
              <Text style={styles.aboutLogoIcon}>💊</Text>
            </View>
            <Text style={styles.aboutAppName}>MOMAND Medicine Dictionary</Text>
            <Text style={styles.aboutTagline}>د درملو معلومات او د نښو لارښود</Text>
          </View>
          <View style={styles.aboutCard}>
            <View style={styles.aboutRow}>
              <Text style={styles.aboutIconSmall}>📛</Text>
              <View style={styles.aboutContent}>
                <Text style={styles.aboutLabel}>نوم</Text>
                <Text style={styles.aboutValue}>Omid Momand</Text>
              </View>
            </View>
          </View>
          <View style={styles.aboutCard}>
            <View style={styles.aboutRow}>
              <Text style={styles.aboutIconSmall}>👨‍⚖️</Text>
              <View style={styles.aboutContent}>
                <Text style={styles.aboutLabel}>مسلک</Text>
                <Text style={styles.aboutValue}>Prosecutor</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.aboutCard, styles.aboutLinkCard]}
            onPress={() => Linking.openURL('https://wa.me/93795400651')}
          >
            <View style={styles.aboutRow}>
              <Text style={styles.aboutIconSmall}>💬</Text>
              <View style={styles.aboutContent}>
                <Text style={styles.aboutLabel}>وټساپ</Text>
                <Text style={styles.aboutLink}>+93 795 400 651</Text>
                <Text style={styles.aboutLinkHint}>← کلیک وکړه چې پیغام ولېږې</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.aboutCard, styles.aboutLinkCard]}
            onPress={() => Linking.openURL('mailto:prosecutor.momand2005@gmail.com')}
          >
            <View style={styles.aboutRow}>
              <Text style={styles.aboutIconSmall}>📧</Text>
              <View style={styles.aboutContent}>
                <Text style={styles.aboutLabel}>ایمیل</Text>
                <Text style={styles.aboutLink}>prosecutor.momand2005@gmail.com</Text>
                <Text style={styles.aboutLinkHint}>← کلیک وکړه چې ایمیل ولېږې</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.aboutCard}>
            <View style={styles.aboutRow}>
              <Text style={styles.aboutIconSmall}>📍</Text>
              <View style={styles.aboutContent}>
                <Text style={styles.aboutLabel}>ځای</Text>
                <Text style={styles.aboutValue}>Afghanistan, Nangarhar,{'\n'}Mohmand Dara, Hazarnow</Text>
              </View>
            </View>
          </View>
          <View style={styles.aboutRow2}>
            <View style={[styles.aboutCard, styles.aboutHalf]}>
              <Text style={styles.aboutLabel}>📊 نسخه</Text>
              <Text style={styles.aboutValue}>Version 6.0</Text>
            </View>
            <View style={[styles.aboutCard, styles.aboutHalf]}>
              <Text style={styles.aboutLabel}>📅 نیټه</Text>
              <Text style={styles.aboutValue}>2026/09/20</Text>
            </View>
          </View>
          <View style={styles.aboutDescriptionCard}>
            <Text style={styles.aboutLabel}>📝 د اپلیکیشن په اړه</Text>
            <Text style={styles.aboutDescription}>
              دا اپلیکیشن د درملو د معلوماتو، د نښو لارښود، او د خطرناکو درملو د ترکیبونو د پوهیدو لپاره جوړ شوی دی.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==================== کور سکرین ====================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.homeHeader}>
        <View style={styles.homeLogo}>
          <Text style={styles.homeLogoIcon}>💊</Text>
        </View>
        <Text style={styles.appTitle}>MOMAND Medicine Dictionary</Text>
        <Text style={styles.appSubtitle}>د درملو معلومات او د نښو لارښود</Text>
      </View>
      <View style={styles.homeCenter}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.menuCard, { backgroundColor: COLORS.primary }]}
            onPress={() => setActiveMenu('medicines')}
          >
            <View style={styles.menuIconCircle}>
              <Text style={styles.menuIcon}>💊</Text>
            </View>
            <Text style={styles.menuText}>درمل</Text>
            <Text style={styles.menuSubtext}>د درملو ډیکشنري</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuCard, { backgroundColor: COLORS.danger }]}
            onPress={() => setActiveMenu('interactions')}
          >
            <View style={styles.menuIconCircle}>
              <Text style={styles.menuIcon}>🛡️</Text>
            </View>
            <Text style={styles.menuText}>خوندیتوب</Text>
            <Text style={styles.menuSubtext}>د ترکیبونو خبرداری</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuCard, { backgroundColor: COLORS.warning }]}
            onPress={() => setActiveMenu('symptoms')}
          >
            <View style={styles.menuIconCircle}>
              <Text style={styles.menuIcon}>💡</Text>
            </View>
            <Text style={styles.menuText}>لارښود</Text>
            <Text style={styles.menuSubtext}>د نښو لارښود</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuCard, { backgroundColor: COLORS.secondary }]}
            onPress={() => setActiveMenu('about')}
          >
            <View style={styles.menuIconCircle}>
              <Text style={styles.menuIcon}>👤</Text>
            </View>
            <Text style={styles.menuText}>زما</Text>
            <Text style={styles.menuSubtext}>زما معلومات</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.homeFooter}>
        <Text style={styles.footerText}>Version 6.0 • 2026</Text>
      </View>
    </SafeAreaView>
  );
}

// ==================== سټایلونه ====================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
  welcomeContainer: { flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', padding: 24 },
  welcomeContent: { alignItems: 'center', justifyContent: 'center', width: '100%' },
  welcomeIconCircleBig: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 24, borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  welcomeIconBig: { fontSize: 60 },
  welcomeTitleBig: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 8, textAlign: 'center' },
  welcomeAppNameBig: { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.9)', marginBottom: 24, textAlign: 'center' },
  welcomeDivider: { width: 60, height: 2, backgroundColor: 'rgba(255,255,255,0.4)', marginVertical: 20, borderRadius: 1 },
  welcomeMessageBig: { fontSize: 16, color: 'white', lineHeight: 28, textAlign: 'center', paddingHorizontal: 16 },
  welcomeFromBig: { fontSize: 15, color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 8 },
  homeHeader: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  homeLogo: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: COLORS.primary },
  homeLogoIcon: { fontSize: 40 },
  appTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: COLORS.primary },
  appSubtitle: { fontSize: 13, textAlign: 'center', color: COLORS.textLight, marginTop: 4 },
  homeCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  menuCard: { width: '48%', aspectRatio: 1, borderRadius: 22, padding: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 8 },
  menuIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  menuIcon: { fontSize: 32 },
  menuText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  menuSubtext: { fontSize: 11, color: 'rgba(255,255,255,0.9)', marginTop: 4, textAlign: 'center' },
  homeFooter: { paddingVertical: 12, alignItems: 'center' },
  footerText: { fontSize: 12, color: COLORS.textLight, fontWeight: '500' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 12 },
  headerBack: { padding: 8, marginRight: 8 },
  headerBackText: { fontSize: 26, color: COLORS.primary, fontWeight: 'bold' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, flex: 1, textAlign: 'center', marginRight: 40 },
  subtitle: { fontSize: 13, textAlign: 'center', color: COLORS.textLight, marginBottom: 12 },
  search: { backgroundColor: COLORS.card, borderRadius: 14, padding: 15, fontSize: 15, marginBottom: 14, borderWidth: 1, borderColor: COLORS.border, color: COLORS.text, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardIconBox: { width: 46, height: 46, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardIcon: { fontSize: 22 },
  cardContent: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  cardCategory: { fontSize: 12, color: COLORS.textLight, marginTop: 3 },
  cardUses: { fontSize: 12, color: COLORS.textLight, marginTop: 3 },
  cardArrow: { fontSize: 28, color: COLORS.textLight, marginLeft: 8 },
  interactionCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 15, marginBottom: 12, borderLeftWidth: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  interactionHigh: { borderLeftColor: COLORS.danger },
  interactionMed: { borderLeftColor: COLORS.warning },
  interactionLow: { borderLeftColor: COLORS.success },
  interactionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  interactionMeds: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, flex: 1 },
  interactionSeverity: { fontSize: 12, fontWeight: 'bold', marginLeft: 8 },
  interactionEffect: { fontSize: 13, color: COLORS.text, lineHeight: 19, marginBottom: 8 },
  adviceBox: { backgroundColor: COLORS.primaryLight, borderRadius: 10, padding: 10 },
  interactionAdvice: { fontSize: 13, color: COLORS.primary, lineHeight: 19, fontWeight: '500' },
  bold: { fontWeight: 'bold' },
  backBtn: { marginBottom: 16, marginTop: 10 },
  backText: { fontSize: 15, color: COLORS.primary, fontWeight: 'bold' },
  detailHeader: { alignItems: 'center', marginBottom: 20 },
  detailIconCircle: { width: 76, height: 76, borderRadius: 38, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: COLORS.primary },
  detailIcon: { fontSize: 38 },
  detailName: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
  detailGeneric: { fontSize: 14, color: COLORS.textLight, fontStyle: 'italic', marginTop: 4 },
  detailSection: { backgroundColor: COLORS.card, borderRadius: 14, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  detailWarning: { borderLeftWidth: 4, borderLeftColor: COLORS.warning },
  detailDanger: { borderLeftWidth: 4, borderLeftColor: COLORS.danger },
  detailLabel: { fontSize: 13, fontWeight: 'bold', color: COLORS.primary, marginBottom: 6 },
  detailValue: { fontSize: 14, color: COLORS.text, lineHeight: 22 },
  formsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  formChip: { backgroundColor: COLORS.primaryLight, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, marginRight: 6, marginBottom: 6, borderWidth: 1, borderColor: COLORS.primary },
  formChipText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyIcon: { fontSize: 52, marginBottom: 14 },
  emptyText: { fontSize: 16, color: COLORS.textLight, textAlign: 'center' },
  emptyHint: { fontSize: 13, color: COLORS.textLight, marginTop: 6, fontStyle: 'italic' },
  aboutHeader: { alignItems: 'center', marginVertical: 20 },
  aboutLogo: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: COLORS.primary },
  aboutLogoIcon: { fontSize: 40 },
  aboutAppName: { fontSize: 17, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
  aboutTagline: { fontSize: 12, color: COLORS.textLight, marginTop: 4, textAlign: 'center' },
  aboutCard: { backgroundColor: COLORS.card, borderRadius: 14, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  aboutLinkCard: { borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  aboutRow: { flexDirection: 'row', alignItems: 'flex-start' },
  aboutIconSmall: { fontSize: 24, marginRight: 12 },
  aboutContent: { flex: 1 },
  aboutLabel: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
  aboutValue: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
  aboutLink: { fontSize: 14, color: COLORS.secondary, fontWeight: '600', textDecorationLine: 'underline' },
  aboutLinkHint: { fontSize: 11, color: COLORS.textLight, marginTop: 4, fontStyle: 'italic' },
  aboutRow2: { flexDirection: 'row', justifyContent: 'space-between' },
  aboutHalf: { width: '48%' },
  aboutDescriptionCard: { backgroundColor: COLORS.card, borderRadius: 14, padding: 15, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: COLORS.primary, borderWidth: 1, borderColor: COLORS.border },
  aboutDescription: { fontSize: 13, color: COLORS.text, lineHeight: 21, marginTop: 6 },
});
