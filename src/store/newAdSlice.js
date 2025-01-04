import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  category: { dependencies: [], label: '', id: '' },
  location: { dependencies: [], label: '', id: '' },
  attribute: [],
  description: '',
  title: '',
  photo: [],
  userType: 'فرد',
  phone: false,
  chat: false,
  active: false,
};

// Create Redux Slice
const newAdSlice = createSlice({
  name: 'newAd',
  initialState,
  reducers: {
    // Actions
    updateCategory: (state, action) => {
      action.payload.item.children?.length > 0
        ? (resetAd(),
          (state.category = {
            ...state.category,
            dependencies: [
              ...initialState.category.dependencies,
              {
                id: action.payload.item.id,
                name: action.payload.item.name,
                slug: action.payload.item.slug,
              },
            ],
            id: action.payload.item.id,
            label: action.payload.item.name,
          }))
        : (state.category = {
            ...state.category,

            dependencies: [
              ...state.category.dependencies,
              {
                id: action.payload.item.id,
                name: action.payload.item.name,
                slug: action.payload.item.slug,
                lat: action.payload.item.lat,
                lon: action.payload.item.lon,
              },
            ],
            id: action.payload.item.id,
            label: action.payload.item.name,
          });

      state.active = true;
    },
    updateCategoryAfterDependencies: (state) => {
      state.category = {
        ...state.category,
        id: state.category.dependencies[1]?.id,
        label: state.category?.dependencies
          .map((i) => {
            return i.name;
          })
          .join(' > '),
      };
    },
    updateLocation: (state, action) => {
      action.payload.item.children?.length > 0
        ? (state.location = {
            ...initialState.location,

            dependencies: [
              ...initialState.location.dependencies,
              {
                id: action.payload.item.id,
                name: action.payload.item.name,
                lat: action.payload.item.lat,
                lon: action.payload.item.lon,
                slug: action.payload.item.slug,
              },
            ],
            id: action.payload.item.id,
            label: action.payload.item.name,
          })
        : (state.location = {
            ...state.location,

            dependencies: [
              ...state.location.dependencies,
              {
                id: action.payload.item.id,
                name: action.payload.item.name,
                slug: action.payload.item.slug,
                lat: action.payload.item.lat,
                lon: action.payload.item.lon,
              },
            ],
            id: action.payload.item.id,
            label: action.payload.item.name,
          });
    },
    updateLocationAfterDependencies: (state) => {
      const lat = state.location.dependencies[2]?.lat
        ? state.location.dependencies[2]?.lat
        : state.location.dependencies[1]?.lat;
      const lon = state.location.dependencies[2]?.lon
        ? state.location.dependencies[2]?.lon
        : state.location.dependencies[1]?.lon;

      state.location = {
        ...state.location,
        id: state.location.dependencies[1]?.id,
        label: state.location?.dependencies
          .map((i) => {
            return i.name;
          })
          .join(' > '),
        lat: lat,
        lon: lon,
      };
    },

    updateCategoryAttr: (state, action) => {
      if (action.payload.item.attributes !== undefined) {
        state.attribute = [];

        action.payload.item.attributes.forEach((attrItem) => {
          ((attrItem.order == 0 && attrItem.type != 7) ||
            attrItem.isSeparated) &&
            state.attribute.push(
              attrItem.options.length > 0
                ? {
                    id: attrItem.id,
                    label: attrItem.title,
                    name: '',
                    options: attrItem.options,
                    type: attrItem.type,
                  }
                : { id: action.payload.item.id }
            );
        });
      } else {
        const attrItemIndex = state.attribute.findIndex((i) => {
          return i.id === action.payload.storagePram;
        });
        state.attribute[attrItemIndex].name = action.payload.item.name;
      }
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updatePhoto: (state, action) => {
      state.photo = action.payload;
    },
    updateUserType: (state, action) => {
      state.userType = action.payload;
    },
    togglePhone: (state) => {
      state.phone = !state.phone;
    },
    toggleChat: (state) => {
      state.chat = !state.chat;
    },
    resetAd: (state) => {
      // Clear the entire state
      Object.keys(state).forEach((key) => delete state[key]); // Remove all keys
      // Reassign the initial state
      Object.assign(state, JSON.parse(JSON.stringify(initialState))); // Deep clone initialState

      localStorage.setItem('form-list-values', JSON.stringify(initialState));
    }, // Reset to default state
  },
});

// Export actions
export const {
  updateCategory,
  updateCategoryAfterDependencies,
  updateLocation,
  updateLocationAfterDependencies,
  updateCategoryAttr,
  updateDescription,
  updateTitle,
  updatePhoto,
  updateUserType,
  togglePhone,
  toggleChat,
  resetAd,
} = newAdSlice.actions;

// Export reducer
export default newAdSlice.reducer;
