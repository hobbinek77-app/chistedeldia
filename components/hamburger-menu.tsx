import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from './themed-text';
import { IconSymbol } from './ui/icon-symbol';

type Props = {
  floating?: boolean;
};

export function HamburgerMenu({ floating }: Props) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;
  const insets = useSafeAreaInsets();

  const handleNavigate = (path: string) => {
    setVisible(false);
    router.push(path);
  };

  const background = colorScheme === 'dark' ? '#0f172a' : '#fff';
  const textColor = colorScheme === 'dark' ? '#e5e7eb' : '#0f172a';

  const containerStyle = floating
    ? [styles.floatingAnchor, { top: insets.top + 12 }]
    : styles.anchor;

  return (
    <>
      <View style={containerStyle}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
          style={[styles.button, { borderColor: tint, backgroundColor: background }]}
          onPress={() => setVisible(true)}>
          <Feather name="menu" size={22} color={tint} />
        </Pressable>
      </View>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />
        <View
          style={[
            styles.menuCard,
            { borderColor: tint, backgroundColor: background },
          ]}>
          <Pressable
            style={styles.menuItem}
            accessibilityRole="button"
            onPress={() => handleNavigate('/')}>
            <IconSymbol name="house.fill" size={20} color={tint} style={styles.menuIcon} />
            <ThemedText style={{ color: textColor }}>Inicio</ThemedText>
          </Pressable>
          <Pressable
            style={styles.menuItem}
            accessibilityRole="button"
            onPress={() => handleNavigate('/settings')}>
            <IconSymbol name="gearshape.fill" size={20} color={tint} style={styles.menuIcon} />
            <ThemedText style={{ color: textColor }}>Ajustes</ThemedText>
          </Pressable>
          <Pressable
            style={styles.menuItem}
            accessibilityRole="button"
            onPress={() => handleNavigate('/about')}>
            <IconSymbol name="info.circle.fill" size={20} color={tint} style={styles.menuIcon} />
            <ThemedText style={{ color: textColor }}>Acerca de</ThemedText>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  anchor: {
    alignSelf: 'flex-end',
    zIndex: 2,
  },
  floatingAnchor: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  menuCard: {
    position: 'absolute',
    top: 72,
    right: 12,
    width: 220,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  menuTitle: {
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  menuIcon: {
    width: 22,
  },
  closeItem: {
    backgroundColor: '#0f172a',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: '700',
  },
});
