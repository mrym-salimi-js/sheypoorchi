import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  category: { dependencies: [], name: '', id: '', placeholders: '' },
  location: { dependencies: [], name: '', id: '', placeholders: '' },
  attribute: [],
  description: '',
  title: '',
  photo: [],
  userType: 'فرد',
  phone: '',
  chat: '',
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
        ? (((state.attribute = []),
          (state.title = ''),
          (state.description = '')),
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
            name: action.payload.item.name,
            placeholders: action.payload.item.placeholders,
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
            name: action.payload.item.name,

            placeholders: action.payload.item.placeholders,
          });

      state.active = true;
    },
    updateCategoryAfterDependencies: (state) => {
      state.category = {
        ...state.category,
        id: state.category.dependencies[1]?.id,
        name: state.category?.dependencies
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
            name: action.payload.item.name,
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
            name: action.payload.item.name,
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
        name: state.location?.dependencies
          .map((i) => {
            return i.name;
          })
          .join(' > '),
        lat: lat,
        lon: lon,
      };
    },

    updateCategoryAttr: (state, action) => {
      if (action.payload.item?.type !== undefined) {
        action.payload.item.attributes.forEach((attrItem) => {
          ((attrItem.order == 0 && attrItem.type != 7) ||
            attrItem.isSeparated) &&
            state.attribute.push(
              attrItem.options.length > 0
                ? {
                    id: +attrItem.id,
                    label: attrItem.title,
                    options: attrItem.options,
                    type: attrItem.type,
                    nameId: '',
                  }
                : {
                    id: +attrItem.id,
                    label: attrItem.title,
                    name: '',
                    type: attrItem.type,
                  }
            );
        });
      } else {
        const attrItemIndex = state.attribute.findIndex((i) => {
          return i.id === action.payload.itemId;
        });

        action.payload.filedType !== 'text'
          ? ((state.attribute[attrItemIndex].name = action.payload.item.name),
            (state.attribute[attrItemIndex].nameId = +action.payload.item.id))
          : (state.attribute[attrItemIndex].name = action.payload.formInputVal);
      }
    },
    updateDescription: (state, action) => {
      state.description = action.payload.formInputVal;

      state.active = true;
    },
    updateTitle: (state, action) => {
      state.title = action.payload.formInputVal;

      state.active = true;
    },
    updatePhoto: (state, action) => {
      if (action.payload.type === 'add') {
        state.photo = [...state.photo, action.payload.photoDetail];
      } else {
        state.photo = action.payload.filterdPhoto;
      }

      state.active = true;
    },
    updateUserType: (state, action) => {
      state.userType = action.payload.userType;

      state.active = true;
    },
    updatePhone: (state, action) => {
      state.phone = action.payload.formInputVal;

      state.active = true;
    },
    toggleChat: (state, action) => {
      state.chat = action.payload.status;
      state.active = true;
    },
    resetAd: () => {
      initialState;
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
  updatePhone,
  toggleChat,
  resetAd,
} = newAdSlice.actions;

// Export reducer
export default newAdSlice.reducer;
