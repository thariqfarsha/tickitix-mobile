import {StyleSheet} from 'react-native';
import v from './styleVariables';

const gs = StyleSheet.create({
  container: {
    paddingVertical: '6%',
    paddingHorizontal: '5%',
    backgroundColor: v.color.white,
  },
  section: {
    paddingVertical: '3%',
    paddingHorizontal: '5%',
  },
  logo: {
    marginBottom: 32,
  },
  wrapper: {
    marginBottom: 20,
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: v.color.title,
    marginBottom: 12,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: v.color.title,
    marginBottom: 12,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: v.color.title,
    marginBottom: 8,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    color: v.color.title,
    marginBottom: 4,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
    color: v.color.title,
    marginBottom: 4,
  },
  p: {
    fontSize: 16,
    marginBottom: 8,
    color: v.color.body,
    lineHeight: 24,
  },
  label: {
    color: v.color.label,
    fontSize: 18,
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: v.color.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 16,
  },
  placeholder: {
    color: v.color.placeholder,
  },
  inputGroup: {
    marginBottom: 20,
  },
  lastInputGroup: {
    marginBottom: 32,
  },
  btnPrimary: {
    backgroundColor: v.color.primary,
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
    elevation: 10,
    shadowColor: v.color.primary,
  },
  btnPrimaryText: {
    color: v.color.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  btnOutlinePrimary: {
    backgroundColor: v.color.white,
    borderColor: v.color.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  btnOutlinePrimaryText: {
    color: v.color.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  textCenter: {
    textAlign: 'center',
  },
  link: {
    color: v.color.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default gs;
