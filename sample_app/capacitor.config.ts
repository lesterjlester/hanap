import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app1.innsite',
  appName: 'sample_app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
}; 
export default config;
