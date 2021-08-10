function authReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SAFE_MODE":
      let newSafeMode = state.safeMode;
      newSafeMode = !newSafeMode;
      // console.log(newSafeMode);
      return {
        safeMode: newSafeMode,
        loading: state.loading,
        password: state.password,
        passwordToggle: state.passwordToggle,
        selectedState: state.selectedState,
      };

    case "TOGGLE_LOADING":
      let newLoading = state.loading;
      newLoading = !newLoading;
      return {
        safeMode: state.safeMode,
        loading: newLoading,
        password: state.password,
        passwordToggle: state.passwordToggle,
        selectedState: state.selectedState,
      };

    case "NULLIFER":
      return {
        ...state,
        selectedState: null,
      };

    case "CHECK_PASSWORD":
      let newPass = state.password;
      let newPasswordToggle = state.passwordToggle;
      //If password is correct set it to true and toggle passwordToggle to run useEffect Input.jsx line 98
      if (action.payload === "stillwinter") {
        newPass = true;
        newPasswordToggle = !newPasswordToggle;
      } else if (action.payload === "xD") {
        //The unique strategy execution.. Notice it doesnt have passwordToggle change so thats why useEffect doesnt run.
        newPass = false;
      } else {
        //If password is wrong this toggles the passwordToggle and runs the use effect for error presentation.
        newPasswordToggle = !newPasswordToggle;
      }
      return {
        safeMode: state.safeMode,
        loading: state.loading,
        password: newPass,
        passwordToggle: newPasswordToggle,
        selectedState: state.selectedState,
      };

    case "SET_SELECTED_STATE":
      let newSelectedState = action.payload;
      return { ...state, selectedState: newSelectedState };

    default:
      return state;
  }
}

export default authReducer;
