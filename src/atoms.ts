import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark', // 식별자 역할
  default: false, // 초기값
});
