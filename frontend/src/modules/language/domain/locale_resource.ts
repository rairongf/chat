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
};