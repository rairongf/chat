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
  register: {
    title: string,
    emailInput: {
      label: string,
      missingEmail: string,
      invalidEmail: string,
    },
    nameInput: {
      label: string,
      invalidName: string,
    },
    usernameInput: {
      label: string,
      missingUsername: string,
      invalidUsername: string,
    },
    passwordInput: {
      label: string,
      missingPassword: string,
      invalidPassword: string,
    },
    birthdayInput: {
      label: string,
      missingBirthday: string,
      invalidBirthday: string,
    },
    newsletterOptionLabel: string,
    submitButtonLabel: string,
    useTermsAndPrivacyPolicy: {
      partOne: string,
      useTermsInlineButtonLabel: string,
      partTwo: string,
      privacyPolicyInlineButtonLabel: string,
      partThree: string,
    },
    alreadyHasAnAccountButtonLabel: string,
  },
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