import { LocaleResource } from "../domain";

export const enUS_Resource: LocaleResource = {
  login: {
    title: 'Welcome back!',
    subtitle: "We're excited to see you again!",
    emailInputLabel: 'Email',
    passwordInputLabel: 'Password',
    forgotPasswordButtonLabel: 'Forgot password?',
    logInButtonLabel: 'Log In',
    dontHaveAnAccount: 'Need an account?',
    signUpButtonLabel: 'Sign Up',
  },
  directMessages: {
    recentChatsTabTitle: 'Direct messages',
  },
  addGuildDialog: {
    title: 'Customize your server',
    subtitle:'[addGuildDialog.subtitle]',
    uploadPictureLabel: 'Upload',
    inputDefaultValue: "'s server",
    inputLabel: 'Server name',
    inputHelperText: {
      partOne: '[inputHelperText.partOne]',
      linkLabel: '[inputHelperText.linkLabel]',
      partTwo: '[inputHelperText.partTwo]',
    },
    inputErrorMessages: {
      missingGuildName: '[inputErrorMessages.missingGuildName]',
      missingGuildPicture: '[inputErrorMessages.missingGuildPicture]',
    },
    dismissButtonLabel: 'Back',
    submitButtonLabel: 'Create',
  },
};