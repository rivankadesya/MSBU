import { MMKVLoader } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().withInstanceID('msbu-app-storage').initialize();

export { storage };
