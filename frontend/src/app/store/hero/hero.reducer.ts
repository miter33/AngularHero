import { Actions, HeroActionTypes } from './hero.actions';
import { heroAdapter, HeroState, initialState } from './hero.state';

export function heroReducer(state = initialState, action: Actions): HeroState {
  switch (action.type) {
    case HeroActionTypes.LOAD_HEROES_SUCCESS:
      return heroAdapter.setAll(action.payload, {
        ...state,
        isLoaded: true,
        selectedHeroId: null,
        selectedHeroByName: [],
      });
    case HeroActionTypes.LOAD_HEROES_FAIL:
      return {
        ...state,
        entities: {},
        isLoaded: false,
        error: action.payload,
      };
    case HeroActionTypes.LOAD_HERO_SUCCESS:
      return heroAdapter.addOne(action.payload, {
        ...state,
        selectedHeroId: action.payload.id,
      });
    case HeroActionTypes.LOAD_HERO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case HeroActionTypes.CREATE_HERO_SUCCESS:
      return heroAdapter.addOne(action.payload, {
        ...state,
        error: null,
      });
    case HeroActionTypes.CREATE_HERO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case HeroActionTypes.UPDATE_HERO_SUCCESS:
      return heroAdapter.updateOne(action.payload, state);
    case HeroActionTypes.UPDATE_HERO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case HeroActionTypes.DELETE_HERO_SUCCESS:
      return heroAdapter.removeOne(action.payload, state);
    case HeroActionTypes.DELETE_HERO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case HeroActionTypes.LOAD_HEROES_BY_NAME_SUCCESS:
      return heroAdapter.addMany(action.payload, {
        ...state,
        selectedHeroByName: action.payload,
        isLoaded: true,
      });
    case HeroActionTypes.LOAD_HEROES_BY_NAME_FAIL:
      return {
        ...state,
        entities: {},
        isLoaded: false,
        error: action.payload,
      };
    case HeroActionTypes.RESET_HERO:
      return {
        ...initialState,
      };
    default:
      return { ...state, selectedHeroId: null };
  }
}
