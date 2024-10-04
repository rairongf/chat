export interface LocaleResource {
  login: {
    title: string;
    subtitle: string;
    emailInputLabel: string;
    passwordInputLabel: string;
    forgotPasswordButtonLabel: string;
    logInButtonLabel: string;
    dontHaveAnAccount: string;
    signUpButtonLabel: string;
  };
  directMessages: {
    recentChatsTabTitle: string;
  };
  addGuildDialog: {
    title: string;
    subtitle: string;
    uploadPictureLabel: string;
    inputDefaultValue: string;
    inputLabel: string;
    inputHelperText: {
      partOne: string;
      linkLabel: string;
      partTwo: string;
    };
    inputErrorMessages: {
      missingGuildName: string;
      missingGuildPicture: string;
    };
    dismissButtonLabel: string;
    submitButtonLabel: string;
  };
  newDMPopup: {
    title: string;
    youCanAddMoreXFriends: {
      partOne: string;
      partTwo: string;
    };
    inputPlaceholder: string;
    confirmButtonLabel: string;
  };
  friendsSection: {
    topBar: {
      friends: string;
      filters: {
        online: string;
        all: string;
        pending: string;
        blocked: string;
      };
      addFriendButtonLabel: string;
    };
    searchInputPlaceholder: string;
    friendsCount: {
      online: string;
      all: string;
      pending: string;
      blocked: string;
    };
  };
  tooltips: {
    message: string;
    more: string;
  };
};