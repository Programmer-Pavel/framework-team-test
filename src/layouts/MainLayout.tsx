import { ReactNode } from 'react';

import darkIcon from '../assets/icons/dark-theme.svg';
import lightIcon from '../assets/icons/light-theme.svg';
import logoImg from '../assets/images/logo.png';
import styles from './MainLayout.module.scss';
import useTheme from '../hooks/useTheme';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className={styles.mainLayoutWrapper} data-theme={theme}>
      <div className='container'>
        <header className={styles.header}>
          <img src={logoImg} alt='' />

          {theme === 'dark' ? (
            <img src={lightIcon} alt='' onClick={switchTheme} />
          ) : (
            <img src={darkIcon} alt='' onClick={switchTheme} />
          )}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
