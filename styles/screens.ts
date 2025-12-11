import { StyleSheet } from 'react-native';

const shared = {
  section: {
    gap: 8,
    marginBottom: 16,
  },
  card: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(10, 126, 164, 0.08)',
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center' as const,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700' as const,
  },
};

export const homeStyles = StyleSheet.create({
  ...shared,
  headerImage: {
    bottom: -40,
    right: -20,
    position: 'absolute',
  },
  hero: {
    gap: 12,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(10, 126, 164, 0.08)',
  },
  jokeText: {
    fontSize: 22,
    lineHeight: 26,
  },
  meta: {
    opacity: 0.7,
  },
});

export const exploreStyles = StyleSheet.create({
  ...shared,
  container: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  headerImage: {
    color: '#808080',
    bottom: -70,
    left: -20,
    position: 'absolute',
  },
});

export const settingsStyles = StyleSheet.create({
  ...shared,
  headerImage: {
    bottom: -60,
    right: -24,
    position: 'absolute',
  },
  card: {
    ...shared.card,
    marginBottom: 16,
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center' as const,
  },
  timeText: {
    fontSize: 45,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center' as const,
    lineHeight: 40,
  },
  timeHint: {
    marginTop: 8,
  },
  pickerWrapper: {
    marginTop: 8,
  },
  ctaButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    color: '#000',
    backgroundColor: '#0a7ea4',
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  successText: {
    marginTop: 6,
    color: '#0f766e',
  },
  warningText: {
    color: '#b45309',
  },
  helperText: {
    color: 'rgba(0,0,0,0.7)',
  },
});

export const aboutStyles = StyleSheet.create({
  ...shared,
  headerImage: {
    bottom: -40,
    right: -20,
    position: 'absolute',
  },
  section: {
    ...shared.section,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(10, 126, 164, 0.08)',
  },
  acerca: {
    gap: 8,
    marginTop: 70,
    marginBottom: 16,
    alignItems: 'center',   // centra los hijos horizontalmente
    justifyContent: 'center',
  },
  centrarTexto: {
    textAlign: 'center' as const,
  },
  logoWrapper: {
    marginTop: 16,
    alignItems: 'center' as const,
  },
  textWrapper: {
    marginTop: 16,
    textAlign: 'center' as const,
  },
});
