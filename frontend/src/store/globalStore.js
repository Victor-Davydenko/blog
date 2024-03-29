import {makeAutoObservable} from 'mobx';

export default class GlobalStore {
  isSwitcherFirstTabVisible = true;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSwitcherFirstTabVisible(isSwitcherFirstTabVisible) {
    this.isSwitcherFirstTabVisible = isSwitcherFirstTabVisible;
  }
}