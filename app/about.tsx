import { Image, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { aboutStyles as styles } from '@/styles/screens';

export default function AboutScreen() {
  const isDark = useColorScheme() === 'dark';
  const logoSource = isDark
    ? require('../assets/images/logo-hn-b.png')
    : require('../assets/images/logo-hn-w.png');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerHeight={80}
      headerImage={<View />}>
      <ThemedView>
        <ThemedText style={styles.textWrapper}>
          "Chiste del día" envía chistes locales a la hora que tú elijas, sin conexión y sin datos personales. Abre la app de vez en cuando para renovar la programación de notificaciones.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.acerca}>
        <View>
          <ThemedText style={styles.centrarTexto}>Creado por Hobbinek. 2025</ThemedText>
          <ThemedText style={styles.centrarTexto}>v 1.0.1</ThemedText>
          <View style={styles.logoWrapper}>
            <Image
              source={logoSource}
              style={{ width: 120, height: 120, borderRadius: 24 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
