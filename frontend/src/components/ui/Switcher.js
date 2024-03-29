import React, {useContext} from 'react';
import Context from '../../index';

const Switcher = ({ firstTitle, secondTitle }) => {
  const { globalStore: { isSwitcherFirstTabVisible, setSwitcherFirstTabVisible } } = useContext(Context);
  return (
    <div className='switcher'>
			<span
        className={isSwitcherFirstTabVisible ? 'active' : null}
        onClick={() => setSwitcherFirstTabVisible(true)}>
				{firstTitle}
			</span>/
      <span
        className={!isSwitcherFirstTabVisible ? 'active' : null}
        onClick={() => setSwitcherFirstTabVisible(false)}>
				{secondTitle}
			</span>
    </div>
  );
};

export default Switcher;